
import React from 'react';
import { Button } from "@/components/ui/button";
import { InvoiceCard } from './invoice/InvoiceCard';
import type { Invoice } from '@/data/invoices';

interface ProcessedInvoicesProps {
  invoices: Invoice[];
  onNavigateToInvoices: () => void;
}

export function ProcessedInvoices({ invoices, onNavigateToInvoices }: ProcessedInvoicesProps) {
  if (invoices.length === 0) return null;
  
  return (
    <div className="mt-6 border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-3">Facturas procesadas</h3>
      
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button 
          onClick={onNavigateToInvoices} 
          className="bg-payables-600 hover:bg-payables-700"
        >
          Ver todas las facturas
        </Button>
      </div>
    </div>
  );
}
