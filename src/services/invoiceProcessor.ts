
import type { Invoice } from '@/data/invoices';

// Enum para los tipos de CFDI
export enum CfdiType {
  INGRESO = 'ingreso',
  EGRESO = 'egreso',
  TRASLADO = 'traslado',
  NOMINA = 'nomina',
  PAGO = 'pago',
  DONATIVO = 'donativo',
  EXPORTACION = 'exportacion'
}

// Enum para los tipos de comprobante según el SAT
export enum TipoDeComprobante {
  INGRESO = 'I',
  EGRESO = 'E',
  TRASLADO = 'T',
  NOMINA = 'N',
  PAGO = 'P'
}

// Interfaz para información extraída del XML
export interface CfdiMetadata {
  uuid?: string;
  tipoDeComprobante?: TipoDeComprobante;
  rfcEmisor?: string;
  nombreEmisor?: string;
  rfcReceptor?: string;
  nombreReceptor?: string;
  total?: number;
  subtotal?: number;
  fechaEmision?: string;
  conceptos?: Array<{
    descripcion: string;
    importe: number;
    claveProdServ?: string;
  }>;
  relacionados?: Array<{
    uuid: string;
    tipoRelacion: string;
  }>;
  complementos?: {
    pagos?: Array<{
      fechaPago: string;
      formaDePago: string;
      monto: number;
      doctoRelacionado?: Array<{
        idDocumento: string;
        serie?: string;
        folio?: string;
        monedaDR?: string;
        metodoDePagoDR?: string;
        numParcialidad?: number;
        impSaldoAnt?: number;
        impPagado?: number;
        impSaldoInsoluto?: number;
      }>;
    }>;
    nomina?: {
      // Información relevante de nómina
    };
  };
}

