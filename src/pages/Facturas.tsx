import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { FacturasHeader } from '@/components/facturas/FacturasHeader';
import { FacturasFilterBar } from '@/components/facturas/FacturasFilterBar';
import { InvoiceTabs } from '@/components/facturas/InvoiceTabs';
import { getAllInvoices } from '@/data/invoices';
import type { Invoice } from '@/components/facturas/InvoiceTable';
import { FileText } from 'lucide-react';

const Facturas = () => {
  const { toast } = useToast();
  const [invoicesList, setInvoicesList] = useState<Invoice[]>([]);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const invoices = getAllInvoices();
    setInvoicesList(invoices);
  }, []);

  const receiveInvoices = invoicesList.filter(inv => inv.type === 'receivable');
  const payableInvoices = invoicesList.filter(inv => inv.type === 'payable');
  const overdueInvoices = invoicesList.filter(inv => inv.status === 'overdue');

  const handleFilter = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setInvoicesList(getAllInvoices());
      return;
    }

    const allInvoices = getAllInvoices();
    const filtered = allInvoices.filter(inv => 
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
    setInvoicesList(getAllInvoices());
  };

  const handleMarkAsPaid = (invoiceId: string) => {
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
      
      {invoicesList.length === 0 && (
        <div className="text-center py-12 border rounded-lg bg-gray-50">
          <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No hay facturas disponibles</h3>
          <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
            Utiliza el botón "Cargar Facturas" para subir tus primeros CFDIs o configura la conexión con el SAT.
          </p>
        </div>
      )}
    </div>
  );
};

export default Facturas;
