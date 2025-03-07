
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useState } from 'react';

interface FacturasFilterBarProps {
  onFilter: (query: string) => void;
  onResetFilter: () => void;
  onExport: () => void;
}

export const FacturasFilterBar = ({ 
  onFilter, 
  onResetFilter,
  onExport 
}: FacturasFilterBarProps) => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilter = () => {
    onFilter(searchQuery);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por cliente, número de factura, monto..."
          className="pl-8 bg-muted/50"
          value={searchQuery}
          onChange={handleSearch}
          onKeyDown={(e) => e.key === 'Enter' && handleFilter()}
        />
      </div>
      <div className="flex gap-2">
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleFilter}
        >
          <Filter className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          className="ml-2"
          onClick={onExport}
        >
          Exportar
        </Button>
      </div>
    </div>
  );
};
