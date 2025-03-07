
import { Button } from '@/components/ui/button';
import { FileUp, Download } from 'lucide-react';

interface FacturasHeaderProps {
  onUploadClick?: () => void;
}

export const FacturasHeader = ({ onUploadClick }: FacturasHeaderProps) => {
  const handleImportInvoices = () => {
    if (onUploadClick) {
      onUploadClick();
    }
  };

  const handleDownloadFromSAT = () => {
    // Esta función se implementará en el futuro
    console.log("Función para descargar desde el SAT pendiente de implementar");
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
