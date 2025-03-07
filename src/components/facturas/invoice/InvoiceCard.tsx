
import React from 'react';
import { InvoiceBadge } from './InvoiceBadge';
import type { Invoice } from '@/data/invoices';

interface InvoiceCardProps {
  invoice: Invoice;
}

export function InvoiceCard({ invoice }: InvoiceCardProps) {
  // Asegurarnos de que tenemos una factura válida
  if (!invoice || !invoice.id) {
    console.error("Se intentó renderizar InvoiceCard con una factura inválida o undefined:", invoice);
    return null;
  }

  // Valores por defecto para evitar errores
  const {
    number = 'Sin número',
    client = 'Cliente desconocido',
    amount = 0,
    date = '',
    dueDate = '',
    type = 'receivable',
    cfdiType = undefined,
    uuid = '',
    relatedDocuments = []
  } = invoice;

  return (
    <div className="p-3 bg-gray-50 rounded-md" key={invoice.id}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h4 className="font-medium">{number}</h4>
          <InvoiceBadge cfdiType={cfdiType} />
        </div>
        <InvoiceBadge invoiceType={type} />
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
        <InfoField label="Cliente/Emisor" value={client} />
        <InfoField label="Monto" value={`$${amount.toLocaleString('es-MX')}`} />
        <InfoField label="Fecha" value={date} />
        <InfoField label="Vencimiento" value={dueDate} />
        
        {uuid && (
          <div className="col-span-2">
            <InfoField 
              label="UUID" 
              value={uuid} 
              className="font-mono text-xs"
            />
          </div>
        )}
        
        {relatedDocuments && relatedDocuments.length > 0 && (
          <div className="col-span-2">
            <InfoField 
              label="Docs. Relacionados" 
              value={String(relatedDocuments.length)} 
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
      <span className={className}>{value || '-'}</span>
    </div>
  );
}
