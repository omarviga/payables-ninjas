
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, CheckCheck } from 'lucide-react';
import { Transaction, statusColors, statusMap, typeMap } from '@/data/conciliacion';

interface TransactionsTableProps {
  transactions: Transaction[];
}

export const TransactionsTable = React.memo(({ transactions }: TransactionsTableProps) => {
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Fecha</TableHead>
            <TableHead>Referencia</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Cuenta</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((tx) => {
            const StatusIcon = statusMap[tx.status].icon;
            const TypeIcon = typeMap[tx.type].icon;
            
            return (
              <TableRow key={tx.id}>
                <TableCell>{tx.date}</TableCell>
                <TableCell className="font-medium">{tx.reference}</TableCell>
                <TableCell>{tx.description}</TableCell>
                <TableCell>{tx.accountName}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TypeIcon className={`h-4 w-4 ${typeMap[tx.type].className}`} />
                    <span>{typeMap[tx.type].text}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  ${tx.amount.toLocaleString('es-MX')}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[tx.status]}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {statusMap[tx.status].text}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="icon" title="Ver detalles">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {tx.status !== 'matched' && (
                      <Button variant="ghost" size="icon" title="Conciliar manualmente">
                        <CheckCheck className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
});

TransactionsTable.displayName = 'TransactionsTable';
