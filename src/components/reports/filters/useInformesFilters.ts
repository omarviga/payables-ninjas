
import { useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { AdvancedFilters } from '@/components/reports/InformesAdvancedFilters';
import { usePeriodFilter } from './hooks/usePeriodFilter';
import { useInvoiceTypeFilter } from './hooks/useInvoiceTypeFilter';
import { useDateRangeFilter } from './hooks/useDateRangeFilter';
import { useAdvancedFiltersState } from './hooks/useAdvancedFiltersState';
import { useFilteringStatus } from './hooks/useFilteringStatus';

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
  const { isFiltering, startFiltering, notifyFilterApplied } = useFilteringStatus();
  
  const { 
    period, 
    showDatePicker, 
    handlePeriodChange, 
    getPeriodText 
  } = usePeriodFilter(onPeriodChange);
  
  const { 
    invoiceType, 
    handleInvoiceTypeChange, 
    getInvoiceTypeText 
  } = useInvoiceTypeFilter(onInvoiceTypeChange);
  
  const { dateRange, handleDateRangeChange } = useDateRangeFilter(onDateRangeChange);
  
  const {
    advancedFiltersOpen,
    activeAdvancedFilters,
    activeFiltersCount,
    setAdvancedFiltersOpen,
    handleAdvancedFiltersChange,
    handleClearAdvancedFilters
  } = useAdvancedFiltersState(onAdvancedFiltersChange);

  // Enhanced handlers that trigger filtering status
  const handlePeriodChangeWithStatus = (value: string) => {
    handlePeriodChange(value);
    startFiltering();
  };

  const handleInvoiceTypeChangeWithStatus = (value: string) => {
    handleInvoiceTypeChange(value);
    startFiltering();
  };

  const handleDateRangeChangeWithStatus = (range: DateRange | undefined) => {
    handleDateRangeChange(range);
    startFiltering();
  };

  // Effect to show toast notification when filters are applied
  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        notifyFilterApplied(getPeriodText(period), getInvoiceTypeText(invoiceType));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isFiltering, period, invoiceType]);

  return {
    period,
    invoiceType,
    isFiltering,
    dateRange,
    advancedFiltersOpen,
    activeAdvancedFilters,
    activeFiltersCount,
    showDatePicker,
    handlePeriodChange: handlePeriodChangeWithStatus,
    handleInvoiceTypeChange: handleInvoiceTypeChangeWithStatus,
    handleDateRangeChange: handleDateRangeChangeWithStatus,
    handleAdvancedFiltersChange,
    handleClearAdvancedFilters,
    setAdvancedFiltersOpen
  };
}
