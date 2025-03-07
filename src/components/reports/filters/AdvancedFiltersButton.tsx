
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AdvancedFiltersButtonProps {
  activeFiltersCount: number;
  onClick: () => void;
  onClear?: () => void;
}

export function AdvancedFiltersButton({ 
  activeFiltersCount, 
  onClick, 
  onClear 
}: AdvancedFiltersButtonProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <Button 
          variant="outline" 
          size="icon"
          className={activeFiltersCount > 0 ? "bg-primary/10" : ""}
          onClick={onClick}
        >
          <Filter className="h-4 w-4" />
        </Button>
        {activeFiltersCount > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {activeFiltersCount}
          </Badge>
        )}
      </div>
      
      {activeFiltersCount > 0 && onClear && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 px-2 text-xs flex items-center gap-1" 
          onClick={onClear}
        >
          <X className="h-3 w-3" />
          Limpiar filtros
        </Button>
      )}
    </div>
  );
}
