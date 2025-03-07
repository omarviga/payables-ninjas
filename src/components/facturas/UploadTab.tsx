import React from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { addInvoices } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';
import { FileList } from './FileList';
import { DropZone } from './DropZone';
import { ProcessedInvoices } from './ProcessedInvoices';
import { useUploadFiles } from '@/hooks/use-upload-files';
import { AlertTriangle } from 'lucide-react';

interface UploadTabProps {
  onNavigateToInvoices: () => void;
}

export function UploadTab({ onNavigateToInvoices }: UploadTabProps) {
  const { toast } = useToast();
  const {
    files,
    cfdiTypes,
    uploading,
    progress,
    isDragging,
    processedInvoices,
    duplicateCount,
    setProcessedInvoices,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeFile,
    uploadFiles,
    handleClearFiles
  } = useUploadFiles();

  const handleOpenFileDialog = () => {
    document.getElementById('file-upload')?.click();
  };

  const handleProcessFiles = async () => {
    console.log("Iniciando procesamiento de archivos...");
    const result = await uploadFiles();
    
    if (!result) {
      console.warn("No se pudo completar el procesamiento de archivos");
      return;
    }
    
    if (result.newInvoices && result.newInvoices.length > 0) {
      console.log(`Se procesaron ${result.newInvoices.length} facturas correctamente`);
      
      try {
        // Guardar las facturas en el estado global
        const savedInvoices = await addInvoices(result.newInvoices);
        console.log("Facturas guardadas:", savedInvoices);
        
        if (savedInvoices && savedInvoices.length > 0) {
          setProcessedInvoices(savedInvoices);
          
          toast({
            title: "Carga completada",
            description: `Se han procesado ${result.newInvoices.length} CFDIs correctamente.${
              result.duplicateCount ? ` Se omitieron ${result.duplicateCount} CFDIs duplicados.` : ''
            }`
          });
        } else {
          console.warn("No se recibieron facturas guardadas");
          toast({
            title: "Advertencia",
            description: "Se procesaron los archivos pero no se pudieron guardar las facturas.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Error al guardar las facturas:", error);
        toast({
          title: "Error al guardar",
          description: "Se procesaron los archivos pero ocurrió un error al guardar las facturas.",
          variant: "destructive"
        });
      }
    } else if (result.duplicateCount > 0) {
      console.log(`No se encontraron facturas nuevas para procesar, ${result.duplicateCount} duplicados detectados`);
      toast({
        title: "Facturas duplicadas",
        description: `Todas las facturas seleccionadas (${result.duplicateCount}) ya existen en el sistema.`,
        variant: "destructive"
      });
    } else {
      console.warn("No se encontraron XMLs válidos para procesar o el proceso falló");
      toast({
        title: "No se encontraron XMLs válidos",
        description: "Ninguno de los archivos seleccionados contiene datos CFDI válidos o hubo un error en el proceso.",
        variant: "destructive"
      });
    }
  };

  const handleClear = () => {
    handleClearFiles();
    toast({
      title: "Lista de archivos limpiada",
      description: "Se han eliminado todos los archivos seleccionados."
    });
  };

  return (
    <div className="space-y-4 py-4">
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
      
      {files && files.length > 0 && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">CFDIs seleccionados ({files.length})</h3>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleClear}
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
              onClick={handleProcessFiles} 
              disabled={uploading || files.length === 0}
              className="bg-payables-600 hover:bg-payables-700"
            >
              {uploading ? 'Procesando...' : 'Procesar CFDIs'}
            </Button>
          </div>
        </div>
      )}
      
      {duplicateCount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4 flex items-start">
          <AlertTriangle className="text-amber-500 h-5 w-5 mt-0.5 mr-2 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-amber-700">Facturas duplicadas</h4>
            <p className="text-sm text-amber-600">
              Se detectaron {duplicateCount} facturas que ya existen en el sistema y no fueron procesadas nuevamente.
            </p>
          </div>
        </div>
      )}
      
      <ProcessedInvoices 
        invoices={processedInvoices || []} 
        onNavigateToInvoices={onNavigateToInvoices} 
      />
    </div>
  );
}
