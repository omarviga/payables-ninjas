
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

// Datos de ejemplo para el gráfico
const data = [
  { name: 'Cliente A', value: 120000 },
  { name: 'Cliente B', value: 85000 },
  { name: 'Cliente C', value: 72000 },
  { name: 'Cliente D', value: 63500 },
  { name: 'Cliente E', value: 42000 },
];

export function TopClientsBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Principales Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
          {data.length > 0 ? (
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
            <div>No hay datos disponibles</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
