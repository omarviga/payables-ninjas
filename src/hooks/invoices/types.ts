
import type { Invoice } from '@/data/invoices';

export interface InvoiceFilterResult {
  filteredCount: number;
  success: boolean;
  error?: string;
}

export interface InvoiceStatusResult {
  success: boolean;
  error?: string;
}

export interface SATDownloadResult {
  success: boolean;
  downloadedCount?: number;
  error?: string;
}

export interface UseInvoicesReturn {
  allInvoices: Invoice[];
  receivableInvoices: Invoice[];
  payableInvoices: Invoice[];
  overdueInvoices: Invoice[];
  isLoading: boolean;
  error: string | null;
  loadInvoices: () => Promise<void>;
  markInvoiceAsPaid: (invoiceId: string) => Promise<InvoiceStatusResult>;
  deleteInvoice: (invoiceId: string) => Promise<InvoiceStatusResult>;
  filterInvoices: (searchQuery: string) => InvoiceFilterResult | undefined;
  downloadInvoicesFromSAT: (certPem: string, keyPem: string, requestId: string) => Promise<SATDownloadResult>;
}
