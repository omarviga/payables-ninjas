
import { CfdiMetadata, TipoDeComprobante } from '../types/cfdiTypes';

// Función para simular la extracción de datos de un XML (en producción, se usaría un parser XML real)
export const simulateXmlParsing = (xmlContent: string, fileName: string): CfdiMetadata => {
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
