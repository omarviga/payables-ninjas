
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, ShieldCheck, Settings } from "lucide-react";
import { SatDownloadForm } from './SatDownloadForm';
import { SatAuthConfigForm } from './SatAuthConfigForm';
import { useToast } from "@/hooks/use-toast";

interface SatDownloadTabProps {
  onConfigureConnection: () => void;
  onNavigateToInvoices?: () => void;
}

export function SatDownloadTab({ onConfigureConnection, onNavigateToInvoices = () => {} }: SatDownloadTabProps) {
  const { toast } = useToast();
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [showAuthForm, setShowAuthForm] = useState<boolean>(false);
  
  // Verificamos si hay credenciales guardadas al montar el componente
  useEffect(() => {
    const hasSatCredentials = localStorage.getItem('satCredentials');
    setIsConfigured(!!hasSatCredentials);
  }, []);
  
  const handleConfigureSat = () => {
    // Mostramos el formulario de autenticación FIEL
    setShowAuthForm(true);
    onConfigureConnection();
  };
  
  const handleAuthClose = () => {
    setShowAuthForm(false);
  };
  
  const handleAuthSuccess = () => {
    setIsConfigured(true);
    setShowAuthForm(false);
    
    toast({
      title: "Configuración completada",
      description: "Se ha configurado correctamente la conexión con el SAT.",
    });
  };
  
  if (!isConfigured) {
    return (
      <div className="py-10 text-center">
        <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Descarga Automática del SAT</h3>
        <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
          Configura tu e.firma (FIEL) para descargar de forma segura los CFDIs emitidos y recibidos, incluyendo complementos de pago.
        </p>
        <Button 
          className="mt-6 bg-payables-600 hover:bg-payables-700"
          onClick={handleConfigureSat}
        >
          <ShieldCheck className="mr-2 h-4 w-4" />
          Configurar con e.firma
        </Button>
        
        {/* Formulario de configuración FIEL */}
        <SatAuthConfigForm 
          open={showAuthForm}
          onCancel={handleAuthClose}
          onSuccess={handleAuthSuccess}
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
          Reconfigurar e.firma
        </Button>
        
        {/* Formulario de configuración FIEL */}
        <SatAuthConfigForm 
          open={showAuthForm}
          onCancel={handleAuthClose}
          onSuccess={handleAuthSuccess}
        />
      </div>
      
      <SatDownloadForm onNavigateToInvoices={onNavigateToInvoices} />
    </div>
  );
}
