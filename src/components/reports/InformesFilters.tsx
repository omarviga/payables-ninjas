
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Button } from '@/components/ui/button';
import { Filter, Loader2 } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';

interface InformesFiltersProps {
  onPeriodChange?: (period: string) => void;
  onInvoiceTypeChange?: (type: string) => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

export function InformesFilters({
  onPeriodChange,
  onInvoiceTypeChange,
  onDateRangeChange
}: InformesFiltersProps) {
  const { toast } = useToast();
  const [period, setPeriod] = useState('month');
  const [invoiceType, setInvoiceType] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Effect to handle filtering state and toast notifications
  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        setIsFiltering(false);
        toast({
          title: "Filtro aplicado",
          description: `Mostrando datos del ${getPeriodText(period)} y facturas ${getInvoiceTypeText(invoiceType)}`,
        });
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isFiltering, period, invoiceType, toast]);

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

  // Period change handler
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    setIsFiltering(true);
    if (onPeriodChange) {
      onPeriodChange(value);
    }
  };

  // Invoice type change handler
  const handleInvoiceTypeChange = (value: string) => {
    setInvoiceType(value);
    setIsFiltering(true);
    if (onInvoiceTypeChange) {
      onInvoiceTypeChange(value);
    }
  };

  // Date range change handler
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setIsFiltering(true);
    if (onDateRangeChange) {
      onDateRangeChange(range);
    }
  };

  const handleAdvancedFilter = () => {
    toast({
      title: "Filtros avanzados",
      description: "Filtros avanzados en desarrollo",
    });
  };

  // Helper functions for descriptive texts
  const getPeriodText = (periodValue: string): string => {
    switch (periodValue) {
      case 'week': return 'esta semana';
      case 'month': return 'este mes';
      case 'quarter': return 'este trimestre';
      case 'year': return 'este año';
      case 'custom': return 'periodo personalizado';
      default: return periodValue;
    }
  };

  const getInvoiceTypeText = (typeValue: string): string => {
    switch (typeValue) {
      case 'all': return 'de todos los tipos';
      case 'receivable': return 'por cobrar';
      case 'payable': return 'por pagar';
      default: return typeValue;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end justify-between mb-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <div className="w-full sm:w-48">
          <Select 
            value={period} 
            onValueChange={handlePeriodChange}
            disabled={isFiltering}
          >
            <SelectTrigger>
              {isFiltering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mes</SelectItem>
              <SelectItem value="quarter">Este trimestre</SelectItem>
              <SelectItem value="year">Este año</SelectItem>
              <SelectItem value="custom">Personalizado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full sm:w-48">
          <Select 
            value={invoiceType} 
            onValueChange={handleInvoiceTypeChange}
            disabled={isFiltering}
          >
            <SelectTrigger>
              {isFiltering && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <SelectValue placeholder="Tipo de factura" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="receivable">Por cobrar</SelectItem>
              <SelectItem value="payable">Por pagar</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <DateRangePicker onChange={handleDateRangeChange} />
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleAdvancedFilter}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
