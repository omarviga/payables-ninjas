
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Invoice } from '@/data/invoices';
import { filterValidFiles, isXmlFile } from '@/services/util/fileValidator';
import { processXmlFile } from '@/services/invoiceProcessor';
import { detectCfdiType } from '@/services/util/cfdiTypeDetector';

export function useUploadFiles() {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cfdiTypes, setCfdiTypes] = useState<Record<string, string>>({});
  const [processedInvoices, setProcessedInvoices] = useState<Invoice[]>([]);
  const [duplicateCount, setDuplicateCount] = useState(0);

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
    
    // Filtrar solo archivos XML y PDF usando la función mejorada
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
    
    // Detectar tipo de CFDI para los archivos XML
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
    
    // Mostrar mensaje de éxito
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
    
    // Eliminar el tipo de CFDI si existe
    if (fileToRemove && fileToRemove.name in cfdiTypes) {
      const updatedTypes = { ...cfdiTypes };
      delete updatedTypes[fileToRemove.name];
      setCfdiTypes(updatedTypes);
    }
  };

  const uploadFiles = async () => {
    console.log("===== INICIO CARGA DE ARCHIVOS =====");
    console.log(`Iniciando procesamiento de ${files.length} archivos`);
    
    if (!files || files.length === 0) {
      toast({
        title: "Sin archivos",
        description: "Por favor, selecciona al menos un archivo para cargar.",
        variant: "destructive"
      });
      return null;
    }
    
    try {
      setUploading(true);
      setProgress(0);
      setProcessedInvoices([]);
      setDuplicateCount(0);
      
      // Procesar solo archivos XML
      const xmlFiles = files.filter(file => {
        if (!file) return false;
        const isXml = isXmlFile(file);
        console.log(`Validando archivo ${file.name}: ${isXml ? 'Es XML' : 'No es XML'}`);
        return isXml;
      });
      
      console.log(`Se encontraron ${xmlFiles.length} archivos XML de ${files.length} totales`);
      
      if (xmlFiles.length === 0) {
        toast({
          title: "Sin archivos XML",
          description: "No hay archivos XML para procesar. Por favor, selecciona al menos un archivo XML.",
          variant: "destructive"
        });
        setUploading(false);
        return null;
      }
      
      console.log(`Procesando ${xmlFiles.length} archivos XML`);
      const newInvoices: Invoice[] = [];
      let processed = 0;
      let duplicates = 0;
      
      // Procesar cada archivo XML
      for (const file of xmlFiles) {
        try {
          console.log(`Procesando archivo XML: ${file.name}`);
          const { invoice, isDuplicate } = await processXmlFile(file);
          
          if (isDuplicate) {
            duplicates++;
            console.log(`Factura duplicada detectada: ${invoice.uuid}`);
          } else {
            console.log(`Factura procesada: ${invoice.number}, Tipo: ${invoice.cfdiType}, Monto: ${invoice.amount}`);
            newInvoices.push(invoice);
          }
          
          processed++;
          setProgress(Math.floor((processed / xmlFiles.length) * 100));
        } catch (error) {
          console.error(`Error al procesar archivo ${file.name}:`, error);
          toast({
            title: `Error en archivo ${file.name}`,
            description: "No se pudo procesar el archivo. Verifica que sea un XML válido.",
            variant: "destructive"
          });
        }
      }
      
      setDuplicateCount(duplicates);
      
      if (duplicates > 0) {
        toast({
          title: `${duplicates} facturas duplicadas`,
          description: `Se encontraron ${duplicates} facturas que ya existen en el sistema y no se procesaron nuevamente.`,
          variant: "warning"
        });
      }
      
      return { newInvoices, processedCount: processed, duplicateCount: duplicates };
    } catch (error) {
      console.error("Error durante el procesamiento de archivos:", error);
      toast({
        title: "Error al procesar archivos",
        description: "Ocurrió un error inesperado al procesar los archivos.",
        variant: "destructive"
      });
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleClearFiles = () => {
    setFiles([]);
    setCfdiTypes({});
    setProcessedInvoices([]);
    setDuplicateCount(0);
  };

  return {
    files,
    cfdiTypes,
    uploading,
    progress,
    isDragging,
    processedInvoices,
    duplicateCount,
    setProcessedInvoices,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeFile,
    uploadFiles,
    handleClearFiles
  };
}
