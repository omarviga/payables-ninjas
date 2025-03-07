
import { CfdiMetadata, CfdiType, TipoDeComprobante } from '../types/cfdiTypes';

// Función para detectar el tipo de CFDI basado en los metadatos
export const detectCfdiTypeFromMetadata = (metadata: CfdiMetadata): CfdiType => {
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

// Función para determinar si es una factura por pagar o por cobrar
export const determineCfdiBusinessType = (metadata: CfdiMetadata, fileName: string): 'receivable' | 'payable' => {
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
