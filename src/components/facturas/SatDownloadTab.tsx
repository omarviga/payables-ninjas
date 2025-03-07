
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Settings } from "lucide-react";
import { SatDownloadForm } from './SatDownloadForm';
import { SatAuthConfigForm } from './SatAuthConfigForm';

interface SatDownloadTabProps {
  onConfigureConnection: () => void;
  onNavigateToInvoices?: () => void;
}

export function SatDownloadTab({ onConfigureConnection, onNavigateToInvoices = () => {} }: SatDownloadTabProps) {
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [showAuthConfig, setShowAuthConfig] = useState<boolean>(false);
  
  // Verificamos si hay credenciales guardadas al montar el componente
  useEffect(() => {
    const hasSatConfig = localStorage.getItem('satCredentials');
    setIsConfigured(!!hasSatConfig);
  }, []);
  
  const handleConfigureSat = () => {
    // Mostramos el formulario de configuración
    setShowAuthConfig(true);
    onConfigureConnection();
  };
  
  const handleAuthSuccess = () => {
    setShowAuthConfig(false);
    setIsConfigured(true);
  };
  
  const handleAuthCancel = () => {
    setShowAuthConfig(false);
  };
  
  if (!isConfigured) {
    return (
      <div className="py-10 text-center">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Descarga Automática del SAT</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Configura tus credenciales del SAT para automatizar la descarga de CFDIs emitidos y recibidos, incluyendo complementos de pago.
        </p>
        <Button 
          className="mt-6 bg-payables-600 hover:bg-payables-700"
          onClick={handleConfigureSat}
        >
          <Settings className="mr-2 h-4 w-4" />
          Configurar Conexión SAT
        </Button>
        
        {/* Formulario de autenticación del SAT */}
        <SatAuthConfigForm 
          open={showAuthConfig}
          onSuccess={handleAuthSuccess}
          onCancel={handleAuthCancel}
        />
      </div>
    );
  }
  
  return (
    <div className="py-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Descarga de Facturas del SAT</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleConfigureSat}
        >
          <Settings className="mr-2 h-4 w-4" />
          Reconfigurar
        </Button>
        
        {/* Formulario de autenticación del SAT */}
        <SatAuthConfigForm 
          open={showAuthConfig}
          onSuccess={handleAuthSuccess}
          onCancel={handleAuthCancel}
        />
      </div>
      
      <SatDownloadForm onNavigateToInvoices={onNavigateToInvoices} />
    </div>
  );
}
