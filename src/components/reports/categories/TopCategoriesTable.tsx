
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileWarning } from "lucide-react";

// Empty data array instead of example data
const categories: { 
  name: string; 
  amount: number; 
  percentage: number; 
  trend: "up" | "down" | "stable" 
}[] = [];

export function TopCategoriesTable() {
  const hasData = categories.length > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Principales Categorías</CardTitle>
      </CardHeader>
      <CardContent>
        {hasData ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Monto</TableHead>
                <TableHead className="text-right">Porcentaje</TableHead>
                <TableHead className="text-right">Tendencia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.name}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="text-right">${category.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">{category.percentage}%</TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant={category.trend === "up" ? "default" : category.trend === "down" ? "destructive" : "secondary"}
                    >
                      {category.trend === "up" ? "Subiendo" : category.trend === "down" ? "Bajando" : "Estable"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center h-[200px] text-center space-y-4">
            <FileWarning className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">No hay datos disponibles</h3>
            <p className="text-muted-foreground max-w-md">
              Registra transacciones para visualizar las principales categorías.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
