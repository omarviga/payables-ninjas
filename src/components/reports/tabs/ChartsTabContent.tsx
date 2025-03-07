
import { FinancialMetricsChart } from '@/components/reports/FinancialMetricsChart';
import { InvoiceStatusPieChart } from '@/components/reports/InvoiceStatusPieChart';
import { TopClientsBarChart } from '@/components/reports/TopClientsBarChart';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ChartsTabContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FinancialMetricsChart />
      <InvoiceStatusPieChart />
      <TopClientsBarChart />
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Flujo de Efectivo Proyectado</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center bg-muted/50 text-muted-foreground">
          Gráfico de proyección de flujo de efectivo próximamente
        </CardContent>
      </Card>
    </div>
  );
}
