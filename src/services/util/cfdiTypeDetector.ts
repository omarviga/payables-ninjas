
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

// Constante para el RFC de la empresa
const MI_RFC = 'HRA811221Q94';

// Función para determinar si es una factura por pagar o por cobrar basada en el RFC
export const determineCfdiBusinessType = (metadata: CfdiMetadata, fileName: string): 'receivable' | 'payable' => {
  console.log("Determinando tipo de factura basado en RFC:", {
    rfcEmisor: metadata.rfcEmisor,
    rfcReceptor: metadata.rfcReceptor,
    miRfc: MI_RFC
  });
  
  // Si tenemos los datos de RFC, usamos la nueva lógica basada en RFC
  if (metadata.rfcEmisor && metadata.rfcReceptor) {
    // Si el emisor es diferente al RFC de la empresa, es una factura de proveedor (por pagar)
    if (metadata.rfcEmisor !== MI_RFC) {
      console.log("Es factura POR PAGAR: emisor diferente a MI_RFC");
      return 'payable';
    }
    
    // Si el receptor es diferente al RFC de la empresa, es una factura por cobrar
    if (metadata.rfcReceptor !== MI_RFC) {
      console.log("Es factura POR COBRAR: receptor diferente a MI_RFC");
      return 'receivable';
    }
    
    // Si ambos son iguales al RFC de la empresa, es un caso especial (factura interna)
    // Por defecto, lo consideramos como por pagar para casos especiales
    console.log("CASO ESPECIAL: Emisor y receptor son iguales a MI_RFC");
    return 'payable';
  }
  
  // Fallback a la lógica anterior basada en el nombre de archivo
  console.log("Usando lógica basada en nombre de archivo:", fileName);
  
  // Lógica anterior como fallback
  if (metadata.tipoDeComprobante === TipoDeComprobante.INGRESO) {
    return fileName.toLowerCase().includes('prov') ? 'payable' : 'receivable';
  } else if (metadata.tipoDeComprobante === TipoDeComprobante.EGRESO) {
    return fileName.toLowerCase().includes('prov') ? 'payable' : 'receivable';
  } else if (metadata.tipoDeComprobante === TipoDeComprobante.PAGO) {
    return fileName.toLowerCase().includes('prov') ? 'payable' : 'receivable';
  }
  
  // Por defecto, basado en el nombre del archivo como en la lógica original
  return fileName.toLowerCase().includes('prov') ? 'payable' : 'receivable';
};
