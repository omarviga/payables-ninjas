
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileWarning } from "lucide-react";

// Empty ratios array instead of example data
const ratios: {
  name: string;
  value: number;
  target: number;
  maxValue: number;
}[] = [];

export function FinancialRatiosCard() {
  const hasData = ratios.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Razones Financieras</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {hasData ? (
          ratios.map((ratio) => (
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
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center space-y-4">
            <FileWarning className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">No hay datos disponibles</h3>
            <p className="text-muted-foreground max-w-md">
              Registra transacciones para visualizar las razones financieras.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
