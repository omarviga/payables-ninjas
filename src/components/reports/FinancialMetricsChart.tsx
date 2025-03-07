
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
import { FileWarning } from "lucide-react";

// Empty data array instead of example data
const data: {
  name: string;
  ingresos: number;
  gastos: number;
  balance: number;
}[] = [];

export function FinancialMetricsChart() {
  const hasData = data.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Evolución Financiera</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
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
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
            <FileWarning className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">No hay datos disponibles</h3>
            <p className="text-muted-foreground max-w-md">
              Registra transacciones para visualizar la evolución financiera.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
