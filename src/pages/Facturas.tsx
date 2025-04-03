
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FacturasHeader } from '@/components/facturas/FacturasHeader';
import { FacturasFilterBar } from '@/components/facturas/FacturasFilterBar';
import { InvoiceTabs } from '@/components/facturas/InvoiceTabs';
import { InvoiceStatusDisplay } from '@/components/facturas/InvoiceStatusDisplay';
import { useNavigate } from 'react-router-dom';
import { useInvoices } from '@/hooks/use-invoices';

const Facturas = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  const { 
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
    downloadInvoicesFromSAT
  } = useInvoices();

  console.log("Renderizando página Facturas");

  console.log("Actualizando datos de facturas:", {
    all: allInvoices?.length || 0,
    receivable: receivableInvoices?.length || 0,
    payable: payableInvoices?.length || 0,
    overdue: overdueInvoices?.length || 0
  });

  const handleFilter = useCallback((searchQuery: string) => {
    const result = filterInvoices(searchQuery);
    
    if (result && result.success) {
      toast({
        title: `Resultados de búsqueda`,
        description: `Se encontraron ${result.filteredCount} facturas que coinciden con "${searchQuery}"`,
      });
    }
  }, [filterInvoices, toast]);

  const handleResetFilter = useCallback(() => {
    loadInvoices();
  }, [loadInvoices]);

  const handleMarkAsPaid = useCallback(async (invoiceId: string) => {
    const result = await markInvoiceAsPaid(invoiceId);
    
    if (result.success) {
      toast({
        title: "Factura marcada como pagada",
        description: "La factura ha sido actualizada exitosamente.",
      });
    } else {
      toast({
        title: "Error al actualizar factura",
        description: result.error || "No se pudo marcar la factura como pagada. Intenta de nuevo más tarde.",
        variant: "destructive"
      });
    }
  }, [markInvoiceAsPaid, toast]);

  const handleDeleteInvoice = useCallback(async (invoiceId: string) => {
    const result = await deleteInvoice(invoiceId);
    
    if (result.success) {
      toast({
        title: "Factura eliminada",
        description: "La factura ha sido eliminada exitosamente.",
      });
    } else {
      toast({
        title: "Error al eliminar factura",
        description: result.error || "No se pudo eliminar la factura. Intenta de nuevo más tarde.",
        variant: "destructive"
      });
    }
  }, [deleteInvoice, toast]);

  const handleViewInvoice = useCallback((invoiceId: string) => {
    const invoice = allInvoices.find(inv => inv?.id === invoiceId);
    
    toast({
      title: `Vista previa de factura: ${invoice?.number || 'Sin número'}`,
      description: `Cliente: ${invoice?.client || 'Desconocido'}, Monto: $${invoice?.amount?.toLocaleString('es-MX') || '0'}`,
    });
  }, [allInvoices, toast]);

  const handleDownloadInvoice = useCallback((invoiceId: string) => {
    const invoice = allInvoices.find(inv => inv?.id === invoiceId);
    
    toast({
      title: "Descargando factura",
      description: `Descargando factura ${invoice?.number || 'Sin número'} en formato PDF.`,
    });
  }, [allInvoices, toast]);

  const handleExportInvoices = useCallback(() => {
    const count = activeTab === 'all' ? allInvoices.length : 
                 activeTab === 'receivable' ? receivableInvoices.length :
                 activeTab === 'payable' ? payableInvoices.length : 
                 overdueInvoices.length;
                 
    toast({
      title: "Exportando facturas",
      description: `Se están exportando ${count} facturas a formato CSV.`,
    });
  }, [activeTab, allInvoices.length, receivableInvoices.length, payableInvoices.length, overdueInvoices.length, toast]);

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value);
  }, []);

  const handleUploadFacturas = useCallback(() => {
    navigate('/cargar-facturas');
  }, [navigate]);

  // Función para manejar la descarga desde el SAT (actualizada para usar el nuevo sistema de autenticación)
  const handleDownloadFromSAT = useCallback(async () => {
    const requestId = 'REQ-' + Date.now();
    
    // Verificar si ya hay credenciales guardadas
    const satCredentialsStr = localStorage.getItem('satCredentials');
    if (!satCredentialsStr) {
      // Si no hay credenciales, redirigir a la página de configuración
      toast({
        title: "Configuración requerida",
        description: "Necesitas configurar tus credenciales del SAT primero.",
      });
      navigate('/cargar-facturas');
      return;
    }

    // Fixed: Now correctly calls the function with just the requestId parameter
    // as specified in our updated type definition
    const result = await downloadInvoicesFromSAT(requestId);
    
    if (!result.success) {
      toast({
        title: "Error al descargar del SAT",
        description: result.error || "No se pudieron descargar las facturas del SAT. Verifica tu configuración.",
        variant: "destructive"
      });
    }
  }, [downloadInvoicesFromSAT, toast, navigate]);

  const showContent = !isLoading && !error && allInvoices.length > 0;

  return (
    <div className="flex flex-col gap-6">
      <FacturasHeader onUploadClick={handleUploadFacturas} />
      
      <FacturasFilterBar 
        onFilter={handleFilter}
        onResetFilter={handleResetFilter}
        onExport={handleExportInvoices}
        onDownloadFromSAT={handleDownloadFromSAT}
      />
      
      <InvoiceStatusDisplay 
        isLoading={isLoading} 
        error={error} 
        isEmpty={!isLoading && !error && allInvoices.length === 0} 
      />

      {showContent && (
        <InvoiceTabs 
          allInvoices={allInvoices}
          receiveInvoices={receivableInvoices}
          payableInvoices={payableInvoices}
          overdueInvoices={overdueInvoices}
          onViewInvoice={handleViewInvoice}
          onDownloadInvoice={handleDownloadInvoice}
          onMarkAsPaid={handleMarkAsPaid}
          onDeleteInvoice={handleDeleteInvoice}
          onTabChange={handleTabChange}
        />
      )}
    </div>
  );
};

export default Facturas;
