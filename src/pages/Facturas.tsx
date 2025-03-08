
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FacturasHeader } from '@/components/facturas/FacturasHeader';
import { FacturasFilterBar } from '@/components/facturas/FacturasFilterBar';
import { InvoiceTabs } from '@/components/facturas/InvoiceTabs';
import type { Invoice } from '@/data/invoices';
import { FileText } from 'lucide-react';
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
    filterInvoices
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

  return (
    <div className="flex flex-col gap-6">
      <FacturasHeader onUploadClick={handleUploadFacturas} />
      
      <FacturasFilterBar 
        onFilter={handleFilter}
        onResetFilter={handleResetFilter}
        onExport={handleExportInvoices}
      />
      
      {isLoading ? (
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
      ) : allInvoices.length === 0 ? (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No hay facturas disponibles</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Utiliza el botón "Cargar Facturas" para subir tus primeros CFDIs o configura la conexión con el SAT.
          </p>
        </div>
      ) : (
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
