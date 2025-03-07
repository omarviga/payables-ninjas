
import type { Invoice } from '@/data/invoices';
import { CfdiType } from './types/cfdiTypes';
import { simulateXmlParsing } from './util/xmlParser';
import { detectCfdiTypeFromMetadata, determineCfdiBusinessType, detectCfdiType } from './util/cfdiTypeDetector';
import { filterValidFiles } from './util/fileValidator';

// Re-export types and utilities
export { CfdiType } from './types/cfdiTypes';
export { detectCfdiType, determineCfdiBusinessType } from './util/cfdiTypeDetector';
export { filterValidFiles } from './util/fileValidator';

// Función para procesar un archivo XML y extraer datos de factura
export const processXmlFile = (file: File): Promise<Invoice> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const xmlContent = e.target?.result as string;
      console.log("Procesando archivo XML:", file.name);
      
      // Detectar tipo de CFDI basado en el contenido
      const cfdiMetadata = simulateXmlParsing(xmlContent, file.name);
      const cfdiType = detectCfdiTypeFromMetadata(cfdiMetadata);
      
      // Determinar si es por pagar o por cobrar basado en el tipo y nombre de archivo
      const type = determineCfdiBusinessType(cfdiMetadata, file.name);
      
      // Determinar el estado de pago (para esta demo es aleatorio)
      const status = Math.random() > 0.7 ? 'pending' : 'paid';
      
      // Usar el total del CFDI o generar uno aleatorio
      const amount = cfdiMetadata.total || Math.floor(Math.random() * 10000) + 1000;
      
      // Fechas de la factura
      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 30);
      
      const formatDate = (date: Date) => {
        return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
      };

      // En un caso real, estos datos vendrían del XML
      const invoice: Invoice = {
        id: `xml-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        number: cfdiMetadata.uuid?.substring(0, 8) || `CFDI-${Math.floor(Math.random() * 10000)}`,
        client: cfdiMetadata.nombreEmisor || cfdiMetadata.nombreReceptor || file.name.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' '),
        amount: amount,
        date: cfdiMetadata.fechaEmision || formatDate(today),
        dueDate: formatDate(dueDate),
        status: status,
        type: type,
        cfdiType: cfdiType, // Nuevo campo para el tipo de CFDI
        uuid: cfdiMetadata.uuid, // UUID del CFDI
        relatedDocuments: cfdiMetadata.relacionados?.map(rel => rel.uuid) || [] // Documentos relacionados
      };
      
      console.log("Factura procesada:", invoice);
      resolve(invoice);
    };
    
    reader.onerror = (error) => {
      console.error("Error al procesar el archivo XML:", error);
      // En caso de error, devolver una factura con datos genéricos
      resolve({
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
      });
    };
    
    reader.readAsText(file);
  });
};
