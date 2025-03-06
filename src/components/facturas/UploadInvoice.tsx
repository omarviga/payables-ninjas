
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, FilePlus2, FileWarning } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

export function UploadInvoice() {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Filtrar solo archivos XML y PDF
    const validFiles = newFiles.filter(file => 
      file.type === 'application/xml' || 
      file.type === 'application/pdf' || 
      file.name.endsWith('.xml')
    );
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Formato no válido",
        description: "Solo se permiten archivos XML y PDF.",
        variant: "destructive"
      });
    }
    
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = () => {
    if (files.length === 0) {
      toast({
        title: "Sin archivos",
        description: "Por favor, selecciona al menos un archivo para cargar.",
        variant: "destructive"
      });
      return;
    }
    
    setUploading(true);
    setProgress(0);
    
    // Simulación de carga
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          toast({
            title: "Carga completada",
            description: `Se han procesado ${files.length} facturas correctamente.`
          });
          
          // Limpiar archivos después de la carga
          setFiles([]);
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  const fileIcon = (fileName: string) => {
    return fileName.endsWith('.xml') ? 
      <FileText className="h-8 w-8 text-payables-600" /> : 
      <FilePlus2 className="h-8 w-8 text-success" />;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Cargar Facturas</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Carga Manual</TabsTrigger>
            <TabsTrigger value="sat">Descarga SAT</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-4 py-4">
            <div
              className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-colors ${
                isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".xml,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <UploadCloud className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">
                Arrastra y suelta archivos aquí
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                o <span className="text-primary font-medium">haz clic para seleccionar</span>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Se admiten archivos XML y PDF (CFDI y representación impresa)
              </p>
            </div>
            
            {files.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">Archivos seleccionados ({files.length})</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setFiles([])}
                    disabled={uploading}
                  >
                    Limpiar
                  </Button>
                </div>
                
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                  {files.map((file, index) => (
                    <div 
                      key={`${file.name}-${index}`}
                      className="flex items-center justify-between p-2 border rounded-md"
                    >
                      <div className="flex items-center space-x-3">
                        {fileIcon(file.name)}
                        <div>
                          <p className="text-sm font-medium line-clamp-1">{file.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {(file.size / 1024).toFixed(1)} KB
                          </p>
                        </div>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => removeFile(index)}
                        disabled={uploading}
                      >
                        <FileWarning className="h-4 w-4 text-danger" />
                      </Button>
                    </div>
                  ))}
                </div>
                
                {uploading && (
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Procesando facturas...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                  </div>
                )}
                
                <div className="mt-6 flex justify-end">
                  <Button 
                    onClick={uploadFiles} 
                    disabled={uploading || files.length === 0}
                    className="bg-payables-600 hover:bg-payables-700"
                  >
                    {uploading ? 'Procesando...' : 'Procesar Facturas'}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sat">
            <div className="py-10 text-center">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Descarga Automática del SAT</h3>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
                Configura tus credenciales del SAT para automatizar la descarga de facturas emitidas y recibidas.
              </p>
              <Button 
                className="mt-6 bg-payables-600 hover:bg-payables-700"
              >
                Configurar Conexión SAT
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
