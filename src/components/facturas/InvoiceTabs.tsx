
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { FileText, FileCog, FileX } from 'lucide-react';
import { InvoiceTable, Invoice } from './InvoiceTable';

interface InvoiceTabsProps {
  allInvoices: Invoice[];
  receiveInvoices: Invoice[];
  payableInvoices: Invoice[];
  overdueInvoices: Invoice[];
  onViewInvoice: (id: string) => void;
  onDownloadInvoice: (id: string) => void;
  onMarkAsPaid: (id: string) => void;
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
  onTabChange
}: InvoiceTabsProps) => {
  const [activeTab, setActiveTab] = useState('all');
  
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
          <Badge variant="outline" className="ml-auto">{allInvoices.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="receivable" className="flex gap-2 items-center">
          <FileCog className="h-4 w-4" />
          <span className="hidden sm:inline">Por Cobrar</span>
          <Badge variant="outline" className="ml-auto">{receiveInvoices.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="payable" className="flex gap-2 items-center">
          <FileCog className="h-4 w-4" />
          <span className="hidden sm:inline">Por Pagar</span>
          <Badge variant="outline" className="ml-auto">{payableInvoices.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="overdue" className="flex gap-2 items-center">
          <FileX className="h-4 w-4" />
          <span className="hidden sm:inline">Vencidas</span>
          <Badge variant="outline" className="ml-auto">
            {overdueInvoices.length}
          </Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <InvoiceTable 
          invoices={allInvoices} 
          onViewInvoice={onViewInvoice} 
          onDownloadInvoice={onDownloadInvoice} 
          onMarkAsPaid={onMarkAsPaid} 
        />
      </TabsContent>
      
      <TabsContent value="receivable" className="mt-0">
        <InvoiceTable 
          invoices={receiveInvoices} 
          onViewInvoice={onViewInvoice} 
          onDownloadInvoice={onDownloadInvoice} 
          onMarkAsPaid={onMarkAsPaid} 
        />
      </TabsContent>
      
      <TabsContent value="payable" className="mt-0">
        <InvoiceTable 
          invoices={payableInvoices} 
          onViewInvoice={onViewInvoice} 
          onDownloadInvoice={onDownloadInvoice} 
          onMarkAsPaid={onMarkAsPaid} 
        />
      </TabsContent>
      
      <TabsContent value="overdue" className="mt-0">
        <InvoiceTable 
          invoices={overdueInvoices} 
          onViewInvoice={onViewInvoice} 
          onDownloadInvoice={onDownloadInvoice} 
          onMarkAsPaid={onMarkAsPaid} 
        />
      </TabsContent>
    </Tabs>
  );
};
