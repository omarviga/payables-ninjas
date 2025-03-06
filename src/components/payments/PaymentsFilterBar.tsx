
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Calendar } from 'lucide-react';

interface PaymentsFilterBarProps {
  onFilterChange?: (searchTerm: string) => void;
}

export const PaymentsFilterBar = ({ onFilterChange }: PaymentsFilterBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por cliente, concepto, monto..."
          className="pl-8 bg-muted/50"
          onChange={(e) => onFilterChange?.(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="icon">
          <Calendar className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
