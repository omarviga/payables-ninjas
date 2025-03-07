
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CfdiType } from '@/services/invoiceProcessor';
import type { Invoice } from '@/data/invoices';

interface ProcessedInvoicesProps {
  invoices: Invoice[];
  onNavigateToInvoices: () => void;
}

export function ProcessedInvoices({ invoices, onNavigateToInvoices }: ProcessedInvoicesProps) {
  if (invoices.length === 0) return null;
  
  const getCfdiTypeBadge = (cfdiType?: CfdiType) => {
    if (!cfdiType) return null;
    
    let label = 'Ingreso';
    let className = 'bg-payables-600/80 text-white text-xs';
    
    switch (cfdiType) {
      case CfdiType.PAGO:
        label = 'Pago';
        className = 'bg-blue-600/80 text-white text-xs';
        break;
      case CfdiType.EGRESO:
        label = 'Egreso';
        className = 'bg-purple-600/80 text-white text-xs';
        break;
      case CfdiType.TRASLADO:
        label = 'Traslado';
        className = 'bg-amber-600/80 text-white text-xs';
        break;
      case CfdiType.NOMINA:
        label = 'Nómina';
        className = 'bg-green-600/80 text-white text-xs';
        break;
      case CfdiType.DONATIVO:
        label = 'Donativo';
        className = 'bg-pink-600/80 text-white text-xs';
        break;
      case CfdiType.EXPORTACION:
        label = 'Exportación';
        className = 'bg-indigo-600/80 text-white text-xs';
        break;
    }
    
    return (
      <Badge className={className}>
        {label}
      </Badge>
    );
  };
  
  return (
    <div className="mt-6 border rounded-lg p-4">
      <h3 className="text-lg font-medium mb-3">Facturas procesadas</h3>
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <div key={invoice.id} className="p-3 bg-gray-50 rounded-md">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <h4 className="font-medium">{invoice.number}</h4>
                {getCfdiTypeBadge(invoice.cfdiType)}
              </div>
              <Badge className={invoice.type === 'receivable' ? 'bg-success/20 text-success' : 'bg-blue-600/20 text-blue-600'}>
                {invoice.type === 'receivable' ? 'Por Cobrar' : 'Por Pagar'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>
                <span className="text-muted-foreground">Cliente/Emisor:</span> {invoice.client}
              </div>
              <div>
                <span className="text-muted-foreground">Monto:</span> ${invoice.amount.toLocaleString('es-MX')}
              </div>
              <div>
                <span className="text-muted-foreground">Fecha:</span> {invoice.date}
              </div>
              <div>
                <span className="text-muted-foreground">Vencimiento:</span> {invoice.dueDate}
              </div>
              {invoice.uuid && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">UUID:</span> <span className="font-mono text-xs">{invoice.uuid}</span>
                </div>
              )}
              {invoice.relatedDocuments && invoice.relatedDocuments.length > 0 && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Docs. Relacionados:</span> <span className="font-mono text-xs">{invoice.relatedDocuments.length}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        <Button onClick={onNavigateToInvoices} className="bg-payables-600 hover:bg-payables-700">
          Ver todas las facturas
        </Button>
      </div>
    </div>
  );
}
