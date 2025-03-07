
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DetailsTabContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Detalles de Transacciones</CardTitle>
      </CardHeader>
      <CardContent className="h-96 flex items-center justify-center bg-muted/50 text-muted-foreground">
        Detalles de transacciones próximamente
      </CardContent>
    </Card>
  );
}
