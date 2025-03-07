
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Empty data with zero values
const data = [
  { name: 'Ene', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Feb', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Mar', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Abr', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'May', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Jun', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Jul', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Ago', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Sep', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Oct', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Nov', ingresos: 0, gastos: 0, balance: 0 },
  { name: 'Dic', ingresos: 0, gastos: 0, balance: 0 }
];

export function FinancialMetricsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Evolución Financiera</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="ingresos" 
              stroke="#38A3A5" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="gastos" 
              stroke="#EB5353" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#8B5CF6" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
