
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function CategoriesTabContent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Análisis por Categorías</CardTitle>
      </CardHeader>
      <CardContent className="h-96 flex items-center justify-center bg-muted/50 text-muted-foreground">
        Análisis por categorías próximamente
      </CardContent>
    </Card>
  );
}
