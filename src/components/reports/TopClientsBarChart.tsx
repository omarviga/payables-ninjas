
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { FileWarning } from "lucide-react";

// Empty data array instead of example data
const data: { name: string; value: number }[] = [];

export function TopClientsBarChart() {
  const hasData = data.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Principales Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex items-center justify-center">
          {hasData ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100} 
                  tick={{ fontSize: 12 }}
                />
                <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Monto']} />
                <Bar dataKey="value" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <FileWarning className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-xl font-medium">No hay datos disponibles</h3>
              <p className="text-muted-foreground max-w-md">
                Registra clientes y transacciones para visualizar los principales clientes.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
