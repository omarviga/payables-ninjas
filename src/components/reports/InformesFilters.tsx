
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { Button } from '@/components/ui/button';
import { Filter, Loader2, X } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';
import { AdvancedFilters, InformesAdvancedFilters } from './InformesAdvancedFilters';
import { Badge } from '@/components/ui/badge';

interface InformesFiltersProps {
  onPeriodChange?: (period: string) => void;
  onInvoiceTypeChange?: (type: string) => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  onAdvancedFiltersChange?: (filters: AdvancedFilters) => void;
}

export function InformesFilters({
  onPeriodChange,
  onInvoiceTypeChange,
  onDateRangeChange,
  onAdvancedFiltersChange
}: InformesFiltersProps) {
  const { toast } = useToast();
  const [period, setPeriod] = useState('month');
  const [invoiceType, setInvoiceType] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [activeAdvancedFilters, setActiveAdvancedFilters] = useState<AdvancedFilters | null>(null);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

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

  // Effect to count active advanced filters
  useEffect(() => {
    if (activeAdvancedFilters) {
      let count = 0;
      if (activeAdvancedFilters.montoMin !== undefined) count++;
      if (activeAdvancedFilters.montoMax !== undefined) count++;
      if (activeAdvancedFilters.estado) count++;
      if (activeAdvancedFilters.cliente) count++;
      if (activeAdvancedFilters.categoria && activeAdvancedFilters.categoria.length > 0) count++;
      if (activeAdvancedFilters.incluirCanceladas) count++;
      if (activeAdvancedFilters.incluirBorradores) count++;
      setActiveFiltersCount(count);
    } else {
      setActiveFiltersCount(0);
    }
  }, [activeAdvancedFilters]);

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

  // Advanced filters change handler
  const handleAdvancedFiltersChange = (filters: AdvancedFilters) => {
    setActiveAdvancedFilters(filters);
    if (onAdvancedFiltersChange) {
      onAdvancedFiltersChange(filters);
    }
  };

  // Clear advanced filters
  const handleClearAdvancedFilters = () => {
    setActiveAdvancedFilters(null);
    setActiveFiltersCount(0);
    if (onAdvancedFiltersChange) {
      onAdvancedFiltersChange({
        incluirCanceladas: false,
        incluirBorradores: false,
      });
    }
    toast({
      title: "Filtros avanzados eliminados",
      description: "Se han eliminado todos los filtros avanzados",
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
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon"
              className={activeFiltersCount > 0 ? "bg-primary/10" : ""}
              onClick={() => setAdvancedFiltersOpen(true)}
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
          
          {activeFiltersCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs flex items-center gap-1" 
              onClick={handleClearAdvancedFilters}
            >
              <X className="h-3 w-3" />
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      <InformesAdvancedFilters
        open={advancedFiltersOpen}
        onOpenChange={setAdvancedFiltersOpen}
        onApplyFilters={handleAdvancedFiltersChange}
      />
    </div>
  );
}
