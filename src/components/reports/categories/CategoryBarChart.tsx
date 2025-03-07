
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { FileWarning } from "lucide-react";

// Empty data array instead of example data
const data: { name: string; ingresos: number; gastos: number }[] = [];

export function CategoryBarChart() {
  const hasData = data.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Comparativa por Meses</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Legend />
              <Bar name="Ingresos" dataKey="ingresos" fill="#8B5CF6" />
              <Bar name="Gastos" dataKey="gastos" fill="#F59E0B" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
            <FileWarning className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">No hay datos disponibles</h3>
            <p className="text-muted-foreground max-w-md">
              Registra transacciones para visualizar la comparativa por meses.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
