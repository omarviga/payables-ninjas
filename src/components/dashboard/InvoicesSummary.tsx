
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeIcon, FileText } from "lucide-react";

type InvoiceStatus = "paid" | "pending" | "overdue";

interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  date: string;
  dueDate: string;
  status: InvoiceStatus;
}

const statusColors: Record<InvoiceStatus, string> = {
  paid: "bg-success/20 text-success hover:bg-success/30",
  pending: "bg-warning/20 text-warning hover:bg-warning/30",
  overdue: "bg-danger/20 text-danger hover:bg-danger/30",
};

interface InvoicesSummaryProps {
  receivable: Invoice[];
  payable: Invoice[];
}

export function InvoicesSummary({ receivable, payable }: InvoicesSummaryProps) {
  const renderInvoiceTable = (invoices: Invoice[]) => (
    <div className="table-container">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Factura</TableHead>
            <TableHead>Cliente/Proveedor</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Fecha Vencimiento</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.number}</TableCell>
              <TableCell>{invoice.client}</TableCell>
              <TableCell className="text-right">
                ${invoice.amount.toLocaleString('es-MX')}
              </TableCell>
              <TableCell>{invoice.dueDate}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusColors[invoice.status]}>
                  {invoice.status === "paid" ? "Pagado" : 
                   invoice.status === "pending" ? "Pendiente" : "Vencido"}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <EyeIcon className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5" />
          <span>Resumen de Facturas</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="receivable">
          <TabsList className="mb-4">
            <TabsTrigger value="receivable">Por Cobrar</TabsTrigger>
            <TabsTrigger value="payable">Por Pagar</TabsTrigger>
          </TabsList>
          <TabsContent value="receivable">
            {renderInvoiceTable(receivable)}
          </TabsContent>
          <TabsContent value="payable">
            {renderInvoiceTable(payable)}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
