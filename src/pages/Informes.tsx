
import { useReducer, useCallback, useMemo } from 'react';
import { InformesHeader } from '@/components/reports/InformesHeader';
import { InformesFilters } from '@/components/reports/InformesFilters';
import { ReportsSummary } from '@/components/reports/ReportsSummary';
import { InformesTabs } from '@/components/reports/InformesTabs';
import { DateRange } from 'react-day-picker';
import { AdvancedFilters } from '@/components/reports/InformesAdvancedFilters';
import { useToast } from '@/hooks/use-toast';
import { getAllInvoices } from '@/data/invoices';
import type { Invoice } from '@/data/invoices';

// Define filter state and actions
type FiltersState = {
  period: string;
  invoiceType: string;
  dateRange: DateRange | undefined;
  advancedFilters: AdvancedFilters | null;
  isCustomPeriod: boolean;
  isLoading: boolean;
};

type FiltersAction =
  | { type: 'SET_PERIOD'; payload: string }
  | { type: 'SET_INVOICE_TYPE'; payload: string }
  | { type: 'SET_DATE_RANGE'; payload: DateRange | undefined }
  | { type: 'SET_ADVANCED_FILTERS'; payload: AdvancedFilters }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET_FILTERS' };

const initialState: FiltersState = {
  period: 'month',
  invoiceType: 'all',
  dateRange: undefined,
  advancedFilters: null,
  isCustomPeriod: false,
  isLoading: false,
};

