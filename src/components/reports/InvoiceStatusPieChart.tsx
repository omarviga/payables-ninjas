
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { FileWarning } from "lucide-react";

// Empty data array instead of example data
const data: { name: string; value: number; color: string }[] = [];

export function InvoiceStatusPieChart() {
  const hasData = data.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Estado de Facturas</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Porcentaje']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
            <FileWarning className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">No hay datos disponibles</h3>
            <p className="text-muted-foreground max-w-md">
              Registra facturas para visualizar su estado.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
