
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Datos de ejemplo
const data = [
  { name: 'Pagadas', value: 68, color: '#10B981' },
  { name: 'Pendientes', value: 25, color: '#F59E0B' },
  { name: 'Vencidas', value: 7, color: '#EF4444' },
];

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
      </CardContent>
    </Card>
  );
}
