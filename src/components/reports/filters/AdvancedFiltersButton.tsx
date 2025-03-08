
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AdvancedFiltersButtonProps {
  activeFiltersCount: number;
  onClick: () => void;
  onClear: () => void;
  disabled?: boolean;
}

export function AdvancedFiltersButton({ 
  activeFiltersCount, 
  onClick, 
  onClear,
  disabled = false
}: AdvancedFiltersButtonProps) {
  return (
    <div className="flex items-center gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2"
        onClick={onClick}
        disabled={disabled}
      >
        <Filter className="h-4 w-4" />
        <span className="hidden sm:inline">Filtros avanzados</span>
        {activeFiltersCount > 0 && (
          <Badge className="ml-auto">{activeFiltersCount}</Badge>
        )}
      </Button>
      
      {activeFiltersCount > 0 && (
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClear}
          disabled={disabled}
        >
          Limpiar
        </Button>
      )}
    </div>
  );
}
