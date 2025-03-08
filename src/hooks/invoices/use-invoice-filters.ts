
import { useMemo } from 'react';
import { getAllInvoices } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';
import type { InvoiceFilterResult } from './types';

export const useInvoiceFilters = (
  allInvoices: Invoice[],
  loadInvoices: () => Promise<void>,
  setAllInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>
) => {
  // Memorize filtered invoices
  const receivableInvoices = useMemo(() => 
    allInvoices.filter(inv => inv?.type === 'receivable') || [], 
    [allInvoices]
  );

  const payableInvoices = useMemo(() => 
    allInvoices.filter(inv => inv?.type === 'payable') || [], 
    [allInvoices]
  );
  
  const overdueInvoices = useMemo(() => 
    allInvoices.filter(inv => inv?.status === 'overdue') || [], 
    [allInvoices]
  );

  // Function to filter invoices
  const filterInvoices = (searchQuery: string): InvoiceFilterResult | undefined => {
    if (!searchQuery.trim()) {
      loadInvoices();
      return;
    }

    const allAvailableInvoices = getAllInvoices();
    if (!Array.isArray(allAvailableInvoices)) {
      console.warn("getAllInvoices no devolvió un array válido en filterInvoices");
      return { filteredCount: 0, success: false };
    }

    const filtered = allAvailableInvoices.filter(inv => 
      inv?.number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv?.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv?.amount?.toString().includes(searchQuery)
    );
    
    setAllInvoices(filtered);
    return { filteredCount: filtered.length, success: true };
  };

  return {
    receivableInvoices,
    payableInvoices,
    overdueInvoices,
    filterInvoices
  };
};
