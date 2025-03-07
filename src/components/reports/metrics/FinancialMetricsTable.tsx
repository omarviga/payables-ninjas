
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowDownUp, ArrowUp, ArrowDown } from "lucide-react";

// Datos de ejemplo
const metrics = [
  { name: "Ingresos", current: 220000, previous: 205000, change: 7.3 },
  { name: "Gastos", current: 135000, previous: 130000, change: 3.8 },
  { name: "Utilidad", current: 85000, previous: 75000, change: 13.3 },
  { name: "Margen de ganancia", current: 38.6, previous: 36.6, change: 5.5 },
  { name: "Flujo de efectivo", current: 90000, previous: 80000, change: 12.5 },
];

export function FinancialMetricsTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tabla de Métricas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Métrica</TableHead>
              <TableHead className="text-right">Actual</TableHead>
              <TableHead className="text-right">Anterior</TableHead>
              <TableHead className="text-right">Cambio</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((metric) => (
              <TableRow key={metric.name}>
                <TableCell className="font-medium">{metric.name}</TableCell>
                <TableCell className="text-right">
                  {metric.name.includes("Margen") 
                    ? `${metric.current.toFixed(1)}%` 
                    : `$${metric.current.toLocaleString()}`}
                </TableCell>
                <TableCell className="text-right">
                  {metric.name.includes("Margen") 
                    ? `${metric.previous.toFixed(1)}%` 
                    : `$${metric.previous.toLocaleString()}`}
                </TableCell>
                <TableCell className="text-right flex items-center justify-end">
                  <span className={metric.change > 0 ? "text-success flex items-center" : "text-danger flex items-center"}>
                    {metric.change > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    {metric.change.toFixed(1)}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
