
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: 'Pagadas', value: 45 },
  { name: 'Pendientes', value: 30 },
  { name: 'Vencidas', value: 15 },
  { name: 'Canceladas', value: 10 },
];

const COLORS = ['#38A3A5', '#FFB302', '#EB5353', '#8B5CF6'];

export function InvoiceStatusPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Estado de Facturas</CardTitle>
      </CardHeader>
      <CardContent>
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
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value} facturas`, 'Cantidad']} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
