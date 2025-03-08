
import { useCallback } from 'react';
import { updateInvoiceStatus, removeInvoice } from '@/data/invoices';
import type { InvoiceStatusResult } from './types';

export const useInvoiceActions = (
  setAllInvoices: React.Dispatch<React.SetStateAction<import('@/data/invoices').Invoice[]>>
) => {
  // Function to update invoice status
  const markInvoiceAsPaid = useCallback(async (invoiceId: string): Promise<InvoiceStatusResult> => {
    try {
      const success = await updateInvoiceStatus(invoiceId, 'paid');
      
      if (success) {
        // Update the local list
        setAllInvoices(prev => 
          prev.map(inv => inv?.id === invoiceId ? { ...inv, status: 'paid' as const } : inv)
        );
        return { success: true };
      } else {
        return { success: false, error: "No se pudo marcar la factura como pagada" };
      }
    } catch (error) {
      console.error("Error al marcar factura como pagada:", error);
      return { success: false, error: "Ocurrió un error al intentar actualizar la factura" };
    }
  }, [setAllInvoices]);
  
  // Function to delete an invoice
  const deleteInvoice = useCallback(async (invoiceId: string): Promise<InvoiceStatusResult> => {
    try {
      const success = await removeInvoice(invoiceId);
      
      if (success) {
        // Update the local list
        setAllInvoices(prev => prev.filter(inv => inv?.id !== invoiceId));
        return { success: true };
      } else {
        return { success: false, error: "No se pudo eliminar la factura" };
      }
    } catch (error) {
      console.error("Error al eliminar factura:", error);
      return { success: false, error: "Ocurrió un error al intentar eliminar la factura" };
    }
  }, [setAllInvoices]);

  return {
    markInvoiceAsPaid,
    deleteInvoice
  };
};
