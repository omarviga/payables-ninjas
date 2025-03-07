
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { CfdiType } from '@/services/invoiceProcessor';

interface InvoiceBadgeProps {
  cfdiType?: CfdiType;
  invoiceType?: "receivable" | "payable";
}

export function InvoiceBadge({ cfdiType, invoiceType }: InvoiceBadgeProps) {
  if (cfdiType) {
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
    
    return <Badge className={className}>{label}</Badge>;
  }
  
  if (invoiceType) {
    return (
      <Badge className={invoiceType === 'receivable' ? 'bg-success/20 text-success' : 'bg-blue-600/20 text-blue-600'}>
        {invoiceType === 'receivable' ? 'Por Cobrar' : 'Por Pagar'}
      </Badge>
    );
  }
  
  return null;
}
