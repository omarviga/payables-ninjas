
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllInvoices, initInvoices, updateInvoiceStatus, removeInvoice } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';

export const useInvoices = () => {
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
        loadInvoices();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [loadInvoices]);

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
  
  // Function to update invoice status
  const markInvoiceAsPaid = useCallback(async (invoiceId: string) => {
    try {
      const success = await updateInvoiceStatus(invoiceId, 'paid');
      
      if (success) {
        // Update the local list
        setAllInvoices(prev => 
          prev.map(inv => inv?.id === invoiceId ? { ...inv, status: 'paid' as const } : inv)
        );
        return { success: true };
      } else {
        return { success: false, error: "No se pudo marcar la factura como pagada" };
      }
    } catch (error) {
      console.error("Error al marcar factura como pagada:", error);
      return { success: false, error: "Ocurrió un error al intentar actualizar la factura" };
    }
  }, []);
  
  // Function to delete an invoice
  const deleteInvoice = useCallback(async (invoiceId: string) => {
    try {
      const success = await removeInvoice(invoiceId);
      
      if (success) {
        // Update the local list
        setAllInvoices(prev => prev.filter(inv => inv?.id !== invoiceId));
        return { success: true };
      } else {
        return { success: false, error: "No se pudo eliminar la factura" };
      }
    } catch (error) {
      console.error("Error al eliminar factura:", error);
      return { success: false, error: "Ocurrió un error al intentar eliminar la factura" };
    }
  }, []);
  
  // Function to filter invoices
  const filterInvoices = useCallback((searchQuery: string) => {
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
  }, [loadInvoices]);

  return { 
    allInvoices, 
    receivableInvoices, 
    payableInvoices,
    overdueInvoices,
    isLoading, 
    error,
    loadInvoices,
    markInvoiceAsPaid,
    deleteInvoice,
    filterInvoices
  };
};
