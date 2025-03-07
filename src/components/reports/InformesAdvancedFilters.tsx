
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface InformesAdvancedFiltersProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyFilters: (filters: AdvancedFilters) => void;
}

export interface AdvancedFilters {
  montoMin?: number;
  montoMax?: number;
  estado?: string;
  cliente?: string;
  categoria?: string[];
  incluirCanceladas: boolean;
  incluirBorradores: boolean;
}

export function InformesAdvancedFilters({ 
  open, 
  onOpenChange,
  onApplyFilters 
}: InformesAdvancedFiltersProps) {
  const { toast } = useToast();
  const [filters, setFilters] = useState<AdvancedFilters>({
    incluirCanceladas: false,
    incluirBorradores: false,
  });

  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onOpenChange(false);
    toast({
      title: "Filtros avanzados aplicados",
      description: "Se han aplicado los filtros avanzados a los informes",
    });
  };

  const handleResetFilters = () => {
    setFilters({
      incluirCanceladas: false,
      incluirBorradores: false,
    });
    toast({
      title: "Filtros restablecidos",
      description: "Se han restablecido los filtros avanzados",
    });
  };

  const handleChange = (field: keyof AdvancedFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filtros Avanzados</SheetTitle>
          <SheetDescription>
            Configura filtros adicionales para tu informe
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Monto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="montoMin">Mínimo</Label>
                  <Input 
                    id="montoMin" 
                    type="number" 
                    placeholder="0.00" 
                    value={filters.montoMin || ''} 
                    onChange={(e) => handleChange('montoMin', parseFloat(e.target.value) || undefined)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="montoMax">Máximo</Label>
                  <Input 
                    id="montoMax" 
                    type="number" 
                    placeholder="0.00" 
                    value={filters.montoMax || ''} 
                    onChange={(e) => handleChange('montoMax', parseFloat(e.target.value) || undefined)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Filtros Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="estado">Estado</Label>
                <Select 
                  value={filters.estado} 
                  onValueChange={(value) => handleChange('estado', value)}
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
                  value={filters.cliente} 
                  onValueChange={(value) => handleChange('cliente', value)}
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
                  value={filters.categoria?.[0]} 
                  onValueChange={(value) => handleChange('categoria', [value])}
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

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Opciones Adicionales</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="incluirCanceladas" 
                  checked={filters.incluirCanceladas}
                  onCheckedChange={(checked) => handleChange('incluirCanceladas', checked === true)}
                />
                <Label htmlFor="incluirCanceladas">Incluir facturas canceladas</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="incluirBorradores" 
                  checked={filters.incluirBorradores}
                  onCheckedChange={(checked) => handleChange('incluirBorradores', checked === true)}
                />
                <Label htmlFor="incluirBorradores">Incluir borradores</Label>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Separator className="my-6" />
        
        <CardFooter className="flex justify-between px-0">
          <Button variant="outline" onClick={handleResetFilters}>
            Restablecer
          </Button>
          <Button onClick={handleApplyFilters}>
            Aplicar Filtros
          </Button>
        </CardFooter>
      </SheetContent>
    </Sheet>
  );
}
