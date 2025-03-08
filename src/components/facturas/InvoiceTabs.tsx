
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, FileCog, FileX } from 'lucide-react';
import { InvoiceTable } from './InvoiceTable';
import type { Invoice } from '@/data/invoices';

interface InvoiceTabsProps {
  allInvoices: Invoice[];
  receiveInvoices: Invoice[];
  payableInvoices: Invoice[];
  overdueInvoices: Invoice[];
  onViewInvoice: (id: string) => void;
  onDownloadInvoice: (id: string) => void;
  onMarkAsPaid: (id: string) => void;
  onDeleteInvoice: (id: string) => void;
  onTabChange?: (value: string) => void;
}

export const InvoiceTabs = ({
  allInvoices,
  receiveInvoices,
  payableInvoices,
  overdueInvoices,
  onViewInvoice,
  onDownloadInvoice,
  onMarkAsPaid,
  onDeleteInvoice,
  onTabChange
}: InvoiceTabsProps) => {
  const [activeTab, setActiveTab] = useState('all');
  
  // Validar que los arrays estén definidos y crear copias seguras
  const safeAllInvoices = Array.isArray(allInvoices) ? allInvoices : [];
  const safeReceiveInvoices = Array.isArray(receiveInvoices) ? receiveInvoices : [];
  const safePayableInvoices = Array.isArray(payableInvoices) ? payableInvoices : [];
  const safeOverdueInvoices = Array.isArray(overdueInvoices) ? overdueInvoices : [];
  
  // Garantizar que el componente responda a actualizaciones de datos
  useEffect(() => {
    console.log("Actualizando datos de facturas:", {
      all: safeAllInvoices.length,
      receivable: safeReceiveInvoices.length,
      payable: safePayableInvoices.length,
      overdue: safeOverdueInvoices.length
    });
  }, [safeAllInvoices, safeReceiveInvoices, safePayableInvoices, safeOverdueInvoices]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (onTabChange) onTabChange(value);
  };

  return (
    <Tabs 
      defaultValue="all" 
      className="w-full"
      value={activeTab}
      onValueChange={handleTabChange}
    >
      <TabsList className="grid grid-cols-4 mb-4 w-full sm:w-auto">
        <TabsTrigger value="all" className="flex gap-2 items-center">
          <FileText className="h-4 w-4" />
          <span className="hidden sm:inline">Todas</span>
          <Badge variant="outline" className="ml-auto">{safeAllInvoices.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="receivable" className="flex gap-2 items-center">
          <FileCog className="h-4 w-4" />
          <span className="hidden sm:inline">Por Cobrar</span>
          <Badge variant="outline" className="ml-auto">{safeReceiveInvoices.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="payable" className="flex gap-2 items-center">
          <FileCog className="h-4 w-4" />
          <span className="hidden sm:inline">Por Pagar</span>
          <Badge variant="outline" className="ml-auto">{safePayableInvoices.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="overdue" className="flex gap-2 items-center">
          <FileX className="h-4 w-4" />
          <span className="hidden sm:inline">Vencidas</span>
          <Badge variant="outline" className="ml-auto">{safeOverdueInvoices.length}</Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <InvoiceTable 
          invoices={safeAllInvoices} 
          onViewInvoice={onViewInvoice} 
          onDownloadInvoice={onDownloadInvoice} 
          onMarkAsPaid={onMarkAsPaid} 
          onDeleteInvoice={onDeleteInvoice}
        />
      </TabsContent>
      
      <TabsContent value="receivable" className="mt-0">
        <InvoiceTable 
          invoices={safeReceiveInvoices} 
          onViewInvoice={onViewInvoice} 
          onDownloadInvoice={onDownloadInvoice} 
          onMarkAsPaid={onMarkAsPaid}
          onDeleteInvoice={onDeleteInvoice}
        />
      </TabsContent>
      
      <TabsContent value="payable" className="mt-0">
        <InvoiceTable 
          invoices={safePayableInvoices} 
          onViewInvoice={onViewInvoice} 
          onDownloadInvoice={onDownloadInvoice} 
          onMarkAsPaid={onMarkAsPaid}
          onDeleteInvoice={onDeleteInvoice}
        />
      </TabsContent>
      
      <TabsContent value="overdue" className="mt-0">
        <InvoiceTable 
          invoices={safeOverdueInvoices} 
          onViewInvoice={onViewInvoice} 
          onDownloadInvoice={onDownloadInvoice} 
          onMarkAsPaid={onMarkAsPaid}
          onDeleteInvoice={onDeleteInvoice}
        />
      </TabsContent>
    </Tabs>
  );
};
