
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Eye, Download, Check, Trash2 } from 'lucide-react';
import { CfdiType } from '@/services/types/cfdiTypes';
import type { Invoice } from '@/data/invoices';

const statusColors: Record<string, string> = {
  paid: "bg-success/20 text-success hover:bg-success/30",
  pending: "bg-warning/20 text-warning hover:bg-warning/30",
  overdue: "bg-danger/20 text-danger hover:bg-danger/30",
};

const statusMap: Record<string, string> = {
  paid: "Pagado",
  pending: "Pendiente",
  overdue: "Vencido",
};

const cfdiTypeColors: Record<string, string> = {
  [CfdiType.INGRESO]: "bg-payables-600/20 text-payables-600",
  [CfdiType.EGRESO]: "bg-purple-600/20 text-purple-600",
  [CfdiType.PAGO]: "bg-blue-600/20 text-blue-600",
  [CfdiType.TRASLADO]: "bg-amber-600/20 text-amber-600",
  [CfdiType.NOMINA]: "bg-green-600/20 text-green-600",
  [CfdiType.DONATIVO]: "bg-pink-600/20 text-pink-600",
  [CfdiType.EXPORTACION]: "bg-indigo-600/20 text-indigo-600",
};

const cfdiTypeMap: Record<string, string> = {
  [CfdiType.INGRESO]: "Ingreso",
  [CfdiType.EGRESO]: "Egreso",
  [CfdiType.PAGO]: "Pago",
  [CfdiType.TRASLADO]: "Traslado",
  [CfdiType.NOMINA]: "Nómina",
  [CfdiType.DONATIVO]: "Donativo",
  [CfdiType.EXPORTACION]: "Exportación",
};

interface InvoiceTableProps {
  invoices: Invoice[];
  onViewInvoice: (id: string) => void;
  onDownloadInvoice: (id: string) => void;
  onMarkAsPaid: (id: string) => void;
  onDeleteInvoice: (id: string) => void;
}

export const InvoiceTable = ({ 
  invoices, 
  onViewInvoice, 
  onDownloadInvoice, 
  onMarkAsPaid,
  onDeleteInvoice
}: InvoiceTableProps) => {
  // Asegurarnos de que invoices es un array
  const safeInvoices = Array.isArray(invoices) ? invoices : [];
  
  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Factura</TableHead>
            <TableHead>Cliente/Proveedor</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Fecha Emisión</TableHead>
            <TableHead>Fecha Vencimiento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Tipo CFDI</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeInvoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                No hay facturas disponibles
              </TableCell>
            </TableRow>
          ) : (
            safeInvoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">
                  {invoice.number}
                  {invoice.uuid && (
                    <div className="text-xs text-muted-foreground font-mono truncate max-w-[120px]" title={invoice.uuid}>
                      {invoice.uuid.substring(0, 8)}...
                    </div>
                  )}
                </TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell className="text-right">
                  ${invoice.amount.toLocaleString('es-MX')}
                </TableCell>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[invoice.status]}>
                    {statusMap[invoice.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {invoice.cfdiType && (
                    <Badge variant="outline" className={cfdiTypeColors[invoice.cfdiType]}>
                      {cfdiTypeMap[invoice.cfdiType]}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Ver factura"
                      onClick={() => onViewInvoice(invoice.id)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Descargar factura"
                      onClick={() => onDownloadInvoice(invoice.id)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                    {invoice.status === 'pending' && (
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-success" 
                        title="Marcar como pagada"
                        onClick={() => onMarkAsPaid(invoice.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-danger" 
                      title="Eliminar factura"
                      onClick={() => onDeleteInvoice(invoice.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
