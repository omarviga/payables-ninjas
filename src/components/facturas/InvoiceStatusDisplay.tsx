
import { Loader2 } from 'lucide-react';

interface InvoiceStatusDisplayProps {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export const InvoiceStatusDisplay = ({ isLoading, error, isEmpty }: InvoiceStatusDisplayProps) => {
  // Solo mostrar este componente cuando corresponda (cargando, error o vacío)
  if (!isLoading && !error && !isEmpty) {
    return null;
  }

  return (
    <div className="border rounded-lg p-8 w-full text-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
          <p className="text-lg font-medium">Cargando facturas...</p>
        </div>
      ) : error ? (
        <div className="text-red-600">
          <p className="text-lg font-medium">Error al cargar facturas</p>
          <p className="text-sm text-muted-foreground mt-1">{error}</p>
        </div>
      ) : isEmpty ? (
        <div>
          <p className="text-lg font-medium">No hay facturas disponibles</p>
          <p className="text-sm text-muted-foreground mt-1">
            Carga nuevas facturas o descarga desde el SAT para comenzar.
          </p>
        </div>
      ) : null}
    </div>
  );
};
