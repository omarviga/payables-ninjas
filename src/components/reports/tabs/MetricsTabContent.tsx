
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricsTabContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Métricas Financieras</CardTitle>
      </CardHeader>
      <CardContent className="h-96 flex items-center justify-center bg-muted/50 text-muted-foreground">
        Métricas financieras detalladas próximamente
      </CardContent>
    </Card>
  );
}
