
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { PaymentTypeIndicator } from './PaymentTypeIndicator';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { PaymentActions } from './PaymentActions';
import type { Payment } from '@/data/payments';

interface PaymentsTableContentProps {
  paymentList: Payment[];
}

export const PaymentsTableContent = ({ paymentList }: PaymentsTableContentProps) => {
  return (
    <TableBody>
      {paymentList.map((payment) => (
        <TableRow key={payment.id}>
          <TableCell>{payment.date}</TableCell>
          <TableCell>
            <PaymentTypeIndicator type={payment.type} />
          </TableCell>
          <TableCell>{payment.recipient}</TableCell>
          <TableCell>{payment.concept}</TableCell>
          <TableCell>{payment.method}</TableCell>
          <TableCell className="text-right font-medium">
            ${payment.amount.toLocaleString('es-MX')}
          </TableCell>
          <TableCell>
            <PaymentStatusBadge status={payment.status} />
          </TableCell>
          <TableCell className="text-right">
            <PaymentActions payment={payment} />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
