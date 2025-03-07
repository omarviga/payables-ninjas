
import { useState } from 'react';
import { InformesHeader } from '@/components/reports/InformesHeader';
import { InformesFilters } from '@/components/reports/InformesFilters';
import { ReportsSummary } from '@/components/reports/ReportsSummary';
import { InformesTabs } from '@/components/reports/InformesTabs';
import { DateRange } from 'react-day-picker';

const Informes = () => {
  const [period, setPeriod] = useState('month');
  const [invoiceType, setInvoiceType] = useState('all');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const handlePeriodChange = (value: string) => {
    setPeriod(value);
  };

  const handleInvoiceTypeChange = (value: string) => {
    setInvoiceType(value);
  };

  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  return (
    <div className="flex flex-col gap-6">
      <InformesHeader />
      
      <InformesFilters 
        onPeriodChange={handlePeriodChange}
        onInvoiceTypeChange={handleInvoiceTypeChange}
        onDateRangeChange={handleDateRangeChange}
      />
      
      <ReportsSummary />
      
      <InformesTabs />
    </div>
  );
};

export default Informes;
