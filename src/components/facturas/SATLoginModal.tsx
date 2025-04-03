
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";

interface SATLoginModalProps {
  open: boolean;
  onClose: () => void;
  onLogin: (username: string, password: string) => Promise<boolean>;
}

export function SATLoginModal({ open, onClose, onLogin }: SATLoginModalProps) {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) {
      toast({
        title: "Datos incompletos",
        description: "Por favor ingresa tu RFC y contraseña del SAT",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      const success = await onLogin(username, password);
      
      if (success) {
        toast({
          title: "Autenticación exitosa",
          description: "Se ha configurado la conexión con el SAT correctamente",
        });
        onClose();
      } else {
        toast({
          title: "Error de autenticación",
          description: "Las credenciales proporcionadas no son válidas",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error de conexión",
        description: "No se pudo establecer conexión con el SAT",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Acceso a Descarga Masiva del SAT</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="sat-username">RFC</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="sat-username"
                value={username}
                onChange={(e) => setUsername(e.target.value.toUpperCase())}
                placeholder="Ingresa tu RFC"
                className="pl-10"
                disabled={isLoading}
                autoComplete="username"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sat-password">Contraseña</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="sat-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña del SAT"
                className="pl-10"
                disabled={isLoading}
                autoComplete="current-password"
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-payables-600 hover:bg-payables-700"
          >
            {isLoading ? "Autenticando..." : "Iniciar sesión"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
