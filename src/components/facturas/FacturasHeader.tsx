
import { Button } from '@/components/ui/button';
import { FileUp, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const FacturasHeader = () => {
  const { toast } = useToast();

  const handleImportInvoices = () => {
    toast({
      title: "Importar facturas",
      description: "Esta funcionalidad permitirá importar facturas desde un archivo CSV.",
    });
  };

  const handleDownloadFromSAT = () => {
    toast({
      title: "Conectando con el SAT",
      description: "Iniciando proceso de descarga de facturas desde el portal del SAT.",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-heading">Facturas</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona todas tus facturas emitidas y recibidas
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          className="sm:w-auto"
          onClick={handleImportInvoices}
        >
          <FileUp className="mr-2 h-4 w-4" />
          Cargar Facturas
        </Button>
        <Button 
          className="bg-payables-600 hover:bg-payables-700 sm:w-auto"
          onClick={handleDownloadFromSAT}
        >
          <Download className="mr-2 h-4 w-4" />
          Descargar del SAT
        </Button>
      </div>
    </div>
  );
};
