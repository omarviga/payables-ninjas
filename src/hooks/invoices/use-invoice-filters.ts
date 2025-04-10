
import { useMemo } from 'react';
import { getAllInvoices } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';
import type { InvoiceFilterResult } from './types';

export const useInvoiceFilters = (
  allInvoices: Invoice[],
  loadInvoices: () => Promise<void>,
  setAllInvoices: React.Dispatch<React.SetStateAction<Invoice[]>>
) => {
  // Asegurarnos de que allInvoices siempre sea un array
  const safeInvoices = Array.isArray(allInvoices) ? allInvoices : [];
  
  // Memorize filtered invoices
  const receivableInvoices = useMemo(() => 
    safeInvoices.filter(inv => inv?.type === 'receivable') || [], 
    [safeInvoices]
  );

  const payableInvoices = useMemo(() => 
    safeInvoices.filter(inv => inv?.type === 'payable') || [], 
    [safeInvoices]
  );
  
  const overdueInvoices = useMemo(() => 
    safeInvoices.filter(inv => inv?.status === 'overdue') || [], 
    [safeInvoices]
  );

  console.log("Invoices filtradas:", {
    total: safeInvoices.length,
    receivable: receivableInvoices.length,
    payable: payableInvoices.length,
    overdue: overdueInvoices.length
  });

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
    
    console.log(`Filtrado completado: ${filtered.length} resultados para "${searchQuery}"`);
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
