
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useToast } from '@/components/ui/use-toast';
import { FacturasHeader } from '@/components/facturas/FacturasHeader';
import { FacturasFilterBar } from '@/components/facturas/FacturasFilterBar';
import { InvoiceTabs } from '@/components/facturas/InvoiceTabs';
import { invoices as initialInvoices } from '@/data/invoices';
import type { Invoice } from '@/components/facturas/InvoiceTable';

const Facturas = () => {
  const { toast } = useToast();
  const [invoicesList, setInvoicesList] = useState<Invoice[]>(initialInvoices);
  const [activeTab, setActiveTab] = useState('all');

  const receiveInvoices = invoicesList.filter(inv => inv.type === 'receivable');
  const payableInvoices = invoicesList.filter(inv => inv.type === 'payable');
  const overdueInvoices = invoicesList.filter(inv => inv.status === 'overdue');

  const handleFilter = (searchQuery: string) => {
    // Filtrar facturas basado en la búsqueda
    if (!searchQuery.trim()) {
      setInvoicesList(initialInvoices);
      return;
    }

    const filtered = initialInvoices.filter(inv => 
      inv.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.amount.toString().includes(searchQuery)
    );
    
    setInvoicesList(filtered);
    
    toast({
      title: `Resultados de búsqueda`,
      description: `Se encontraron ${filtered.length} facturas que coinciden con "${searchQuery}"`,
    });
  };

  const handleResetFilter = () => {
    setInvoicesList(initialInvoices);
  };

  const handleMarkAsPaid = (invoiceId: string) => {
    // Actualizar el estado de la factura a "pagado"
    const updatedInvoices = invoicesList.map(inv => 
      inv.id === invoiceId ? { ...inv, status: 'paid' as const } : inv
    );
    
    setInvoicesList(updatedInvoices);
    
    toast({
      title: "Factura marcada como pagada",
      description: "La factura ha sido actualizada exitosamente.",
    });
  };

  const handleViewInvoice = (invoiceId: string) => {
    const invoice = invoicesList.find(inv => inv.id === invoiceId);
    
    toast({
      title: `Vista previa de factura: ${invoice?.number}`,
      description: `Cliente: ${invoice?.client}, Monto: $${invoice?.amount.toLocaleString('es-MX')}`,
    });
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    const invoice = invoicesList.find(inv => inv.id === invoiceId);
    
    toast({
      title: "Descargando factura",
      description: `Descargando factura ${invoice?.number} en formato PDF.`,
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

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <FacturasHeader />
        
        <FacturasFilterBar 
          onFilter={handleFilter}
          onResetFilter={handleResetFilter}
          onExport={handleExportInvoices}
        />
        
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
      </div>
    </MainLayout>
  );
};

export default Facturas;