const filtersReducer = (state: FiltersState, action: FiltersAction): FiltersState => {
  switch (action.type) {
    case 'SET_PERIOD':
      return {
        ...state,
        period: action.payload,
        isCustomPeriod: action.payload === 'custom',
        dateRange: action.payload !== 'custom' ? undefined : state.dateRange,
      };
    case 'SET_INVOICE_TYPE':
      return { ...state, invoiceType: action.payload };
    case 'SET_DATE_RANGE':
      return { ...state, dateRange: action.payload };
    case 'SET_ADVANCED_FILTERS':
      return { ...state, advancedFilters: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'RESET_FILTERS':
      return initialState;
    default:
      return state;
  }
};

const Informes = () => {
  const { toast } = useToast();
  const [state, dispatch] = useReducer(filtersReducer, initialState);
  const { period, invoiceType, dateRange, advancedFilters, isCustomPeriod, isLoading } = state;

  // Helper function to convert date string from DD/MM/YYYY to Date object
  const parseDateString = (dateStr: string): Date => {
    const parts = dateStr.split('/');
    return new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
  };

  // Get start and end dates based on period
  const getDateRangeFromPeriod = (): { startDate: Date; endDate: Date } => {
    const today = new Date();
    let startDate = new Date();
    const endDate = today;

    switch (period) {
      case 'week':
        startDate = new Date(today);
        startDate.setDate(today.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'quarter':
        const currentQuarter = Math.floor(today.getMonth() / 3);
        startDate = new Date(today.getFullYear(), currentQuarter * 3, 1);
        break;
      case 'year':
        startDate = new Date(today.getFullYear(), 0, 1);
        break;
      case 'custom':
        if (dateRange?.from && dateRange.to) {
          return { startDate: dateRange.from, endDate: dateRange.to };
        }
        // If no custom range is set, default to this month
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
    }

    return { startDate, endDate };
  };

  // Filter invoices based on all filters
  const filteredInvoices = useMemo(() => {
    const allInvoices = getAllInvoices();
    const { startDate, endDate } = getDateRangeFromPeriod();

    return allInvoices.filter(invoice => {
      // Filter by invoice type
      if (invoiceType !== 'all' && invoice.type !== invoiceType) {
        return false;
      }

      // Filter by date range
      const invoiceDate = parseDateString(invoice.date);
      if (invoiceDate < startDate || invoiceDate > endDate) {
        return false;
      }

      // Filter by advanced filters if they exist
      if (advancedFilters) {
        // Filter by amount
        if (advancedFilters.montoMin !== undefined && invoice.amount < advancedFilters.montoMin) {
          return false;
        }
        if (advancedFilters.montoMax !== undefined && invoice.amount > advancedFilters.montoMax) {
          return false;
        }

        // Filter by status if specified
        if (advancedFilters.estado) {
          const statusMap: Record<string, string> = {
            'pagada': 'paid',
            'pendiente': 'pending',
            'vencida': 'overdue'
          };
          if (statusMap[advancedFilters.estado] !== invoice.status) {
            return false;
          }
        }

        // Filter by client if specified
        if (advancedFilters.cliente && invoice.client.toLowerCase() !== advancedFilters.cliente.toLowerCase()) {
          return false;
        }

        // More advanced filters could be added here
      }

      return true;
    });
  }, [period, invoiceType, dateRange, advancedFilters]);

  // Calculate derived data for reports
  const reportData = useMemo(() => {
    return {
      totalInvoices: filteredInvoices.length,
      totalAmount: filteredInvoices.reduce((sum, inv) => sum + inv.amount, 0),
      byStatus: {
        paid: filteredInvoices.filter(inv => inv.status === 'paid'),
        pending: filteredInvoices.filter(inv => inv.status === 'pending'),
        overdue: filteredInvoices.filter(inv => inv.status === 'overdue')
      }
    };
  }, [filteredInvoices]);

  // Callback handlers
  const handlePeriodChange = useCallback((value: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Add a small delay to simulate processing
    setTimeout(() => {
      dispatch({ type: 'SET_PERIOD', payload: value });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      toast({
        title: "Período actualizado",
        description: `Mostrando datos para ${value === 'week' ? 'esta semana' : 
                                            value === 'month' ? 'este mes' : 
                                            value === 'quarter' ? 'este trimestre' : 
                                            value === 'year' ? 'este año' : 
                                            'período personalizado'}`,
      });
    }, 300);
  }, [toast]);

  const handleInvoiceTypeChange = useCallback((value: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Add a small delay to simulate processing
    setTimeout(() => {
      dispatch({ type: 'SET_INVOICE_TYPE', payload: value });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      toast({
        title: "Filtro actualizado",
        description: `Mostrando facturas ${value === 'all' ? 'de todos los tipos' : 
                                        value === 'receivable' ? 'por cobrar' : 
                                        'por pagar'}`,
      });
    }, 300);
  }, [toast]);

  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Add a small delay to simulate processing
    setTimeout(() => {
      dispatch({ type: 'SET_DATE_RANGE', payload: range });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      if (range?.from) {
        toast({
          title: "Rango de fechas actualizado",
          description: range.to 
            ? `Del ${range.from.toLocaleDateString('es-MX')} al ${range.to.toLocaleDateString('es-MX')}`
            : `Desde ${range.from.toLocaleDateString('es-MX')}`,
        });
      }
    }, 300);
  }, [toast]);

  const handleAdvancedFiltersChange = useCallback((filters: AdvancedFilters) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Add a small delay to simulate processing
    setTimeout(() => {
      dispatch({ type: 'SET_ADVANCED_FILTERS', payload: filters });
      dispatch({ type: 'SET_LOADING', payload: false });
      
      const activeFiltersCount = Object.values(filters).filter(v => 
        v !== undefined && v !== false && 
        (Array.isArray(v) ? v.length > 0 : true)
      ).length;
      
      toast({
        title: "Filtros avanzados aplicados",
        description: `Se han aplicado ${activeFiltersCount} filtros avanzados`,
      });
    }, 300);
  }, [toast]);

  return (
    <div className="flex flex-col gap-6">
      <InformesHeader />
      
      <InformesFilters 
        onPeriodChange={handlePeriodChange}
        onInvoiceTypeChange={handleInvoiceTypeChange}
        onDateRangeChange={handleDateRangeChange}
        onAdvancedFiltersChange={handleAdvancedFiltersChange}
        isLoading={isLoading}
      />
      
      <ReportsSummary 
        totalInvoices={reportData.totalInvoices}
        totalAmount={reportData.totalAmount}
        paidInvoices={reportData.byStatus.paid.length}
        paidAmount={reportData.byStatus.paid.reduce((sum, inv) => sum + inv.amount, 0)}
        pendingInvoices={reportData.byStatus.pending.length}
        pendingAmount={reportData.byStatus.pending.reduce((sum, inv) => sum + inv.amount, 0)}
        overdueInvoices={reportData.byStatus.overdue.length}
        overdueAmount={reportData.byStatus.overdue.reduce((sum, inv) => sum + inv.amount, 0)}
      />
      
      <InformesTabs 
        filteredInvoices={filteredInvoices}
        dateRange={period === 'custom' ? dateRange : undefined}
        invoiceType={invoiceType}
      />
    </div>
  );
};

export default Informes;
