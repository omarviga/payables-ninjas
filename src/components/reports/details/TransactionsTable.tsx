
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DateRange } from 'react-day-picker';
import type { Invoice } from "@/data/invoices";
import { useMemo } from "react";

interface TransactionsTableProps {
  invoices: Invoice[];
  filters?: {
    dateRange?: DateRange;
    type?: string;
    status?: string;
    minAmount?: string;
    maxAmount?: string;
  };
}

export function TransactionsTable({ invoices, filters = {} }: TransactionsTableProps) {
  // Apply any additional filters that might be specific to this component
  const filteredInvoices = useMemo(() => {
    return invoices.filter(invoice => {
      // Additional filters that might be applied within the transactions component
      if (filters.status && filters.status !== 'all' && invoice.status !== filters.status) {
        return false;
      }
      
      if (filters.minAmount && invoice.amount < parseFloat(filters.minAmount)) {
        return false;
      }
      
      if (filters.maxAmount && invoice.amount > parseFloat(filters.maxAmount)) {
        return false;
      }
      
      return true;
    });
  }, [invoices, filters]);

  // Función para formatear la fecha (DD/MM/YYYY a DD-MM-YYYY para mejor visualización)
  const formatDate = (dateStr: string) => {
    return dateStr.replace(/\//g, '-');
  };

  // Función para obtener el color de la insignia según el estado
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'default';
      case 'pending': return 'secondary';
      case 'overdue': return 'destructive';
      default: return 'outline';
    }
  };

  // Función para obtener el texto del estado en español
  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Pagado';
      case 'pending': return 'Pendiente';
      case 'overdue': return 'Vencido';
      default: return status;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detalles de Transacciones</CardTitle>
      </CardHeader>
      <CardContent>
        {filteredInvoices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.type === 'receivable' ? 'default' : 'outline'}>
                      {invoice.type === 'receivable' ? 'Por cobrar' : 'Por pagar'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getBadgeVariant(invoice.status)}>
                      {getStatusText(invoice.status)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No se encontraron transacciones que coincidan con los filtros aplicados
          </div>
        )}
      </CardContent>
    </Card>
  );
}
