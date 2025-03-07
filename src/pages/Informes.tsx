
import { useState, useEffect } from 'react';
import { InformesHeader } from '@/components/reports/InformesHeader';
import { InformesFilters } from '@/components/reports/InformesFilters';
import { ReportsSummary } from '@/components/reports/ReportsSummary';
import { InformesTabs } from '@/components/reports/InformesTabs';
import { DateRange } from 'react-day-picker';
import { AdvancedFilters } from '@/components/reports/InformesAdvancedFilters';
import { useToast } from '@/hooks/use-toast';

const Informes = () => {
  const { toast } = useToast();
  const [period, setPeriod] = useState('month');
  const [invoiceType, setInvoiceType] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilters | null>(null);
  const [isCustomPeriod, setIsCustomPeriod] = useState(false);

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    setIsCustomPeriod(value === 'custom');
    
    // If switching away from custom period, reset date range
    if (value !== 'custom') {
      setDateRange(undefined);
    }
  };

  const handleInvoiceTypeChange = (value: string) => {
    setInvoiceType(value);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    console.log('Date range updated:', range);
  };

  const handleAdvancedFiltersChange = (filters: AdvancedFilters) => {
    setAdvancedFilters(filters);
    console.log('Advanced filters applied:', filters);
    
    // Log applied filters for debugging
    if (filters.montoMin || filters.montoMax) {
      console.log(`Monto: ${filters.montoMin || 0} - ${filters.montoMax || 'sin límite'}`);
    }
    
    if (filters.estado) {
      console.log(`Estado: ${filters.estado}`);
    }
    
    if (filters.cliente) {
      console.log(`Cliente: ${filters.cliente}`);
    }
    
    if (filters.categoria && filters.categoria.length > 0) {
      console.log(`Categoría: ${filters.categoria.join(', ')}`);
    }
    
    console.log(`Incluir canceladas: ${filters.incluirCanceladas}`);
    console.log(`Incluir borradores: ${filters.incluirBorradores}`);
  };

  return (
    <div className="flex flex-col gap-6">
      <InformesHeader />
      
      <InformesFilters 
        onPeriodChange={handlePeriodChange}
        onInvoiceTypeChange={handleInvoiceTypeChange}
        onDateRangeChange={handleDateRangeChange}
        onAdvancedFiltersChange={handleAdvancedFiltersChange}
      />
      
      <ReportsSummary />
      
      <InformesTabs />
    </div>
  );
};

export default Informes;

