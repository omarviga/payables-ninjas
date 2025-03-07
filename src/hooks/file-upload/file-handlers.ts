
import { useToast } from '@/hooks/use-toast';
import { filterValidFiles, isXmlFile } from '@/services/util/fileValidator';
import { detectCfdiType } from '@/services/util/cfdiTypeDetector';

export function useFileHandlers(
  files: File[],
  setFiles: React.Dispatch<React.SetStateAction<File[]>>,
  cfdiTypes: Record<string, string>,
  setCfdiTypes: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>
) {
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    console.log(`Se soltaron ${droppedFiles.length} archivos en la zona de arrastre`);
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      console.log(`Se seleccionaron ${selectedFiles.length} archivos mediante el diálogo`);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    console.log("===== INICIO PROCESAMIENTO DE ARCHIVOS =====");
    console.log(`Archivos recibidos (${newFiles.length}):`, newFiles.map(f => `${f.name} (${f.type})`));
    
    if (!newFiles || newFiles.length === 0) {
      console.warn("No se recibieron archivos para procesar");
      return;
    }
    
    const validFiles = filterValidFiles(newFiles);
    console.log(`Archivos validados (${validFiles.length}):`, validFiles.map(f => `${f.name} (${f.type})`));
    
    if (validFiles.length !== newFiles.length) {
      const rechazados = newFiles.length - validFiles.length;
      console.log(`Se rechazaron ${rechazados} archivos por no ser XML o PDF válidos`);
      
      toast({
        title: "Formato no válido",
        description: `Se ignoraron ${rechazados} archivos. Solo se permiten XML (CFDI) y PDF.`,
        variant: "destructive"
      });
    }
    
    if (validFiles.length === 0) {
      console.log("No se encontraron archivos válidos para procesar");
      
      toast({
        title: "Sin archivos válidos",
        description: "Ninguno de los archivos seleccionados es un XML o PDF válido.",
        variant: "destructive"
      });
      return;
    }
    
    const updatedCfdiTypes = { ...cfdiTypes };
    let xmlCount = 0;
    
    validFiles.forEach(file => {
      if (isXmlFile(file)) {
        xmlCount++;
        console.log(`Archivo XML detectado: ${file.name}`);
        updatedCfdiTypes[file.name] = detectCfdiType(file.name);
      }
    });
    
    console.log(`Se encontraron ${xmlCount} archivos XML válidos para procesar`);
    setCfdiTypes(updatedCfdiTypes);
    setFiles(prev => [...prev, ...validFiles]);
    
    toast({
      title: "Archivos seleccionados",
      description: `Se han añadido ${validFiles.length} archivos a la lista (${xmlCount} XML).`
    });
    
    console.log("===== FIN PROCESAMIENTO DE ARCHIVOS =====");
  };

  const removeFile = (index: number) => {
    if (index < 0 || index >= files.length) {
      console.warn("Intento de eliminar un archivo con índice inválido:", index);
      return;
    }
    
    const fileToRemove = files[index];
    setFiles(prev => prev.filter((_, i) => i !== index));
    
    if (fileToRemove && fileToRemove.name in cfdiTypes) {
      const updatedTypes = { ...cfdiTypes };
      delete updatedTypes[fileToRemove.name];
      setCfdiTypes(updatedTypes);
    }
  };

  return {
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeFile
  };
}
