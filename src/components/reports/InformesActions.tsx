
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FileDown, Printer, Share2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function InformesActions() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  // Improved action handlers with error handling and loading states
  const handlePrint = () => {
    try {
      setIsPrinting(true);
      toast({
        title: "Imprimiendo informe",
        description: "Preparando documento para imprimir...",
      });
      
      setTimeout(() => {
        window.print();
        setIsPrinting(false);
      }, 500);
    } catch (error) {
      setIsPrinting(false);
      toast({
        title: "Error al imprimir",
        description: "Ocurrió un error al intentar imprimir el informe.",
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    try {
      setIsSharing(true);
      toast({
        title: "Compartir informe",
        description: "Preparando opciones para compartir...",
      });
      
      setTimeout(() => {
        // Simulation for share functionality
        setIsSharing(false);
        toast({
          title: "Compartir",
          description: "Función de compartir en desarrollo",
        });
      }, 800);
    } catch (error) {
      setIsSharing(false);
      toast({
        title: "Error al compartir",
        description: "Ocurrió un error al intentar compartir el informe.",
        variant: "destructive",
      });
    }
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      toast({
        title: "Exportando datos",
        description: "Preparando archivo de exportación...",
      });
      
      // Simulación de generación y descarga de archivo CSV
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create a simple CSV file
      const csvContent = "data:text/csv;charset=utf-8," + 
        "Fecha,Concepto,Monto\n" +
        "2023-01-15,Factura #001,25000\n" +
        "2023-01-22,Factura #002,18000\n" +
        "2023-02-05,Factura #003,32000";
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `informe_financiero.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast({
        title: "Exportación completada",
        description: "El archivo ha sido descargado",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error al exportar",
        description: "Ocurrió un error durante la exportación.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Button 
        variant="outline" 
        className="sm:w-auto"
        onClick={handlePrint}
        disabled={isPrinting}
      >
        {isPrinting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Printer className="mr-2 h-4 w-4" />
        )}
        {isPrinting ? "Imprimiendo..." : "Imprimir"}
      </Button>
      <Button 
        variant="outline" 
        className="sm:w-auto"
        onClick={handleShare}
        disabled={isSharing}
      >
        {isSharing ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Share2 className="mr-2 h-4 w-4" />
        )}
        {isSharing ? "Compartiendo..." : "Compartir"}
      </Button>
      <Button 
        className="bg-payables-600 hover:bg-payables-700 sm:w-auto"
        onClick={handleExport}
        disabled={isExporting}
      >
        {isExporting ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FileDown className="mr-2 h-4 w-4" />
        )}
        {isExporting ? "Exportando..." : "Exportar"}
      </Button>
    </div>
  );
}
