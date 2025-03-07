
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUp, ArrowDown, FileWarning } from "lucide-react";

// Empty metrics array instead of example data
const metrics: {
  name: string;
  current: number;
  previous: number;
  change: number;
}[] = [];

export function FinancialMetricsTable() {
  const hasData = metrics.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tabla de Métricas</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] text-center space-y-4">
            <FileWarning className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">No hay datos disponibles</h3>
            <p className="text-muted-foreground max-w-md">
              Registra transacciones para visualizar las métricas financieras.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
