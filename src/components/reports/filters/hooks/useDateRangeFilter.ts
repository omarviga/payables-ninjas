
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';

export function useDateRangeFilter(
  onDateRangeChange?: (range: DateRange | undefined) => void
) {
  const { toast } = useToast();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Effect to handle date range changes
  useEffect(() => {
    if (dateRange?.from) {
      toast({
        title: "Rango de fechas seleccionado",
        description: dateRange.to 
          ? `Del ${dateRange.from.toLocaleDateString('es-MX')} al ${dateRange.to.toLocaleDateString('es-MX')}`
          : `${dateRange.from.toLocaleDateString('es-MX')}`,
        variant: "default",
      });
    }
  }, [dateRange, toast]);

  // Date range change handler
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
  };

  // Reset to default
  const resetDateRange = () => {
    setDateRange(undefined);
    if (onDateRangeChange) {
      onDateRangeChange(undefined);
    }
  };

  return {
    dateRange,
    handleDateRangeChange,
    resetDateRange
  };
}
