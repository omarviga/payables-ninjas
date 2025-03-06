
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

const data = [
  { name: 'Empresa ABC', value: 35000 },
  { name: 'Corporación XYZ', value: 28000 },
  { name: 'Distribuidora Global', value: 22000 },
  { name: 'Servicios Integrales', value: 18000 },
  { name: 'Tecnología Avanzada', value: 12000 }
];

export function TopClientsBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Principales Clientes</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
