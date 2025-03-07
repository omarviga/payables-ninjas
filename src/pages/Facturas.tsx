
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FacturasHeader } from '@/components/facturas/FacturasHeader';
import { FacturasFilterBar } from '@/components/facturas/FacturasFilterBar';
import { InvoiceTabs } from '@/components/facturas/InvoiceTabs';
import { getAllInvoices, initInvoices, updateInvoiceStatus } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Facturas = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [error, setError] = useState<string | null>(null);

  console.log("Renderizando página Facturas");

  // Cargar todas las facturas al montar el componente
  useEffect(() => {
    const loadInvoices = async () => {
      setLoading(true);
      setError(null);
      
      try {
        console.log("Iniciando carga de facturas...");
        await initInvoices();
        const invoices = getAllInvoices();
        console.log("Facturas cargadas:", invoices.length, invoices);
        
        // Asegurarnos de que tenemos un array válido
        if (Array.isArray(invoices)) {
          setInvoicesList(invoices);
        } else {
          console.warn("getAllInvoices no devolvió un array válido:", invoices);
          setInvoicesList([]);
        }
      } catch (error) {
        console.error("Error al cargar facturas:", error);
        setError("No se pudieron cargar las facturas");
        toast({
          title: "Error al cargar facturas",
          description: "No se pudieron cargar las facturas. Intenta de nuevo más tarde.",
          variant: "destructive"
        });
        // Asegurarnos de que tenemos un array válido incluso en caso de error
        setInvoicesList([]);
      } finally {
        setLoading(false);
      }
    };

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
  }, [toast]);

  // Asegurarnos de que tengamos valores por defecto para evitar errores
  const receiveInvoices = invoicesList?.filter(inv => inv?.type === 'receivable') || [];
  const payableInvoices = invoicesList?.filter(inv => inv?.type === 'payable') || [];
  const overdueInvoices = invoicesList?.filter(inv => inv?.status === 'overdue') || [];

  console.log("Actualizando datos de facturas:", {
    all: invoicesList?.length || 0,
    receivable: receiveInvoices?.length || 0,
    payable: payableInvoices?.length || 0,
    overdue: overdueInvoices?.length || 0
  });

  const handleFilter = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      const allInvoices = getAllInvoices();
      setInvoicesList(Array.isArray(allInvoices) ? allInvoices : []);
      return;
    }

    const allInvoices = getAllInvoices();
    if (!Array.isArray(allInvoices)) {
      console.warn("getAllInvoices no devolvió un array válido en handleFilter:", allInvoices);
      return;
    }

    const filtered = allInvoices.filter(inv => 
      inv?.number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv?.client?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv?.amount?.toString().includes(searchQuery)
    );
    
    setInvoicesList(filtered);
    
    toast({
      title: `Resultados de búsqueda`,
      description: `Se encontraron ${filtered.length} facturas que coinciden con "${searchQuery}"`,
    });
  };

  const handleResetFilter = () => {
    const allInvoices = getAllInvoices();
    setInvoicesList(Array.isArray(allInvoices) ? allInvoices : []);
  };

  const handleMarkAsPaid = async (invoiceId: string) => {
    try {
      const success = await updateInvoiceStatus(invoiceId, 'paid');
      
      if (success) {
        // Actualizar la lista local
        const updatedInvoices = invoicesList.map(inv => 
          inv?.id === invoiceId ? { ...inv, status: 'paid' as const } : inv
        );
        setInvoicesList(updatedInvoices);
        
        toast({
          title: "Factura marcada como pagada",
          description: "La factura ha sido actualizada exitosamente.",
        });
      } else {
        toast({
          title: "Error al actualizar factura",
          description: "No se pudo marcar la factura como pagada. Intenta de nuevo más tarde.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error al marcar factura como pagada:", error);
      toast({
        title: "Error al actualizar factura",
        description: "Ocurrió un error al intentar actualizar la factura.",
        variant: "destructive"
      });
    }
  };

  const handleViewInvoice = (invoiceId: string) => {
    const invoice = invoicesList.find(inv => inv?.id === invoiceId);
    
    toast({
      title: `Vista previa de factura: ${invoice?.number || 'Sin número'}`,
      description: `Cliente: ${invoice?.client || 'Desconocido'}, Monto: $${invoice?.amount?.toLocaleString('es-MX') || '0'}`,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    const invoice = invoicesList.find(inv => inv?.id === invoiceId);
    
    toast({
      title: "Descargando factura",
      description: `Descargando factura ${invoice?.number || 'Sin número'} en formato PDF.`,
    });
  };

  const handleExportInvoices = () => {
    toast({
      title: "Exportando facturas",
      description: `Se están exportando ${
        activeTab === 'all' ? invoicesList.length : 
        activeTab === 'receivable' ? receiveInvoices.length :
        activeTab === 'payable' ? payableInvoices.length : 
        overdueInvoices.length
      } facturas a formato CSV.`,
    });
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleUploadFacturas = () => {
    navigate('/cargar-facturas');
  };

  return (
    <div className="flex flex-col gap-6">
      <FacturasHeader onUploadClick={handleUploadFacturas} />
      
      <FacturasFilterBar 
        onFilter={handleFilter}
        onResetFilter={handleResetFilter}
        onExport={handleExportInvoices}
      />
      
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="rounded-full bg-slate-200 h-12 w-12 mb-4"></div>
            <div className="h-4 bg-slate-200 rounded w-32 mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-24"></div>
          </div>
        </div>
      ) : error ? (
        <div className="text-center py-12 border rounded-lg bg-red-50">
          <FileText className="w-12 h-12 mx-auto text-red-400" />
          <h3 className="mt-4 text-lg font-medium text-red-500">Error al cargar facturas</h3>
          <p className="mt-2 text-sm text-red-500 max-w-md mx-auto">
            {error}. Por favor intenta nuevamente más tarde o contacta a soporte.
          </p>
        </div>
      ) : invoicesList.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No hay facturas disponibles</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Utiliza el botón "Cargar Facturas" para subir tus primeros CFDIs o configura la conexión con el SAT.
          </p>
        </div>
      ) : (
        <InvoiceTabs 
          allInvoices={invoicesList}
          receiveInvoices={receiveInvoices}
          payableInvoices={payableInvoices}
          overdueInvoices={overdueInvoices}
          onViewInvoice={handleViewInvoice}
          onDownloadInvoice={handleDownloadInvoice}
          onMarkAsPaid={handleMarkAsPaid}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default Facturas;
