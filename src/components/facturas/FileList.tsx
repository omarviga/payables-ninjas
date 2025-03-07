
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, FilePlus2, FileWarning, Receipt, FileSpreadsheet, FileBadge, FileCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FileListProps {
  files: File[];
  cfdiTypes: Record<string, string>;
  onRemoveFile: (index: number) => void;
  uploading: boolean;
}

export function FileList({ files, cfdiTypes, onRemoveFile, uploading }: FileListProps) {
  const fileIcon = (fileName: string) => {
    if (fileName.endsWith('.xml')) {
      const type = cfdiTypes[fileName] || 'ingreso';
      
      switch (type) {
        case 'complemento-pago':
        case 'pago':
          return <Receipt className="h-8 w-8 text-blue-600" />;
        case 'nota-credito':
        case 'egreso':
          return <FileBadge className="h-8 w-8 text-purple-600" />;
        case 'traslado':
          return <FileSpreadsheet className="h-8 w-8 text-amber-600" />;
        case 'nomina':
          return <FileCheck className="h-8 w-8 text-green-600" />;
        default:
          return <FileText className="h-8 w-8 text-payables-600" />;
      }
    } else {
      return <FilePlus2 className="h-8 w-8 text-success" />;
    }
  };

  const getCfdiTypeLabel = (fileName: string) => {
    if (!fileName.endsWith('.xml')) return null;
    
    const type = cfdiTypes[fileName] || 'ingreso';
    let label = 'CFDI de Ingreso';
    let className = 'bg-payables-600 text-white';
    
    switch (type) {
      case 'complemento-pago':
      case 'pago':
        label = 'CFDI de Pago';
        className = 'bg-blue-600 text-white';
        break;
      case 'nota-credito':
        label = 'Nota de Crédito';
        className = 'bg-purple-600 text-white';
        break;
      case 'egreso':
        label = 'CFDI de Egreso';
        className = 'bg-purple-600 text-white';
        break;
      case 'traslado':
        label = 'CFDI de Traslado';
        className = 'bg-amber-600 text-white';
        break;
      case 'nomina':
        label = 'CFDI de Nómina';
        className = 'bg-green-600 text-white';
        break;
    }
    
    return (
      <Badge className={className + " ml-2 text-[10px]"}>
        {label}
      </Badge>
    );
  };

  return (
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
            onClick={() => onRemoveFile(index)}
            disabled={uploading}
          >
            <FileWarning className="h-4 w-4 text-danger" />
          </Button>
        </div>
      ))}
    </div>
  );
}
