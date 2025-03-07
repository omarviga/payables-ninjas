
/**
 * Función para validar y filtrar archivos válidos (XML y PDF)
 * Esta función verifica si los archivos son XML o PDF basándose en la extensión
 * y el tipo MIME, siendo más permisiva con los archivos XML que pueden tener
 * diferentes tipos MIME según el navegador o sistema.
 */
export const filterValidFiles = (files: File[]): File[] => {
  return files.filter(file => {
    // Verificar extensión del archivo
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    // Validar archivos XML - enfoque más robusto
    const isXml = 
      fileExtension === 'xml' || 
      file.type === 'application/xml' || 
      file.type === 'text/xml' ||
      file.type.includes('xml') ||
      file.name.toLowerCase().endsWith('.xml');
    
    // Validar archivos PDF
    const isPdf = 
      fileExtension === 'pdf' ||
      file.type === 'application/pdf';
    
    // Devolver true si es XML o PDF
    return isXml || isPdf;
  });
};

/**
 * Función para validar específicamente si un archivo es XML
 */
export const isXmlFile = (file: File): boolean => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return fileExtension === 'xml' || 
         file.type === 'application/xml' || 
         file.type === 'text/xml' ||
         file.type.includes('xml') ||
         file.name.toLowerCase().endsWith('.xml');
};

/**
 * Función para validar específicamente si un archivo es PDF
 */
export const isPdfFile = (file: File): boolean => {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  return fileExtension === 'pdf' || file.type === 'application/pdf';
};
