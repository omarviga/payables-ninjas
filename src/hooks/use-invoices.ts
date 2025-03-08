
import { useState } from 'react';
import { useInvoiceLoader } from './invoices/use-invoice-loader';
import { useInvoiceFilters } from './invoices/use-invoice-filters';
import { useInvoiceActions } from './invoices/use-invoice-actions';
import { useSATDownload } from './invoices/use-sat-download';
import type { UseInvoicesReturn } from './invoices/types';

export const useInvoices = (): UseInvoicesReturn => {
  // Use the refactored hooks
  const { 
    allInvoices, 
    setAllInvoices, 
    isLoading, 
    error, 
    loadInvoices 
  } = useInvoiceLoader();
  
  const { 
    receivableInvoices, 
    payableInvoices, 
    overdueInvoices, 
    filterInvoices 
  } = useInvoiceFilters(allInvoices, loadInvoices, setAllInvoices);
  
  const { 
    markInvoiceAsPaid, 
    deleteInvoice 
  } = useInvoiceActions(setAllInvoices);
  
  const [isLoadingState, setIsLoadingState] = useState(false);
  const combinedIsLoading = isLoading || isLoadingState;
  
  const { 
    downloadInvoicesFromSAT 
  } = useSATDownload(setAllInvoices, setIsLoadingState);

  return { 
    allInvoices, 
    receivableInvoices, 
    payableInvoices,
    overdueInvoices,
    isLoading: combinedIsLoading, 
    error,
    loadInvoices,
    markInvoiceAsPaid,
    deleteInvoice,
    filterInvoices,
    downloadInvoicesFromSAT
  };
};
