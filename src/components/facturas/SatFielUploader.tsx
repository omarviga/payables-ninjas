
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FileKey, FileCertificate, RefreshCw, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

interface SatFielUploaderProps {
  onComplete: (fielData: { keyFile: File, cerFile: File, password: string }) => Promise<boolean>;
  onCancel: () => void;
}

export function SatFielUploader({ onComplete, onCancel }: SatFielUploaderProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fielFiles, setFielFiles] = useState<{
    keyFile: File | null;
    cerFile: File | null;
  }>({
    keyFile: null,
    cerFile: null
  });
  const [password, setPassword] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'keyFile' | 'cerFile') => {
    if (e.target.files && e.target.files.length > 0) {
      setFielFiles(prev => ({
        ...prev,
        [fileType]: e.target.files?.[0] || null
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fielFiles.keyFile || !fielFiles.cerFile || !password) {
      toast({
        title: "Faltan datos",
        description: "Debes proporcionar los archivos .key, .cer y la contraseña de la FIEL",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setUploadProgress(10);
    
    try {
      // Simulación de progreso
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress(40);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setUploadProgress(70);
      
      // Llamada al método que proporcionará los archivos al backend
      const success = await onComplete({
        keyFile: fielFiles.keyFile,
        cerFile: fielFiles.cerFile,
        password
      });
      
      setUploadProgress(100);
      
      if (success) {
        toast({
          title: "Configuración exitosa",
          description: "Los certificados FIEL han sido configurados correctamente.",
        });
      } else {
        toast({
          title: "Error de configuración",
          description: "No se pudieron configurar los certificados. Verifica tus archivos y contraseña.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error al configurar FIEL:", error);
      toast({
        title: "Error de configuración",
        description: "Ocurrió un error al procesar los certificados FIEL.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-border">
      <CardContent className="pt-6">
        <div className="space-y-1 mb-4">
          <h3 className="text-lg font-semibold">Configurar e.firma (FIEL)</h3>
          <p className="text-sm text-muted-foreground">
            Sube tus archivos de e.firma para autenticar con el SAT de forma segura.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="key-file" className="flex items-center">
              <FileKey className="mr-2 h-4 w-4" />
              Archivo .key
            </Label>
            <Input
              id="key-file"
              type="file"
              accept=".key"
              onChange={(e) => handleFileChange(e, 'keyFile')}
              disabled={loading}
            />
            {fielFiles.keyFile && (
              <p className="text-xs text-muted-foreground">
                {fielFiles.keyFile.name}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="cer-file" className="flex items-center">
              <FileCertificate className="mr-2 h-4 w-4" />
              Archivo .cer
            </Label>
            <Input
              id="cer-file"
              type="file"
              accept=".cer"
              onChange={(e) => handleFileChange(e, 'cerFile')}
              disabled={loading}
            />
            {fielFiles.cerFile && (
              <p className="text-xs text-muted-foreground">
                {fielFiles.cerFile.name}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fiel-password" className="flex items-center">
              <ShieldCheck className="mr-2 h-4 w-4" />
              Contraseña de la e.firma
            </Label>
            <Input
              id="fiel-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña de tu e.firma"
              disabled={loading}
            />
          </div>
          
          {loading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Procesando certificados...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit"
              className="bg-payables-600 hover:bg-payables-700"
              disabled={loading || !fielFiles.keyFile || !fielFiles.cerFile || !password}
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : "Configurar e.firma"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
