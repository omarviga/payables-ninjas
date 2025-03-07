
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

// Datos de ejemplo con valores
const data = [
  { name: 'Ene', ingresos: 120000, gastos: 85000, balance: 35000 },
  { name: 'Feb', ingresos: 145000, gastos: 90000, balance: 55000 },
  { name: 'Mar', ingresos: 135000, gastos: 95000, balance: 40000 },
  { name: 'Abr', ingresos: 158000, gastos: 103000, balance: 55000 },
  { name: 'May', ingresos: 162000, gastos: 108000, balance: 54000 },
  { name: 'Jun', ingresos: 175000, gastos: 112000, balance: 63000 },
  { name: 'Jul', ingresos: 182000, gastos: 118000, balance: 64000 },
  { name: 'Ago', ingresos: 190000, gastos: 120000, balance: 70000 },
  { name: 'Sep', ingresos: 188000, gastos: 123000, balance: 65000 },
  { name: 'Oct', ingresos: 195000, gastos: 125000, balance: 70000 },
  { name: 'Nov', ingresos: 205000, gastos: 130000, balance: 75000 },
  { name: 'Dic', ingresos: 220000, gastos: 135000, balance: 85000 }
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
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="ingresos" 
              stroke="#38A3A5" 
              activeDot={{ r: 8 }} 
              strokeWidth={2}
              name="Ingresos"
            />
            <Line 
              type="monotone" 
              dataKey="gastos" 
              stroke="#EB5353" 
              strokeWidth={2}
              name="Gastos"
            />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#8B5CF6" 
              strokeWidth={2}
              name="Balance"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
