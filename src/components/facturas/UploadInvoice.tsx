
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UploadCloud, FileText, FilePlus2, FileWarning, Receipt } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';

export function UploadInvoice() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cfdiTypes, setCfdiTypes] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('upload');

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
      file.type === 'text/xml' ||
      file.name.endsWith('.xml') ||
      file.type === 'application/pdf'
    );
    
    if (validFiles.length !== newFiles.length) {
      toast({
        title: "Formato no válido",
        description: "Solo se permiten archivos XML (CFDI) y PDF.",
        variant: "destructive"
      });
    }
    
    // Detectar tipo de CFDI para los archivos XML
    const updatedCfdiTypes = { ...cfdiTypes };
    
    validFiles.forEach(file => {
      if (file.name.endsWith('.xml')) {
        // Simulación de detección de tipo de CFDI
        if (file.name.toLowerCase().includes('pago')) {
          updatedCfdiTypes[file.name] = 'complemento-pago';
        } else if (file.name.toLowerCase().includes('nota')) {
          updatedCfdiTypes[file.name] = 'nota-credito';
        } else {
          updatedCfdiTypes[file.name] = 'factura';
        }
      }
    });
    
    setCfdiTypes(updatedCfdiTypes);
    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    const fileToRemove = files[index];
    setFiles(prev => prev.filter((_, i) => i !== index));
    
    // Eliminar el tipo de CFDI si existe
    if (fileToRemove && fileToRemove.name in cfdiTypes) {
      const updatedTypes = { ...cfdiTypes };
      delete updatedTypes[fileToRemove.name];
      setCfdiTypes(updatedTypes);
    }
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
            description: `Se han procesado ${files.length} CFDIs correctamente.`
          });
          
          // Redireccionar después de una carga exitosa
          setTimeout(() => {
            navigate('/facturas');
          }, 1500);
          
          // Limpiar archivos después de la carga
          setFiles([]);
          setCfdiTypes({});
          return 0;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleClearFiles = () => {
    setFiles([]);
    setCfdiTypes({});
    toast({
      title: "Lista de archivos limpiada",
      description: "Se han eliminado todos los archivos seleccionados."
    });
  };

  const configureConnection = () => {
    toast({
      title: "Configuración SAT",
      description: "Se abrirá el formulario para configurar la conexión con el SAT."
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const fileIcon = (fileName: string) => {
    if (fileName.endsWith('.xml')) {
      const type = cfdiTypes[fileName] || 'factura';
      
      switch (type) {
        case 'complemento-pago':
          return <Receipt className="h-8 w-8 text-blue-600" />;
        case 'nota-credito':
          return <FilePlus2 className="h-8 w-8 text-purple-600" />;
        default:
          return <FileText className="h-8 w-8 text-payables-600" />;
      }
    } else {
      return <FilePlus2 className="h-8 w-8 text-success" />;
    }
  };

  const getCfdiTypeLabel = (fileName: string) => {
    if (!fileName.endsWith('.xml')) return null;
    
    const type = cfdiTypes[fileName] || 'factura';
    let label = 'Factura';
    let className = 'bg-payables-600 text-white';
    
    switch (type) {
      case 'complemento-pago':
        label = 'Complemento de Pago';
        className = 'bg-blue-600 text-white';
        break;
      case 'nota-credito':
        label = 'Nota de Crédito';
        className = 'bg-purple-600 text-white';
        break;
    }
    
    return (
      <Badge className={className + " ml-2 text-[10px]"}>
        {label}
      </Badge>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Cargar Facturas (CFDI)</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs 
          defaultValue="upload" 
          value={activeTab} 
          onValueChange={handleTabChange}
        >
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
                Se admiten CFDIs en XML y representaciones impresas en PDF
              </p>
              <p className="text-xs text-muted-foreground">
                (Facturas, Complementos de Pago, Notas de Crédito, etc.)
              </p>
            </div>
            
            {files.length > 0 && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium">CFDIs seleccionados ({files.length})</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleClearFiles}
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
                          <div className="flex items-center">
                            <p className="text-sm font-medium line-clamp-1">{file.name}</p>
                            {getCfdiTypeLabel(file.name)}
                          </div>
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
                      <span>Procesando CFDIs...</span>
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
                    {uploading ? 'Procesando...' : 'Procesar CFDIs'}
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
                Configura tus credenciales del SAT para automatizar la descarga de CFDIs emitidos y recibidos, incluyendo complementos de pago.
              </p>
              <Button 
                className="mt-6 bg-payables-600 hover:bg-payables-700"
                onClick={configureConnection}
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
