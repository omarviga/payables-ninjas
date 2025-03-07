
import { Invoice } from '@/data/invoices';

export interface FileUploadState {
  files: File[];
  cfdiTypes: Record<string, string>;
  uploading: boolean;
  progress: number;
  isDragging: boolean;
  processedInvoices: Invoice[];
  duplicateCount: number;
}

export interface FileUploadActions {
  setProcessedInvoices: (invoices: Invoice[]) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: (index: number) => void;
  uploadFiles: () => Promise<{
    newInvoices?: Invoice[];
    processedCount?: number;
    duplicateCount?: number;
  } | null>;
  handleClearFiles: () => void;
}

export type UseFileUploadReturn = FileUploadState & FileUploadActions;
