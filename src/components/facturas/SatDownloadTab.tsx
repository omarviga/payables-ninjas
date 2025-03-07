
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

interface SatDownloadTabProps {
  onConfigureConnection: () => void;
}

export function SatDownloadTab({ onConfigureConnection }: SatDownloadTabProps) {
  return (
    <div className="py-10 text-center">
      <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
      <h3 className="mt-4 text-lg font-medium">Descarga Automática del SAT</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
        Configura tus credenciales del SAT para automatizar la descarga de CFDIs emitidos y recibidos, incluyendo complementos de pago.
      </p>
      <Button 
        className="mt-6 bg-payables-600 hover:bg-payables-700"
        onClick={onConfigureConnection}
      >
        Configurar Conexión SAT
      </Button>
    </div>
  );
}