// Función para procesar un archivo XML y extraer datos de factura
export const processXmlFile = (file: File): Promise<Invoice> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const xmlContent = e.target?.result as string;
      // Aquí extraeríamos realmente los datos del XML
      // Para esta demo, simulamos la extracción basada en el nombre del archivo
      
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
      
      resolve(invoice);
    };
    
    reader.onerror = () => {
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

// Función para simular la extracción de datos de un XML (en producción, se usaría un parser XML real)
const simulateXmlParsing = (xmlContent: string, fileName: string): CfdiMetadata => {
  // En producción, aquí se parsearia realmente el XML usando un parser adecuado
  // Para esta demo, simulamos la extracción basada en el nombre del archivo
  
  const metadata: CfdiMetadata = {
    uuid: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    fechaEmision: new Date().toISOString().split('T')[0],
    total: Math.floor(Math.random() * 10000) + 1000,
    subtotal: Math.floor(Math.random() * 8000) + 800,
    conceptos: [{
      descripcion: 'Concepto de prueba',
      importe: Math.floor(Math.random() * 1000) + 100,
      claveProdServ: '01010101'
    }]
  };
  
  // Simulamos detectar el tipo de comprobante basado en el nombre del archivo
  if (fileName.toLowerCase().includes('pago')) {
    metadata.tipoDeComprobante = TipoDeComprobante.PAGO;
    metadata.complementos = {
      pagos: [{
        fechaPago: new Date().toISOString().split('T')[0],
        formaDePago: '01',
        monto: metadata.total || 0,
        doctoRelacionado: [{
          idDocumento: `rel-${Date.now()}`,
          impPagado: metadata.total || 0
        }]
      }]
    };
  } else if (fileName.toLowerCase().includes('nomina')) {
    metadata.tipoDeComprobante = TipoDeComprobante.NOMINA;
  } else if (fileName.toLowerCase().includes('nota') || fileName.toLowerCase().includes('credito')) {
    metadata.tipoDeComprobante = TipoDeComprobante.EGRESO;
    metadata.relacionados = [{
      uuid: `rel-${Date.now()}`,
      tipoRelacion: '01'
    }];
  } else if (fileName.toLowerCase().includes('traslado')) {
    metadata.tipoDeComprobante = TipoDeComprobante.TRASLADO;
  } else if (fileName.toLowerCase().includes('egreso') || fileName.toLowerCase().includes('compra') || fileName.toLowerCase().includes('prov')) {
    metadata.tipoDeComprobante = TipoDeComprobante.EGRESO;
  } else {
    metadata.tipoDeComprobante = TipoDeComprobante.INGRESO;
  }
  
  // Simular datos de emisor/receptor
  if (metadata.tipoDeComprobante === TipoDeComprobante.INGRESO) {
    metadata.rfcEmisor = 'XAXX010101000';
    metadata.nombreEmisor = 'Mi Empresa SA de CV';
    metadata.rfcReceptor = 'XEXX010101000';
    metadata.nombreReceptor = fileName.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
  } else {
    metadata.rfcEmisor = 'XEXX010101000';
    metadata.nombreEmisor = fileName.split('.')[0].replace(/-/g, ' ').replace(/_/g, ' ');
    metadata.rfcReceptor = 'XAXX010101000';
    metadata.nombreReceptor = 'Mi Empresa SA de CV';
  }
  
  return metadata;
};

// Función para detectar el tipo de CFDI basado en los metadatos
const detectCfdiTypeFromMetadata = (metadata: CfdiMetadata): CfdiType => {
  if (!metadata.tipoDeComprobante) return CfdiType.INGRESO;
  
  switch (metadata.tipoDeComprobante) {
    case TipoDeComprobante.INGRESO:
      return CfdiType.INGRESO;
    case TipoDeComprobante.EGRESO:
      return CfdiType.EGRESO;
    case TipoDeComprobante.TRASLADO:
      return CfdiType.TRASLADO;
    case TipoDeComprobante.NOMINA:
      return CfdiType.NOMINA;
    case TipoDeComprobante.PAGO:
      return CfdiType.PAGO;
    default:
      return CfdiType.INGRESO;
  }
};

// Función para determinar si es una factura por pagar o por cobrar
const determineCfdiBusinessType = (metadata: CfdiMetadata, fileName: string): 'receivable' | 'payable' => {
  // En un caso real, esto se determinaría comparando el RFC del emisor con el de la empresa
  if (metadata.tipoDeComprobante === TipoDeComprobante.INGRESO) {
    // Si somos el emisor de un CFDI de Ingreso, es por cobrar
    return fileName.toLowerCase().includes('prov') ? 'payable' : 'receivable';
  } else if (metadata.tipoDeComprobante === TipoDeComprobante.EGRESO) {
    // Si somos el emisor de un CFDI de Egreso, probablemente es una nota de crédito (por pagar)
    return fileName.toLowerCase().includes('prov') ? 'payable' : 'receivable';
  } else if (metadata.tipoDeComprobante === TipoDeComprobante.PAGO) {
    // Los CFDI de Pago pueden ser por cobrar o por pagar, dependiendo de quién lo emite
    return fileName.toLowerCase().includes('prov') ? 'payable' : 'receivable';
  }
  
  // Por defecto, basado en el nombre del archivo como en la lógica original
  return fileName.toLowerCase().includes('prov') ? 'payable' : 'receivable';
};

// Función para detectar tipo de CFDI basado en el nombre del archivo (versión simple)
export const detectCfdiType = (fileName: string): string => {
  if (!fileName.endsWith('.xml')) return '';
  
  if (fileName.toLowerCase().includes('pago')) {
    return 'complemento-pago';
  } else if (fileName.toLowerCase().includes('nota') || fileName.toLowerCase().includes('credito')) {
    return 'nota-credito';
  } else if (fileName.toLowerCase().includes('traslado')) {
    return 'traslado';
  } else if (fileName.toLowerCase().includes('nomina')) {
    return 'nomina';
  } else if (fileName.toLowerCase().includes('egreso')) {
    return 'egreso';
  } else {
    return 'ingreso';
  }
};

// Función para filtrar archivos válidos (XML y PDF)
export const filterValidFiles = (files: File[]): File[] => {
  return files.filter(file => 
    file.type === 'application/xml' || 
    file.type === 'text/xml' ||
    file.name.endsWith('.xml') ||
    file.type === 'application/pdf'
  );
};
