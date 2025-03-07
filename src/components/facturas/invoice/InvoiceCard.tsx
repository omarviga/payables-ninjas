
import React from 'react';
import { InvoiceBadge } from './InvoiceBadge';
import type { Invoice } from '@/data/invoices';

interface InvoiceCardProps {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  // Asegurarnos de que tenemos una factura válida
  if (!invoice) {
    console.error("Se intentó renderizar InvoiceCard con una factura inválida o undefined");
    return null;
  }

  return (
    <div className="p-3 bg-gray-50 rounded-md" key={invoice.id}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h4 className="font-medium">{invoice.number}</h4>
          <InvoiceBadge cfdiType={invoice.cfdiType} />
        </div>
        <InvoiceBadge invoiceType={invoice.type} />
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
        <InfoField label="Cliente/Emisor" value={invoice.client} />
        <InfoField label="Monto" value={`$${invoice.amount.toLocaleString('es-MX')}`} />
        <InfoField label="Fecha" value={invoice.date} />
        <InfoField label="Vencimiento" value={invoice.dueDate} />
        
        {invoice.uuid && (
          <div className="col-span-2">
            <InfoField 
              label="UUID" 
              value={invoice.uuid} 
              className="font-mono text-xs"
            />
          </div>
        )}
        
        {invoice.relatedDocuments && invoice.relatedDocuments.length > 0 && (
          <div className="col-span-2">
            <InfoField 
              label="Docs. Relacionados" 
              value={String(invoice.relatedDocuments.length)} 
              className="font-mono text-xs"
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface InfoFieldProps {
  label: string;
  value: string;
  className?: string;
}

function InfoField({ label, value, className }: InfoFieldProps) {
  return (
    <div>
      <span className="text-muted-foreground">{label}:</span>{' '}
      <span className={className}>{value}</span>
    </div>
  );
}
