
import React from 'react';
import { FileWarning } from 'lucide-react';

export function NoTaxDataMessage() {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
      <FileWarning className="h-16 w-16 text-muted-foreground" />
      <h3 className="text-xl font-medium">No hay datos de impuestos disponibles</h3>
      <p className="text-muted-foreground max-w-md">
        Registra pagos con información de impuestos para visualizar el informe de impuestos.
      </p>
    </div>
  );
}
