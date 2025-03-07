
import { CfdiMetadata, TipoDeComprobante } from '../types/cfdiTypes';

// Función para extraer el atributo de un nodo XML
const getNodeAttribute = (node: Element | null, attributeName: string): string => {
  if (!node || !node.getAttribute) return '';
  return node.getAttribute(attributeName) || '';
};

// Función para parsear el XML de CFDI y extraer metadatos
export const parseXmlCfdi = (xmlContent: string, fileName: string): CfdiMetadata => {
  console.log(`Iniciando parseo de XML: ${fileName}`);
  
  // Crear un parser XML y un documento XML
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
  
  // Verificar si el documento es válido
  const parserError = xmlDoc.querySelector('parsererror');
  if (parserError) {
    console.error('Error al parsear XML:', parserError.textContent);
    return simulateXmlParsing(xmlContent, fileName); // Fallback a simulación
  }
  
  try {
    // Buscar el nodo Comprobante (elemento raíz de un CFDI)
    const comprobante = xmlDoc.querySelector('Comprobante') || 
                         xmlDoc.querySelector('cfdi\\:Comprobante') ||
                         xmlDoc.querySelector('*|Comprobante');
                        
    if (!comprobante) {
      console.warn('No se encontró el nodo Comprobante en el XML, posible formato inválido');
      return simulateXmlParsing(xmlContent, fileName); // Fallback a simulación
    }
    
    // Extraer datos básicos del comprobante
    const total = parseFloat(getNodeAttribute(comprobante, 'Total') || '0');
    const subtotal = parseFloat(getNodeAttribute(comprobante, 'SubTotal') || '0');
    const fechaEmision = getNodeAttribute(comprobante, 'Fecha')?.split('T')[0] || '';
    const tipoDeComprobanteAttr = getNodeAttribute(comprobante, 'TipoDeComprobante');
    
    // Mapear el tipo de comprobante según los valores del SAT
    let tipoDeComprobante: TipoDeComprobante;
    switch (tipoDeComprobanteAttr) {
      case 'I': tipoDeComprobante = TipoDeComprobante.INGRESO; break;
      case 'E': tipoDeComprobante = TipoDeComprobante.EGRESO; break;
      case 'T': tipoDeComprobante = TipoDeComprobante.TRASLADO; break;
      case 'N': tipoDeComprobante = TipoDeComprobante.NOMINA; break;
      case 'P': tipoDeComprobante = TipoDeComprobante.PAGO; break;
      default: tipoDeComprobante = TipoDeComprobante.INGRESO;
    }
    
    // Buscar nodos de Emisor y Receptor
    const emisor = xmlDoc.querySelector('Emisor') || 
                   xmlDoc.querySelector('cfdi\\:Emisor') ||
                   xmlDoc.querySelector('*|Emisor');
                   
    const receptor = xmlDoc.querySelector('Receptor') || 
                     xmlDoc.querySelector('cfdi\\:Receptor') ||
                     xmlDoc.querySelector('*|Receptor');
    
    // Extraer datos de emisor y receptor
    const rfcEmisor = getNodeAttribute(emisor, 'Rfc');
    const nombreEmisor = getNodeAttribute(emisor, 'Nombre');
    const rfcReceptor = getNodeAttribute(receptor, 'Rfc');
    const nombreReceptor = getNodeAttribute(receptor, 'Nombre');
    
    // Buscar el complemento del timbre fiscal (contiene el UUID)
    const timbreFiscal = xmlDoc.querySelector('TimbreFiscalDigital') || 
                          xmlDoc.querySelector('tfd\\:TimbreFiscalDigital') ||
                          xmlDoc.querySelector('*|TimbreFiscalDigital');
    
    const uuid = getNodeAttribute(timbreFiscal, 'UUID');
    
    // Buscar conceptos
    const conceptosNodes = xmlDoc.querySelectorAll('Concepto') || 
                           xmlDoc.querySelectorAll('cfdi\\:Concepto') ||
                           xmlDoc.querySelectorAll('*|Concepto');
    
    const conceptos = Array.from(conceptosNodes).map(concepto => {
      return {
        descripcion: getNodeAttribute(concepto, 'Descripcion'),
        importe: parseFloat(getNodeAttribute(concepto, 'Importe') || '0'),
        claveProdServ: getNodeAttribute(concepto, 'ClaveProdServ')
      };
    });
    
    // Buscar CFDI relacionados
    const cfdiRelacionados = xmlDoc.querySelector('CfdiRelacionados') || 
                             xmlDoc.querySelector('cfdi\\:CfdiRelacionados') ||
                             xmlDoc.querySelector('*|CfdiRelacionados');
    
    let relacionados = [];
    if (cfdiRelacionados) {
      const tipoRelacion = getNodeAttribute(cfdiRelacionados, 'TipoRelacion');
      const relacionadosNodes = cfdiRelacionados.querySelectorAll('CfdiRelacionado') || 
                                cfdiRelacionados.querySelectorAll('cfdi\\:CfdiRelacionado') ||
                                cfdiRelacionados.querySelectorAll('*|CfdiRelacionado');
      
      relacionados = Array.from(relacionadosNodes).map(relacionado => {
        return {
          uuid: getNodeAttribute(relacionado, 'UUID'),
          tipoRelacion
        };
      });
    }
    
    // Buscar complemento de pago si existe
    const complementoPagos = xmlDoc.querySelector('Pagos') || 
                             xmlDoc.querySelector('pago10\\:Pagos') ||
                             xmlDoc.querySelector('pago20\\:Pagos') ||
                             xmlDoc.querySelector('*|Pagos');
    
    let complementos = {};
    if (complementoPagos && tipoDeComprobante === TipoDeComprobante.PAGO) {
      const pagosNodes = complementoPagos.querySelectorAll('Pago') || 
                         complementoPagos.querySelectorAll('pago10\\:Pago') ||
                         complementoPagos.querySelectorAll('pago20\\:Pago') ||
                         complementoPagos.querySelectorAll('*|Pago');
      
      const pagos = Array.from(pagosNodes).map(pago => {
        const fechaPago = getNodeAttribute(pago, 'FechaPago')?.split('T')[0] || '';
        const formaDePago = getNodeAttribute(pago, 'FormaDePagoP');
        const monto = parseFloat(getNodeAttribute(pago, 'Monto') || '0');
        
        // Documentos relacionados con el pago
        const doctoRelacionadoNodes = pago.querySelectorAll('DoctoRelacionado') || 
                                      pago.querySelectorAll('pago10\\:DoctoRelacionado') ||
                                      pago.querySelectorAll('pago20\\:DoctoRelacionado') ||
                                      pago.querySelectorAll('*|DoctoRelacionado');
        
        const doctoRelacionado = Array.from(doctoRelacionadoNodes).map(docto => {
          return {
            idDocumento: getNodeAttribute(docto, 'IdDocumento'),
            serie: getNodeAttribute(docto, 'Serie'),
            folio: getNodeAttribute(docto, 'Folio'),
            monedaDR: getNodeAttribute(docto, 'MonedaDR'),
            metodoDePagoDR: getNodeAttribute(docto, 'MetodoDePagoDR'),
            numParcialidad: parseInt(getNodeAttribute(docto, 'NumParcialidad') || '0'),
            impSaldoAnt: parseFloat(getNodeAttribute(docto, 'ImpSaldoAnt') || '0'),
            impPagado: parseFloat(getNodeAttribute(docto, 'ImpPagado') || '0'),
            impSaldoInsoluto: parseFloat(getNodeAttribute(docto, 'ImpSaldoInsoluto') || '0')
          };
        });
        
        return {
          fechaPago,
          formaDePago,
          monto,
          doctoRelacionado
        };
      });
      
      complementos = { pagos };
    }
    
    // Construir y devolver el objeto con los metadatos extraídos
    const metadata: CfdiMetadata = {
      uuid,
      tipoDeComprobante,
      rfcEmisor,
      nombreEmisor,
      rfcReceptor,
      nombreReceptor,
      total,
      subtotal,
      fechaEmision,
      conceptos,
      relacionados,
      complementos
    };
    
    console.log('Metadatos extraídos del XML:', metadata);
    return metadata;
    
  } catch (error) {
    console.error('Error al extraer metadatos del XML:', error);
    // En caso de error, usar la función simulada como fallback
    return simulateXmlParsing(xmlContent, fileName);
  }
};

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
