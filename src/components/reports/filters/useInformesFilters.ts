
import { useState, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { useToast } from '@/hooks/use-toast';
import { AdvancedFilters } from '@/components/reports/InformesAdvancedFilters';

export function useInformesFilters({
  onPeriodChange,
  onInvoiceTypeChange,
  onDateRangeChange,
  onAdvancedFiltersChange
}: {
  onPeriodChange?: (period: string) => void;
  onInvoiceTypeChange?: (type: string) => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  onAdvancedFiltersChange?: (filters: AdvancedFilters) => void;
}) {
  const { toast } = useToast();
  const [period, setPeriod] = useState('month');
  const [invoiceType, setInvoiceType] = useState('all');
  const [isFiltering, setIsFiltering] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [activeAdvancedFilters, setActiveAdvancedFilters] = useState<AdvancedFilters | null>(null);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  // Effect to show/hide the date picker based on period selection
  useEffect(() => {
    setShowDatePicker(period === 'custom');
  }, [period]);

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

  return {
    period,
    invoiceType,
    isFiltering,
    dateRange,
    advancedFiltersOpen,
    activeAdvancedFilters,
    activeFiltersCount,
    showDatePicker,
    handlePeriodChange,
    handleInvoiceTypeChange,
    handleDateRangeChange,
    handleAdvancedFiltersChange,
    handleClearAdvancedFilters,
    setAdvancedFiltersOpen
  };
}
