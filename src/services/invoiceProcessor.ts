
import type { Invoice } from '@/data/invoices';
import { CfdiType } from './types/cfdiTypes';
import { parseXmlCfdi, simulateXmlParsing } from './util/xmlParser';
import { detectCfdiTypeFromMetadata, determineCfdiBusinessType, detectCfdiType } from './util/cfdiTypeDetector';
import { filterValidFiles } from './util/fileValidator';
import { uploadXmlToStorage, supabase } from './supabase/client';

// Re-export types and utilities
export { CfdiType } from './types/cfdiTypes';
export { detectCfdiType, determineCfdiBusinessType } from './util/cfdiTypeDetector';
export { filterValidFiles } from './util/fileValidator';

// Función para verificar si un UUID ya existe en la base de datos
export const checkDuplicateUuid = async (uuid: string): Promise<boolean> => {
  if (!uuid) return false;
  
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      console.log("Usuario no autenticado, modo demo: no se verifica duplicidad");
      return false;
    }
    
    const { data, error } = await supabase
      .from('invoices')
      .select('id')
      .eq('uuid', uuid)
      .eq('user_id', userData.user.id)
      .limit(1);
    
    if (error) {
      console.error('Error al verificar UUID duplicado:', error);
      return false;
    }
    
    return data && data.length > 0;
  } catch (error) {
    console.error('Error inesperado al verificar UUID duplicado:', error);
    return false;
  }
};

// Función para procesar un archivo XML y extraer datos de factura
export const processXmlFile = async (file: File): Promise<{invoice: Invoice, isDuplicate: boolean}> => {
  return new Promise(async (resolve) => {
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      const xmlContent = e.target?.result as string;
      console.log("Procesando archivo XML:", file.name);
      
      // Extraer metadatos del XML utilizando el parser real
      const cfdiMetadata = parseXmlCfdi(xmlContent, file.name);
      const cfdiType = detectCfdiTypeFromMetadata(cfdiMetadata);
      
      // Determinar si es por pagar o por cobrar basado en el tipo y nombre de archivo
      const type = determineCfdiBusinessType(cfdiMetadata, file.name);
      
      // Determinar el estado de pago (para esta demo es aleatorio)
      const status = Math.random() > 0.7 ? 'pending' : 'paid';
      
      // Usar el total del CFDI
      const amount = cfdiMetadata.total || Math.floor(Math.random() * 10000) + 1000;
      
      // Fechas de la factura
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 30);
      
      const formatDate = (date: Date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      };
      
      // Verificar si el UUID ya existe en la base de datos
      let isDuplicate = false;
      if (cfdiMetadata.uuid) {
        isDuplicate = await checkDuplicateUuid(cfdiMetadata.uuid);
        if (isDuplicate) {
          console.log(`UUID duplicado detectado: ${cfdiMetadata.uuid}`);
        }
      }
      
      // Subir el archivo a Supabase Storage si no es duplicado
      let storagePath = null;
      if (!isDuplicate) {
        const { data: userData } = await supabase.auth.getUser();
        storagePath = await uploadXmlToStorage(file, userData?.user?.id);
      }

      // Crear objeto de factura con los datos extraídos
      const invoice: Invoice = {
        id: `xml-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        number: cfdiMetadata.uuid?.substring(0, 8) || `CFDI-${Math.floor(Math.random() * 10000)}`,
        client: cfdiMetadata.nombreEmisor || cfdiMetadata.nombreReceptor || file.name.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' '),
        amount: amount,
        date: cfdiMetadata.fechaEmision || formatDate(today),
        dueDate: formatDate(dueDate),
        status: status,
        type: type,
        cfdiType: cfdiType,
        uuid: cfdiMetadata.uuid,
        relatedDocuments: cfdiMetadata.relacionados?.map(rel => rel.uuid) || [],
        storagePath // Nuevo campo para guardar la ruta del archivo en Storage
      };
      
      console.log("Factura procesada:", invoice);
      resolve({invoice, isDuplicate});
    };
    
    reader.onerror = (error) => {
      console.error("Error al procesar el archivo XML:", error);
      // En caso de error, devolver una factura con datos genéricos
      resolve({
        invoice: {
          id: `error-${Date.now()}`,
          number: `Error-${file.name}`,
          client: 'Error al procesar',
          amount: 0,
          date: new Date().toLocaleDateString('es-MX'),
          dueDate: new Date().toLocaleDateString('es-MX'),
          status: 'pending',
          type: 'receivable',
          cfdiType: CfdiType.INGRESO,
          uuid: '',
          relatedDocuments: []
        },
        isDuplicate: false
      });
    };
    
    reader.readAsText(file);
  });
};
