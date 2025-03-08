
import { useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { AdvancedFilters } from '@/components/reports/InformesAdvancedFilters';
import { usePeriodFilter } from './usePeriodFilter';
import { useInvoiceTypeFilter } from './useInvoiceTypeFilter';
import { useDateRangeFilter } from './useDateRangeFilter';
import { useAdvancedFiltersState } from './useAdvancedFiltersState';
import { useFilteringStatus } from './useFilteringStatus';

export function useInformesFilters({
  onPeriodChange,
  onInvoiceTypeChange,
  onDateRangeChange,
  onAdvancedFiltersChange,
  onResetFilters
}: {
  onPeriodChange?: (period: string) => void;
  onInvoiceTypeChange?: (type: string) => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  onAdvancedFiltersChange?: (filters: AdvancedFilters) => void;
  onResetFilters?: () => void;
}) {
  const { isFiltering, startFiltering, notifyFilterApplied } = useFilteringStatus();
  
  const { 
    period, 
    showDatePicker, 
    handlePeriodChange, 
    resetPeriod,
    getPeriodText 
  } = usePeriodFilter(onPeriodChange);
  
  const { 
    invoiceType, 
    handleInvoiceTypeChange, 
    resetInvoiceType,
    getInvoiceTypeText 
  } = useInvoiceTypeFilter(onInvoiceTypeChange);
  
  const { dateRange, handleDateRangeChange, resetDateRange } = useDateRangeFilter(onDateRangeChange);
  
  const {
    advancedFiltersOpen,
    activeAdvancedFilters,
    activeFiltersCount,
    setAdvancedFiltersOpen,
    handleAdvancedFiltersChange,
    handleClearAdvancedFilters,
    resetAdvancedFilters
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

  const handleResetFilters = () => {
    resetPeriod();
    resetInvoiceType();
    resetDateRange();
    resetAdvancedFilters();
    
    if (onResetFilters) {
      onResetFilters();
    }
  };

  // Effect to show toast notification when filters are applied
  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        notifyFilterApplied(getPeriodText(period), getInvoiceTypeText(invoiceType));
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isFiltering, period, invoiceType, getPeriodText, getInvoiceTypeText, notifyFilterApplied]);

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
    setAdvancedFiltersOpen,
    handleResetFilters
  };
}
