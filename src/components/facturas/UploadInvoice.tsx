
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';
import { addInvoices } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';
import { DropZone } from './DropZone';
import { FileList } from './FileList';
import { ProcessedInvoices } from './ProcessedInvoices';
import { SatDownloadTab } from './SatDownloadTab';
import { processXmlFile, detectCfdiType, filterValidFiles } from '@/services/invoiceProcessor';

export function UploadInvoice() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cfdiTypes, setCfdiTypes] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('upload');
  const [processedInvoices, setProcessedInvoices] = useState<Invoice[]>([]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
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
    const validFiles = filterValidFiles(newFiles);
    
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
        updatedCfdiTypes[file.name] = detectCfdiType(file.name);
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

  const uploadFiles = async () => {
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
    setProcessedInvoices([]);
    
    // Procesar solo archivos XML
    const xmlFiles = files.filter(file => 
      file.type === 'application/xml' || 
      file.type === 'text/xml' || 
      file.name.endsWith('.xml')
    );
    
    const newInvoices: Invoice[] = [];
    let processed = 0;
    
    // Procesar cada archivo XML
    for (const file of xmlFiles) {
      const invoice = await processXmlFile(file);
      newInvoices.push(invoice);
      
      processed++;
      setProgress(Math.floor((processed / xmlFiles.length) * 100));
    }
    
    // Agregar facturas procesadas al sistema
    if (newInvoices.length > 0) {
      // Guardar las facturas en el estado global
      addInvoices(newInvoices);
      setProcessedInvoices(newInvoices);
      
      toast({
        title: "Carga completada",
        description: `Se han procesado ${newInvoices.length} CFDIs correctamente.`
      });
    } else {
      toast({
        title: "No se encontraron XMLs válidos",
        description: "Ninguno de los archivos seleccionados contiene datos CFDI válidos.",
        variant: "destructive"
      });
    }
    
    setUploading(false);
  };

  const handleClearFiles = () => {
    setFiles([]);
    setCfdiTypes({});
    setProcessedInvoices([]);
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
  
  const navigateToInvoices = () => {
    navigate('/facturas');
  };

  const handleOpenFileDialog = () => {
    document.getElementById('file-upload')?.click();
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
            <input
              id="file-upload"
              type="file"
              multiple
              accept=".xml,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <DropZone 
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleOpenFileDialog}
            />
            
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
                
                <FileList 
                  files={files}
                  cfdiTypes={cfdiTypes}
                  onRemoveFile={removeFile}
                  uploading={uploading}
                />
                
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
            
            <ProcessedInvoices 
              invoices={processedInvoices} 
              onNavigateToInvoices={navigateToInvoices} 
            />
          </TabsContent>
          
          <TabsContent value="sat">
            <SatDownloadTab onConfigureConnection={configureConnection} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
