
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, ArrowDownLeft,
  Eye, FileText, Trash2
} from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export type Payment = {
  id: string;
  date: string;
  type: 'incoming' | 'outgoing';
  recipient: string;
  concept: string;
  amount: number;
  method: string;
  status: 'completed' | 'pending' | 'failed';
  invoiceId: string | null;
};

const statusColors: Record<string, string> = {
  completed: "bg-success/20 text-success hover:bg-success/30",
  pending: "bg-warning/20 text-warning hover:bg-warning/30",
  failed: "bg-danger/20 text-danger hover:bg-danger/30",
};

const statusMap: Record<string, string> = {
  completed: "Completado",
  pending: "Pendiente",
  failed: "Fallido",
};

interface PaymentsTableProps {
  paymentList: Payment[];
}

export const PaymentsTable = ({ paymentList }: PaymentsTableProps) => {
  const { toast } = useToast();

  const handleViewPayment = (payment: Payment) => {
    toast({
      title: "Ver detalles del pago",
      description: `${payment.type === 'incoming' ? 'Cobro' : 'Pago'} de $${payment.amount.toLocaleString('es-MX')} a ${payment.recipient}`
    });
  };

  const handleViewInvoice = (payment: Payment) => {
    toast({
      title: "Ver factura relacionada",
      description: `Mostrando factura asociada al ${payment.type === 'incoming' ? 'cobro' : 'pago'} de $${payment.amount.toLocaleString('es-MX')}`
    });
  };

  const handleDeletePayment = (payment: Payment) => {
    toast({
      title: "Eliminar pago",
      description: `¿Estás seguro que deseas eliminar este ${payment.type === 'incoming' ? 'cobro' : 'pago'}?`,
      variant: "destructive"
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Cliente/Proveedor</TableHead>
            <TableHead>Concepto</TableHead>
            <TableHead>Método</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paymentList.map((payment) => {
            const TypeIcon = payment.type === 'incoming' ? ArrowDownLeft : ArrowUpRight;
            
            return (
              <TableRow key={payment.id}>
                <TableCell>{payment.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TypeIcon className={`h-4 w-4 ${payment.type === 'incoming' ? 'text-success' : 'text-danger'}`} />
                    <span>{payment.type === 'incoming' ? 'Ingreso' : 'Egreso'}</span>
                  </div>
                </TableCell>
                <TableCell>{payment.recipient}</TableCell>
                <TableCell>{payment.concept}</TableCell>
                <TableCell>{payment.method}</TableCell>
                <TableCell className="text-right font-medium">
                  ${payment.amount.toLocaleString('es-MX')}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[payment.status]}>
                    {statusMap[payment.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Ver detalles"
                      onClick={() => handleViewPayment(payment)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {payment.invoiceId && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Ver factura relacionada"
                        onClick={() => handleViewInvoice(payment)}
                      >
                        <FileText className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Eliminar"
                      onClick={() => handleDeletePayment(payment)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
