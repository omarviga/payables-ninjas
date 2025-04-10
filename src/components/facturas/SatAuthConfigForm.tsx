
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CheckCircle, Key, ShieldCheck } from "lucide-react";
import { SatFielUploader } from './SatFielUploader';
import { satService } from '@/services/satService';

interface SatAuthConfigFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  open: boolean;
}

export function SatAuthConfigForm({ onSuccess, onCancel, open }: SatAuthConfigFormProps) {
  const { toast } = useToast();
  const [step, setStep] = useState<'upload' | 'success'>('upload');

  const handleFielComplete = async (fielData: { keyFile: File, cerFile: File, password: string }) => {
    try {
      // Llamar al servicio para autenticar con FIEL
      const result = await satService.authenticateWithFiel(
        fielData.keyFile,
        fielData.cerFile,
        fielData.password
      );
      
      if (result.success) {
        // En un caso real, el backend almacenaría de forma segura las credenciales
        // y solo devolvería un token de sesión para operaciones futuras
        
        // Para mantener la compatibilidad con el código existente,
        // guardamos únicamente información no sensible en el localStorage
        const safeAuthData = {
          rfc: result.rfc,
          authenticated: true,
          sessionToken: result.sessionToken,
          authType: 'fiel',
          timestamp: new Date().toISOString(),
        };
        
        // En producción, solo deberíamos guardar un token de sesión,
        // no información sensible
        localStorage.setItem('satCredentials', JSON.stringify(safeAuthData));
        
        console.log("FIEL autenticada:", safeAuthData);
        
        toast({
          title: "Certificado validado",
          description: result.message || "Tu e.firma ha sido validada correctamente.",
        });
        
        setStep('success');
        return true;
      } else {
        toast({
          title: "Error de validación",
          description: result.error || "No se pudo validar tu e.firma. Verifica tus archivos.",
          variant: "destructive"
        });
        return false;
      }
    } catch (error) {
      console.error("Error al procesar e.firma:", error);
      toast({
        title: "Error de procesamiento",
        description: "Ocurrió un error al procesar los archivos de e.firma.",
        variant: "destructive"
      });
      return false;
    }
  };

  const renderStep = () => {
    switch (step) {
      case 'upload':
        return (
          <SatFielUploader 
            onComplete={handleFielComplete}
            onCancel={onCancel}
          />
        );
      
      case 'success':
        return (
          <div className="text-center py-6">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">¡Conexión Exitosa!</h3>
            <p className="text-muted-foreground mb-6">
              Tu e.firma ha sido validada correctamente para conectar con el SAT.
            </p>
            <Button 
              onClick={onSuccess}
              className="w-full bg-payables-600 hover:bg-payables-700"
            >
              Continuar
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={(open) => !open && onCancel()}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Configurar Acceso Seguro al SAT</SheetTitle>
          <SheetDescription>
            Para garantizar la seguridad de tus datos fiscales, utilizamos tu e.firma (FIEL) para autenticar con el SAT.
          </SheetDescription>
        </SheetHeader>
        
        <div className="py-6">
          {renderStep()}
        </div>
        
        {step !== 'success' && (
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline" onClick={onCancel}>Cancelar</Button>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
