
import { useToast } from '@/hooks/use-toast';
import { Invoice } from '@/data/invoices';
import { isXmlFile } from '@/services/util/fileValidator';
import { processXmlFile } from '@/services/invoiceProcessor';

export function useFileUploadProcessor(
  files: File[],
  setProgress: React.Dispatch<React.SetStateAction<number>>,
  setUploading: React.Dispatch<React.SetStateAction<boolean>>,
  setProcessedInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>,
  setDuplicateCount: React.Dispatch<React.SetStateAction<number>>
) {
  const { toast } = useToast();

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
          variant: "destructive"
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

  return { uploadFiles };
}
