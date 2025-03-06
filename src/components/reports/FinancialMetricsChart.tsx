
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

const data = [
  { name: 'Ene', ingresos: 4000, gastos: 2400, balance: 1600 },
  { name: 'Feb', ingresos: 3000, gastos: 1398, balance: 1602 },
  { name: 'Mar', ingresos: 2000, gastos: 1800, balance: 200 },
  { name: 'Abr', ingresos: 2780, gastos: 3908, balance: -1128 },
  { name: 'May', ingresos: 1890, gastos: 4800, balance: -2910 },
  { name: 'Jun', ingresos: 2390, gastos: 3800, balance: -1410 },
  { name: 'Jul', ingresos: 3490, gastos: 4300, balance: -810 },
  { name: 'Ago', ingresos: 4000, gastos: 2400, balance: 1600 },
  { name: 'Sep', ingresos: 3000, gastos: 1398, balance: 1602 },
  { name: 'Oct', ingresos: 2000, gastos: 1800, balance: 200 },
  { name: 'Nov', ingresos: 2780, gastos: 1908, balance: 872 },
  { name: 'Dic', ingresos: 1890, gastos: 800, balance: 1090 }
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
