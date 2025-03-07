
import { useState } from 'react';
import { Invoice } from '@/data/invoices';
import { useFileHandlers } from './file-upload/file-handlers';
import { useFileUploadProcessor } from './file-upload/upload-processor';
import type { UseFileUploadReturn } from './file-upload/types';

export function useUploadFiles(): UseFileUploadReturn {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [cfdiTypes, setCfdiTypes] = useState<Record<string, string>>({});
  const [processedInvoices, setProcessedInvoices] = useState<Invoice[]>([]);
  const [duplicateCount, setDuplicateCount] = useState(0);

  const { 
    handleDragOver, 
    handleDragLeave, 
    handleDrop, 
    handleFileChange, 
    removeFile 
  } = useFileHandlers(
    files, 
    setFiles, 
    cfdiTypes, 
    setCfdiTypes, 
    setIsDragging
  );

  const { uploadFiles } = useFileUploadProcessor(
    files,
    setProgress,
    setUploading,
    setProcessedInvoices,
    setDuplicateCount
  );

  const handleClearFiles = () => {
    setFiles([]);
    setCfdiTypes({});
    setProcessedInvoices([]);
    setDuplicateCount(0);
  };

  return {
    // State
    files,
    cfdiTypes,
    uploading,
    progress,
    isDragging,
    processedInvoices,
    duplicateCount,
    // Actions
    setProcessedInvoices,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileChange,
    removeFile,
    uploadFiles,
    handleClearFiles
  };
}
