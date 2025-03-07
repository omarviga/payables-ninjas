
import { Button } from '@/components/ui/button';
import { Eye, FileText, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import type { Payment } from '@/data/payments';

interface PaymentActionsProps {
  payment: Payment;
}

export const PaymentActions = ({ payment }: PaymentActionsProps) => {
  const { toast } = useToast();

  const handleViewPayment = () => {
    toast({
      title: "Ver detalles del pago",
      description: `${payment.type === 'incoming' ? 'Cobro' : 'Pago'} de $${payment.amount.toLocaleString('es-MX')} a ${payment.recipient}`
    });
  };

  const handleViewInvoice = () => {
    toast({
      title: "Ver factura relacionada",
      description: `Mostrando factura asociada al ${payment.type === 'incoming' ? 'cobro' : 'pago'} de $${payment.amount.toLocaleString('es-MX')}`
    });
  };

  const handleDeletePayment = () => {
    toast({
      title: "Eliminar pago",
      description: `¿Estás seguro que deseas eliminar este ${payment.type === 'incoming' ? 'cobro' : 'pago'}?`,
      variant: "destructive"
    });
  };

  return (
    <div className="flex justify-end gap-1">
      <Button 
        variant="ghost" 
        size="icon" 
        title="Ver detalles"
        onClick={handleViewPayment}
      >
        <Eye className="h-4 w-4" />
      </Button>
      {payment.invoiceId && (
        <Button 
          variant="ghost" 
          size="icon" 
          title="Ver factura relacionada"
          onClick={handleViewInvoice}
        >
          <FileText className="h-4 w-4" />
        </Button>
      )}
      <Button 
        variant="ghost" 
        size="icon" 
        title="Eliminar"
        onClick={handleDeletePayment}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};
