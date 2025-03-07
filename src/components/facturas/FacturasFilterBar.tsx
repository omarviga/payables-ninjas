
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, FileDown } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';

interface FacturasFilterBarProps {
  onFilter: (searchQuery: string) => void;
  onResetFilter: () => void;
  onExport: () => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export function FacturasFilterBar({ 
  onFilter, 
  onResetFilter, 
  onExport,
  onDateRangeChange 
}: FacturasFilterBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!value.trim()) {
      onResetFilter();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      onFilter(searchTerm);
    }
  };

  const handleSearchClick = () => {
    if (searchTerm.trim()) {
      onFilter(searchTerm);
    } else {
      onResetFilter();
    }
  };

  const handleDateChange = (range: DateRange | undefined) => {
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-4 mb-6">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar facturas por número, cliente, monto..."
          className="pl-8"
          value={searchTerm}
          onChange={handleSearch}
          onKeyDown={handleKeyDown}
        />
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute right-1 top-1"
          onClick={handleSearchClick}
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2 w-full md:w-auto">
        <DateRangePicker onChange={handleDateChange} />
        
        <Button variant="outline" size="icon" onClick={onExport} className="shrink-0">
          <FileDown className="h-4 w-4" />
        </Button>
        
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
