
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, LockKeyhole, RefreshCw, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface SatAuthConfigFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  open: boolean;
}

export function SatAuthConfigForm({ onSuccess, onCancel, open }: SatAuthConfigFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'credentials' | 'captcha' | 'success'>('credentials');
  const [credentials, setCredentials] = useState({
    rfc: '',
    password: '',
    captcha: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de conexión
    toast({
      title: "Conectando con el SAT",
      description: "Verificando credenciales...",
    });

    // Simulamos una espera
    setTimeout(() => {
      setLoading(false);
      setStep('captcha');
    }, 2000);
  };

  const handleSubmitCaptcha = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulación de verificación de CAPTCHA
    toast({
      title: "Verificando CAPTCHA",
      description: "Completando autenticación...",
    });

    // Simulamos una espera
    setTimeout(() => {
      setLoading(false);
      setStep('success');
      
      // Guardar credenciales en localStorage para simular la persistencia
      localStorage.setItem('satCredentials', JSON.stringify({
        rfc: credentials.rfc,
        authenticated: true,
        timestamp: new Date().toISOString()
      }));

      toast({
        title: "Conexión exitosa",
        description: "Tus credenciales del SAT han sido verificadas y guardadas.",
      });

      setTimeout(() => {
        onSuccess();
      }, 1500);
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 'credentials':
        return (
          <form onSubmit={handleSubmitCredentials} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="rfc">RFC con Homoclave</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="rfc"
                  name="rfc"
                  value={credentials.rfc}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Ejemplo: XAXX010101000"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña del Portal</Label>
              <div className="relative">
                <LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="Contraseña del SAT"
                  required
                />
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-payables-600 hover:bg-payables-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : "Continuar"}
            </Button>
          </form>
        );
      
      case 'captcha':
        return (
          <form onSubmit={handleSubmitCaptcha} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="captcha">Código CAPTCHA</Label>
              <div className="bg-gray-100 dark:bg-gray-800 rounded-md mb-3 p-3 flex justify-center">
                <img 
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjYwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIyMDAiIGhlaWdodD0iNjAiIGZpbGw9IiNmMGYwZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzMzMyIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9IjgiPlhSMlNRNTwvdGV4dD48bGluZSB4MT0iMjAiIHkxPSIyMCIgeDI9IjE4MCIgeTI9IjQwIiBzdHJva2U9IiM2NjYiIHN0cm9rZS13aWR0aD0iMSIvPjxsaW5lIHgxPSI0MCIgeTE9IjUwIiB4Mj0iMTYwIiB5Mj0iMTAiIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+" 
                  alt="CAPTCHA" 
                  className="h-16"
                />
              </div>
              <Input
                id="captcha"
                name="captcha"
                value={credentials.captcha}
                onChange={handleChange}
                placeholder="Ingresa el código que ves arriba"
                required
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-payables-600 hover:bg-payables-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Verificando...
                </>
              ) : "Completar Verificación"}
            </Button>
          </form>
        );
      
      case 'success':
        return (
          <div className="text-center py-6">
            <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">¡Conexión Exitosa!</h3>
            <p className="text-muted-foreground mb-6">
              Tus credenciales del SAT han sido validadas correctamente.
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
          <SheetTitle>Configurar Conexión SAT</SheetTitle>
          <SheetDescription>
            Configura tus credenciales para sincronizar con el portal del SAT.
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
