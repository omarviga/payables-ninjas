
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { MontoFilterCard } from "./filters/MontoFilterCard";
import { AdditionalFiltersCard } from "./filters/AdditionalFiltersCard";
import { OptionsFilterCard } from "./filters/OptionsFilterCard";
import { useAdvancedFilters } from "./filters/useAdvancedFilters";

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
  const {
    filters,
    handleChange,
    handleApplyFilters,
    handleResetFilters
  } = useAdvancedFilters(onApplyFilters);

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
          <MontoFilterCard 
            montoMin={filters.montoMin} 
            montoMax={filters.montoMax} 
            onChange={handleChange} 
          />

          <AdditionalFiltersCard 
            estado={filters.estado}
            cliente={filters.cliente}
            categoria={filters.categoria}
            onChange={handleChange}
          />

          <OptionsFilterCard 
            incluirCanceladas={filters.incluirCanceladas}
            incluirBorradores={filters.incluirBorradores}
            onChange={handleChange}
          />
        </div>
        
        <Separator className="my-6" />
        
        <CardFooter className="flex justify-between px-0">
          <Button variant="outline" onClick={handleResetFilters}>
            Restablecer
          </Button>
          <Button onClick={() => handleApplyFilters(onOpenChange)}>
            Aplicar Filtros
          </Button>
        </CardFooter>
      </SheetContent>
    </Sheet>
  );
}
