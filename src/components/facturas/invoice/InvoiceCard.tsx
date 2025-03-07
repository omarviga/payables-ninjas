
import React from 'react';
import { InvoiceBadge } from './InvoiceBadge';
import { Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
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
    relatedDocuments = [],
    fileUrl = null
  } = invoice;

  const handleDownload = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    }
  };

  return (
    <div className="p-3 bg-gray-50 rounded-md" key={invoice.id}>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <h4 className="font-medium">{number}</h4>
          <InvoiceBadge cfdiType={cfdiType} />
        </div>
        <div className="flex items-center gap-2">
          <InvoiceBadge invoiceType={type} />
          {fileUrl && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleDownload}
              title="Descargar XML"
              className="h-7 w-7 p-0"
            >
              <Download className="h-4 w-4 text-payables-600" />
            </Button>
          )}
        </div>
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
