
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ReportsSummaryProps {
  totalInvoices: number;
  totalAmount: number;
  paidInvoices: number;
  paidAmount: number;
  pendingInvoices: number;
  pendingAmount: number;
  overdueInvoices: number;
  overdueAmount: number;
}

export function ReportsSummary({
  totalInvoices,
  totalAmount,
  paidInvoices,
  paidAmount,
  pendingInvoices,
  pendingAmount,
  overdueInvoices,
  overdueAmount
}: ReportsSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total de Facturas</CardTitle>
          <CardDescription className="text-2xl font-bold">{totalInvoices}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Monto total: ${totalAmount.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pagadas</CardTitle>
          <CardDescription className="text-2xl font-bold text-green-500">{paidInvoices}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Monto pagado: ${paidAmount.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
          <CardDescription className="text-2xl font-bold text-amber-500">{pendingInvoices}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Monto pendiente: ${pendingAmount.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Vencidas</CardTitle>
          <CardDescription className="text-2xl font-bold text-red-500">{overdueInvoices}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Monto vencido: ${overdueAmount.toLocaleString()}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
