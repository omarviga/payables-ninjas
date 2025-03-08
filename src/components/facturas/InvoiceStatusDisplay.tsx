
import { FileText } from 'lucide-react';

interface InvoiceStatusDisplayProps {
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
}

export const InvoiceStatusDisplay = ({ isLoading, error, isEmpty }: InvoiceStatusDisplayProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse flex flex-col items-center">
          <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
          <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-slate-200 rounded w-24"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 border rounded-lg bg-red-50">
        <FileText className="w-12 h-12 mx-auto text-red-400" />
        <h3 className="mt-4 text-lg font-medium text-red-500">Error al cargar facturas</h3>
        <p className="mt-2 text-sm text-red-500 max-w-md mx-auto">
          {error}. Por favor intenta nuevamente más tarde o contacta a soporte.
        </p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="text-center py-12 border rounded-lg bg-gray-50">
        <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">No hay facturas disponibles</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Utiliza el botón "Cargar Facturas" para subir tus primeros CFDIs o configura la conexión con el SAT.
        </p>
      </div>
    );
  }

  return null;
};
