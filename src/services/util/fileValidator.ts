
/**
 * Funciones para validar y filtrar archivos válidos (XML y PDF)
 * Esta capa de validación es crucial para asegurar que solo se procesen
 * archivos con el formato correcto.
 */

/**
 * Verifica si un archivo es XML basándose en múltiples criterios
 * para mayor compatibilidad con diferentes navegadores y sistemas.
 */
export const isXmlFile = (file: File): boolean => {
  // Obtener extensión en minúsculas
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  // Verificar el nombre del archivo (case insensitive)
  const fileNameCheck = file.name.toLowerCase().endsWith('.xml');
  
  // Verificar tipo MIME (varios tipos posibles para XML)
  const mimeTypeCheck = 
    file.type === 'application/xml' || 
    file.type === 'text/xml' ||
    file.type.includes('xml');
  
  // Resultado final de la validación
  const result = fileExtension === 'xml' || mimeTypeCheck || fileNameCheck;
  
  console.log(`Validación XML para ${file.name}: 
    - Extensión: ${fileExtension} (${fileExtension === 'xml' ? 'Válido' : 'Inválido'})
    - Nombre termina en .xml: ${fileNameCheck ? 'Sí' : 'No'}
    - Tipo MIME: ${file.type} (${mimeTypeCheck ? 'Válido' : 'Inválido'})
    - RESULTADO: ${result ? 'ES XML VÁLIDO' : 'NO ES XML VÁLIDO'}
  `);
  
  return result;
};

/**
 * Verifica si un archivo es PDF basándose en su extensión y tipo MIME.
 */
export const isPdfFile = (file: File): boolean => {
  // Obtener extensión en minúsculas
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  // Verificar extensión y tipo MIME
  const result = fileExtension === 'pdf' || file.type === 'application/pdf';
  
  console.log(`Validación PDF para ${file.name}: 
    - Extensión: ${fileExtension} (${fileExtension === 'pdf' ? 'Válido' : 'Inválido'})
    - Tipo MIME: ${file.type} (${file.type === 'application/pdf' ? 'Válido' : 'Inválido'})
    - RESULTADO: ${result ? 'ES PDF VÁLIDO' : 'NO ES PDF VÁLIDO'}
  `);
  
  return result;
};

/**
 * Filtra archivos para quedarse solo con XMLs y PDFs válidos
 */
export const filterValidFiles = (files: File[]): File[] => {
  console.log(`Filtrando ${files.length} archivos...`);
  
  const validFiles = files.filter(file => {
    const validXml = isXmlFile(file);
    const validPdf = isPdfFile(file);
    return validXml || validPdf;
  });
  
  console.log(`Resultado del filtrado: ${validFiles.length} archivos válidos de ${files.length} totales`);
  return validFiles;
};
