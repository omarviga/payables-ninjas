
import React from 'react';
import { Button } from "@/components/ui/button";
import { InvoiceCard } from './invoice/InvoiceCard';
import type { Invoice } from '@/data/invoices';

interface ProcessedInvoicesProps {
  invoices: Invoice[];
  onNavigateToInvoices: () => void;
}

export function ProcessedInvoices({ invoices, onNavigateToInvoices }: ProcessedInvoicesProps) {
  // Solo renderiza si hay facturas procesadas
  if (!invoices || invoices.length === 0) {
    console.log("No hay facturas procesadas para mostrar");
    return null;
  }
  
  console.log(`Mostrando ${invoices.length} facturas procesadas`, invoices);
  
  return (
    <div className="mt-6 border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-3">Facturas procesadas</h3>
      
      <div className="space-y-3">
        {invoices.map((invoice) => (
          invoice && invoice.id ? (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ) : null
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
