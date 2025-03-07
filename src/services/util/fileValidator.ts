
// Función para filtrar archivos válidos (XML y PDF)
export const filterValidFiles = (files: File[]): File[] => {
  return files.filter(file => 
    file.type === 'application/xml' || 
    file.type === 'text/xml' ||
    file.name.endsWith('.xml') ||
    file.type === 'application/pdf'
  );
};
