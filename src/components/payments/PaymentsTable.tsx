
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  ArrowUpRight, ArrowDownLeft,
  Eye, FileText, Trash2
} from 'lucide-react';

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
          {paymentList.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {payment.type === 'incoming' ? (
                    <ArrowDownLeft className="h-4 w-4 text-success" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-danger" />
                  )}
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
                  <Button variant="ghost" size="icon" title="Ver detalles">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {payment.invoiceId && (
                    <Button variant="ghost" size="icon" title="Ver factura relacionada">
                      <FileText className="h-4 w-4" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" title="Eliminar">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
