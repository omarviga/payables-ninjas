
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
          <div key={invoice.id} className="p-3 bg-gray-50 rounded-md">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{invoice.number}</h4>
              <Badge className={invoice.type === 'receivable' ? 'bg-success/20 text-success' : 'bg-blue-600/20 text-blue-600'}>
                {invoice.type === 'receivable' ? 'Por Cobrar' : 'Por Pagar'}
              </Badge>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
              <div>
                <span className="text-muted-foreground">Cliente:</span> {invoice.client}
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
