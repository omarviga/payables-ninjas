
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DateRange } from 'react-day-picker';
import { getAllInvoices } from "@/data/invoices";
import { useMemo } from "react";

interface TransactionsTableProps {
  filters: {
    dateRange: DateRange | undefined;
    type: string;
    status: string;
    minAmount: string;
    maxAmount: string;
  };
}

export function TransactionsTable({ filters }: TransactionsTableProps) {
  // Obtener todas las facturas y aplicar filtros
  const invoices = useMemo(() => {
    const allInvoices = getAllInvoices();
    
    return allInvoices.filter(invoice => {
      // Filtrar por tipo
      if (filters.type !== 'all' && invoice.type !== filters.type) {
        return false;
      }
      
      // Filtrar por estado
      if (filters.status !== 'all' && invoice.status !== filters.status) {
        return false;
      }
      
      // Filtrar por monto mínimo
      if (filters.minAmount && invoice.amount < parseFloat(filters.minAmount)) {
        return false;
      }
      
      // Filtrar por monto máximo
      if (filters.maxAmount && invoice.amount > parseFloat(filters.maxAmount)) {
        return false;
      }
      
      // Filtrar por rango de fechas
      if (filters.dateRange?.from && filters.dateRange?.to) {
        // Convertir la fecha de la factura (formato español DD/MM/YYYY) a objeto Date
        const parts = invoice.date.split('/');
        const invoiceDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
        
        // Verificar si está dentro del rango
        if (invoiceDate < filters.dateRange.from || invoiceDate > filters.dateRange.to) {
          return false;
        }
      }
      
      return true;
    });
  }, [filters]);

  // Función para formatear la fecha (DD/MM/YYYY a DD-MM-YYYY para mejor visualización)
  const formatDate = (dateStr: string) => {
    return dateStr.replace(/\//g, '-');
  };

  // Función para obtener el color de la insignia según el estado
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'pending': return 'warning';
      case 'overdue': return 'destructive';
      default: return 'secondary';
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
        {invoices.length > 0 ? (
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
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.number}</TableCell>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                  <TableCell className="text-right">${invoice.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={invoice.type === 'receivable' ? 'success' : 'default'}>
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
