
import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllInvoices, initInvoices, updateInvoiceStatus, removeInvoice } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';
import { useToast } from '@/hooks/use-toast';

export const useInvoices = () => {
  const { toast } = useToast();
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

  // Nueva función para descargar facturas directamente del SAT
  const downloadInvoicesFromSAT = useCallback(async (certPem: string, keyPem: string, requestId: string) => {
    if (!certPem || !keyPem) {
      toast({
        title: "Error de configuración",
        description: "Falta el certificado o la clave privada para conectar con el SAT",
        variant: "destructive"
      });
      return { success: false, error: "Configuración incompleta" };
    }

    try {
      setIsLoading(true);
      toast({
        title: "Descargando facturas",
        description: "Iniciando descarga de facturas desde el SAT...",
      });

      // Aquí iría la lógica real para conectar con el SAT y descargar facturas
      // Este es un simulador para demostración
      console.log("Descargando facturas del SAT con:", { certPem: certPem.substring(0, 10) + "...", keyPem: keyPem.substring(0, 10) + "...", requestId });
      
      // Simular un tiempo de espera para la descarga
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular facturas descargadas del SAT (en un caso real, estas vendrían del servicio del SAT)
      const demoInvoices: Invoice[] = [
        {
          id: `sat-${Date.now()}-1`,
          number: `SAT-${Math.floor(Math.random() * 10000)}`,
          client: "SERVICIO DE ADMINISTRACIÓN TRIBUTARIA",
          amount: Math.floor(Math.random() * 10000) + 1000,
          date: new Date().toLocaleDateString('es-MX'),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX'),
          status: Math.random() > 0.5 ? 'paid' : 'pending',
          type: Math.random() > 0.5 ? 'receivable' : 'payable',
          uuid: `uuid-sat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        },
        {
          id: `sat-${Date.now()}-2`,
          number: `SAT-${Math.floor(Math.random() * 10000)}`,
          client: "CFE SUMINISTRADOR DE SERVICIOS BÁSICOS",
          amount: Math.floor(Math.random() * 10000) + 1000,
          date: new Date().toLocaleDateString('es-MX'),
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('es-MX'),
          status: 'pending',
          type: 'payable',
          uuid: `uuid-sat-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        }
      ];
      
      // Actualizar la lista local con las nuevas facturas
      setAllInvoices(prev => [...prev, ...demoInvoices]);
      
      toast({
        title: "Descarga completada",
        description: `Se descargaron ${demoInvoices.length} facturas del SAT exitosamente.`,
      });
      
      return { success: true, downloadedCount: demoInvoices.length };
    } catch (error) {
      console.error("Error al descargar facturas del SAT:", error);
      toast({
        title: "Error de descarga",
        description: "Ocurrió un error al intentar descargar facturas del SAT.",
        variant: "destructive"
      });
      return { success: false, error: "Error al conectar con el SAT" };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

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
    filterInvoices,
    downloadInvoicesFromSAT // Exportamos la nueva función
  };
};
