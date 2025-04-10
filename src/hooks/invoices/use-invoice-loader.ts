
import { useState, useCallback, useEffect } from 'react';
import { getAllInvoices, initInvoices } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';

export const useInvoiceLoader = () => {
  const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInvoices = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Iniciando carga de facturas...");
      await initInvoices();
      const invoices = getAllInvoices();
      console.log("Facturas cargadas:", invoices.length, invoices);
      
      // Asegurarnos de que tenemos un array válido
      if (Array.isArray(invoices)) {
        setAllInvoices(invoices);
      } else {
        console.warn("getAllInvoices no devolvió un array válido:", invoices);
        setAllInvoices([]);
      }
    } catch (err) {
      console.error("Error loading invoices:", err);
      setError("Error al cargar las facturas. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInvoices();
    
    // Recargar las facturas cada vez que se regresa a la página
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log("Documento visible, recargando facturas...");
        loadInvoices();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadInvoices]);

  return {
    allInvoices,
    setAllInvoices,
    isLoading,
    error,
    loadInvoices
  };
};
