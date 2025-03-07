
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdvancedFilters } from "@/components/reports/InformesAdvancedFilters";

interface AdditionalFiltersCardProps {
  estado?: string;
  cliente?: string;
  categoria?: string[];
  onChange: (field: keyof AdvancedFilters, value: any) => void;
}

export function AdditionalFiltersCard({ 
  estado, 
  cliente, 
  categoria, 
  onChange 
}: AdditionalFiltersCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Filtros Adicionales</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="estado">Estado</Label>
          <Select 
            value={estado} 
            onValueChange={(value) => onChange('estado', value)}
          >
            <SelectTrigger id="estado">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pagada">Pagada</SelectItem>
              <SelectItem value="pendiente">Pendiente</SelectItem>
              <SelectItem value="vencida">Vencida</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="cliente">Cliente</Label>
          <Select 
            value={cliente} 
            onValueChange={(value) => onChange('cliente', value)}
          >
            <SelectTrigger id="cliente">
              <SelectValue placeholder="Todos los clientes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cliente1">Cliente 1</SelectItem>
              <SelectItem value="cliente2">Cliente 2</SelectItem>
              <SelectItem value="cliente3">Cliente 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="categoria">Categoría</Label>
          <Select 
            value={categoria?.[0]} 
            onValueChange={(value) => onChange('categoria', [value])}
          >
            <SelectTrigger id="categoria">
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ventas">Ventas</SelectItem>
              <SelectItem value="compras">Compras</SelectItem>
              <SelectItem value="servicios">Servicios</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
