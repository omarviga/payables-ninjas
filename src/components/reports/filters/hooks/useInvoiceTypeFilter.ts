
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useInvoiceTypeFilter(
  onInvoiceTypeChange?: (type: string) => void
) {
  const { toast } = useToast();
  const [invoiceType, setInvoiceType] = useState('all');

  // Invoice type change handler
  const handleInvoiceTypeChange = (value: string) => {
    setInvoiceType(value);
    if (onInvoiceTypeChange) {
      onInvoiceTypeChange(value);
    }
  };

  // Reset to default
  const resetInvoiceType = () => {
    setInvoiceType('all');
    if (onInvoiceTypeChange) {
      onInvoiceTypeChange('all');
    }
  };

  // Helper function for descriptive text
  const getInvoiceTypeText = (typeValue: string): string => {
    switch (typeValue) {
      case 'all': return 'de todos los tipos';
      case 'receivable': return 'por cobrar';
      case 'payable': return 'por pagar';
      default: return typeValue;
    }
  };

  return {
    invoiceType,
    handleInvoiceTypeChange,
    resetInvoiceType,
    getInvoiceTypeText
  };
}
