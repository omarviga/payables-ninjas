
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { InformesAdvancedFilters, AdvancedFilters } from './InformesAdvancedFilters';
import { PeriodFilter } from './filters/PeriodFilter';
import { InvoiceTypeFilter } from './filters/InvoiceTypeFilter';
import { AdvancedFiltersButton } from './filters/AdvancedFiltersButton';
import { useInformesFilters } from './filters/useInformesFilters';

interface InformesFiltersProps {
  onPeriodChange?: (period: string) => void;
  onInvoiceTypeChange?: (type: string) => void;
  onDateRangeChange?: (range: DateRange | undefined) => void;
  onAdvancedFiltersChange?: (filters: AdvancedFilters) => void;
  onResetFilters?: () => void;
  isLoading?: boolean;
}

export function InformesFilters({
  onPeriodChange,
  onInvoiceTypeChange,
  onDateRangeChange,
  onAdvancedFiltersChange,
  onResetFilters,
  isLoading = false
}: InformesFiltersProps) {
  const {
    period,
    invoiceType,
    isFiltering,
    advancedFiltersOpen,
    activeFiltersCount,
    showDatePicker,
    handlePeriodChange,
    handleInvoiceTypeChange,
    handleDateRangeChange,
    handleAdvancedFiltersChange,
    handleClearAdvancedFilters,
    setAdvancedFiltersOpen
  } = useInformesFilters({
    onPeriodChange,
    onInvoiceTypeChange,
    onDateRangeChange,
    onAdvancedFiltersChange,
    onResetFilters
  });

  // Combine the loading states
  const isLoadingState = isLoading || isFiltering;

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-end justify-between mb-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
        <PeriodFilter 
          value={period} 
          isLoading={isLoadingState} 
          onChange={handlePeriodChange} 
        />
        
        <InvoiceTypeFilter 
          value={invoiceType} 
          isLoading={isLoadingState} 
          onChange={handleInvoiceTypeChange} 
        />
        
        <div className="flex items-center gap-2">
          {showDatePicker && (
            <DateRangePicker onChange={handleDateRangeChange} />
          )}
          
          <AdvancedFiltersButton 
            activeFiltersCount={activeFiltersCount}
            onClick={() => setAdvancedFiltersOpen(true)}
            onClear={handleClearAdvancedFilters}
            disabled={isLoadingState}
          />
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
