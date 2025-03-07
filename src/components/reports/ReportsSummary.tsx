
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet, FileText } from "lucide-react";

export function ReportsSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
          <TrendingUp className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1,850,000.00</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-success">+8.2%</span> respecto al mes anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Gastos Totales</CardTitle>
          <TrendingDown className="h-4 w-4 text-danger" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1,250,000.00</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-danger">+4.1%</span> respecto al mes anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <Wallet className="h-4 w-4 text-payables-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$600,000.00</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-success">+12.5%</span> en el periodo actual
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Facturas Totales</CardTitle>
          <FileText className="h-4 w-4 text-payables-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">142</div>
          <p className="text-xs text-muted-foreground">
            98 por cobrar, 44 por pagar
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
