
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface ChartData {
  name: string;
  ingresos: number;
  gastos: number;
}

interface FinancialChartProps {
  data: ChartData[];
}

export function FinancialChart({ data }: FinancialChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Flujo de Efectivo</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="monthly">
          <TabsList className="mb-4">
            <TabsTrigger value="weekly">Semanal</TabsTrigger>
            <TabsTrigger value="monthly">Mensual</TabsTrigger>
            <TabsTrigger value="yearly">Anual</TabsTrigger>
          </TabsList>
          <TabsContent value="weekly">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.slice(-7)}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38A3A5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#38A3A5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EB5353" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EB5353" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="ingresos"
                  stroke="#38A3A5"
                  fillOpacity={1}
                  fill="url(#colorIngresos)"
                />
                <Area
                  type="monotone"
                  dataKey="gastos"
                  stroke="#EB5353"
                  fillOpacity={1}
                  fill="url(#colorGastos)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="monthly">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38A3A5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#38A3A5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EB5353" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EB5353" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="ingresos"
                  stroke="#38A3A5"
                  fillOpacity={1}
                  fill="url(#colorIngresos)"
                />
                <Area
                  type="monotone"
                  dataKey="gastos"
                  stroke="#EB5353"
                  fillOpacity={1}
                  fill="url(#colorGastos)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="yearly">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data.filter((_, i) => i % 3 === 0)}>
                <defs>
                  <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38A3A5" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#38A3A5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorGastos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EB5353" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#EB5353" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="ingresos"
                  stroke="#38A3A5"
                  fillOpacity={1}
                  fill="url(#colorIngresos)"
                />
                <Area
                  type="monotone"
                  dataKey="gastos"
                  stroke="#EB5353"
                  fillOpacity={1}
                  fill="url(#colorGastos)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
