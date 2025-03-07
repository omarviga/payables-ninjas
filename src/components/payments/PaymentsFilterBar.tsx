
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { useState } from 'react';

interface PaymentsFilterBarProps {
  onFilterChange?: (searchTerm: string) => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export const PaymentsFilterBar = ({ 
  onFilterChange,
  onDateRangeChange
}: PaymentsFilterBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange?.(value);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between mb-4">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Buscar por cliente, concepto, monto..."
          className="pl-8 bg-muted/50"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex gap-2">
        <DateRangePicker onChange={handleDateRangeChange} />
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
