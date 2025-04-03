
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FileText, Settings } from "lucide-react";
import { SatDownloadForm } from './SatDownloadForm';
import { SATLoginModal } from './SATLoginModal';
import { useToast } from "@/hooks/use-toast";

interface SatDownloadTabProps {
  onConfigureConnection: () => void;
  onNavigateToInvoices?: () => void;
}

export function SatDownloadTab({ onConfigureConnection, onNavigateToInvoices = () => {} }: SatDownloadTabProps) {
  const { toast } = useToast();
  const [isConfigured, setIsConfigured] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  
  // Verificamos si hay credenciales guardadas al montar el componente
  useEffect(() => {
    const hasSatCredentials = localStorage.getItem('satCredentials');
    setIsConfigured(!!hasSatCredentials);
  }, []);
  
  const handleConfigureSat = () => {
    // Mostramos el modal de login
    setShowLoginModal(true);
    onConfigureConnection();
  };
  
  const handleLoginClose = () => {
    setShowLoginModal(false);
  };
  
  const handleSatLogin = async (username: string, password: string): Promise<boolean> => {
    try {
      // En un caso real, aquí se realizaría la validación con un backend
      // Para este demo, simularemos una validación exitosa
      console.log("Credenciales para SAT:", { username, password });
      
      // Guardar credenciales en localStorage (en un caso real usaríamos métodos más seguros)
      const credentials = {
        rfc: username,
        token: "JWT_SIMULATED_TOKEN_" + Date.now(), // En un caso real sería un JWT del backend
        expiresAt: Date.now() + 3600000 // 1 hora de expiración
      };
      
      localStorage.setItem('satCredentials', JSON.stringify(credentials));
      setIsConfigured(true);
      
      return true;
    } catch (error) {
      console.error("Error en login SAT:", error);
      toast({
        title: "Error de autenticación",
        description: "No se pudieron validar las credenciales con el SAT",
        variant: "destructive"
      });
      return false;
    }
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
          Configurar Acceso SAT
        </Button>
        
        {/* Modal de login del SAT */}
        <SATLoginModal 
          open={showLoginModal}
          onClose={handleLoginClose}
          onLogin={handleSatLogin}
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
        
        {/* Modal de login del SAT */}
        <SATLoginModal 
          open={showLoginModal}
          onClose={handleLoginClose}
          onLogin={handleSatLogin}
        />
      </div>
      
      <SatDownloadForm onNavigateToInvoices={onNavigateToInvoices} />
    </div>
  );
}
