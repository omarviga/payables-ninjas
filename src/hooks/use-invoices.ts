
import { useState, useEffect, useMemo } from 'react';
import { getAllInvoices } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';

export const useInvoices = () => {
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInvoices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const invoices = getAllInvoices();
        // Small delay to simulate network latency (only in development for better UX testing)
        if (process.env.NODE_ENV === 'development') {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
        setAllInvoices(invoices);
      } catch (err) {
        console.error("Error loading invoices:", err);
        setError("Error al cargar las facturas. Por favor, inténtalo de nuevo.");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadInvoices();
  }, []);

  // Memorize filtered invoices
  const receivableInvoices = useMemo(() => 
    allInvoices.filter(inv => inv.type === 'receivable'), 
    [allInvoices]
  );

  const payableInvoices = useMemo(() => 
    allInvoices.filter(inv => inv.type === 'payable'), 
    [allInvoices]
  );

  return { 
    allInvoices, 
    receivableInvoices, 
    payableInvoices, 
    isLoading, 
    error 
  };
};
