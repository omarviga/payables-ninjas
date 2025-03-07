
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Datos de ejemplo
const data = [
  { name: 'Servicios', value: 35, color: '#8B5CF6' },
  { name: 'Materiales', value: 25, color: '#10B981' },
  { name: 'Salarios', value: 20, color: '#F59E0B' },
  { name: 'Equipo', value: 15, color: '#3B82F6' },
  { name: 'Otros', value: 5, color: '#6B7280' },
];

export function CategoryPieChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Distribución por Categorías</CardTitle>
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
