
import React from 'react';
import { UploadCloud } from "lucide-react";

interface DropZoneProps {
  isDragging: boolean;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
}

export function DropZone({ isDragging, onDragOver, onDragLeave, onDrop, onClick }: DropZoneProps) {
  return (
    <div
      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
        isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
      }`}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={onClick}
    >
      <UploadCloud className="h-12 w-12 mx-auto text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">
        Arrastra y suelta archivos aquí
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        o <span className="text-primary font-medium">haz clic para seleccionar</span>
      </p>
      <p className="mt-1 text-xs text-muted-foreground">
        Se admiten CFDIs en XML y representaciones impresas en PDF
      </p>
      <p className="text-xs text-muted-foreground">
        (Facturas, Complementos de Pago, Notas de Crédito, etc.)
      </p>
    </div>
  );
}
