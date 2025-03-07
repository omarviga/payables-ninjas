
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PaymentsTableContent } from './PaymentsTableContent';
import type { Payment } from '@/data/payments';

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
        <PaymentsTableContent paymentList={paymentList} />
      </Table>
    </div>
  );
};

export type { Payment };
