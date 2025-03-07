
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Datos de ejemplo
const ratios = [
  { name: "Liquidez", value: 2.4, target: 2.0, maxValue: 4 },
  { name: "Rentabilidad", value: 18.5, target: 15.0, maxValue: 30 },
  { name: "Endeudamiento", value: 35.0, target: 40.0, maxValue: 100 },
  { name: "Retorno sobre activos", value: 12.3, target: 10.0, maxValue: 20 },
  { name: "Rotación de inventario", value: 6.8, target: 6.0, maxValue: 12 },
];

export function FinancialRatiosCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Razones Financieras</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {ratios.map((ratio) => (
          <div key={ratio.name} className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{ratio.name}</span>
              <span className="text-sm font-medium">{ratio.value.toFixed(1)}</span>
            </div>
            <div className="space-y-1">
              <Progress 
                value={(ratio.value / ratio.maxValue) * 100} 
                className="h-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span className={ratio.value >= ratio.target ? "text-success" : "text-danger"}>
                  Meta: {ratio.target.toFixed(1)}
                </span>
                <span>{ratio.maxValue}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
