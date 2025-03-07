
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

// Datos de ejemplo
const categories = [
  { name: "Servicios", amount: 128500, percentage: 35, trend: "up" },
  { name: "Materiales", amount: 91785, percentage: 25, trend: "up" },
  { name: "Salarios", amount: 73430, percentage: 20, trend: "stable" },
  { name: "Equipo", amount: 55070, percentage: 15, trend: "down" },
  { name: "Otros", amount: 18355, percentage: 5, trend: "down" },
];

export function TopCategoriesTable() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Principales Categorías</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
}
