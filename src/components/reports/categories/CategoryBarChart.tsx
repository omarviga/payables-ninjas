
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

// Datos de ejemplo
const data = [
  { name: 'Ene', ingresos: 35000, gastos: 25000 },
  { name: 'Feb', ingresos: 42000, gastos: 28000 },
  { name: 'Mar', ingresos: 38000, gastos: 27000 },
  { name: 'Abr', ingresos: 44000, gastos: 30000 },
  { name: 'May', ingresos: 47000, gastos: 32000 },
  { name: 'Jun', ingresos: 50000, gastos: 35000 },
];

export function CategoryBarChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Comparativa por Meses</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
