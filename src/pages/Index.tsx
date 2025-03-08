
import { useMemo } from 'react';
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { ChartAndActivitySection } from '@/components/dashboard/ChartAndActivitySection';
import { InvoicesSummary } from '@/components/dashboard/InvoicesSummary';
import { financialData, recentActivities } from '@/data/dashboardData';
import { useInvoices } from '@/hooks/use-invoices';
import { Spinner } from '@/components/ui/spinner';
import { AlertTriangle } from 'lucide-react';

// Define the proper type for activity status
type ActivityStatus = "completed" | "failed" | "pending" | "warning";

const Index = () => {
  const { receivableInvoices, payableInvoices, isLoading, error } = useInvoices();
  
  // Make sure we're using properly typed activities
  const typedRecentActivities = useMemo(() => recentActivities.map(activity => ({
    ...activity,
    status: activity.status as ActivityStatus
  })), []);
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Spinner size="lg" />
        <p className="mt-4 text-muted-foreground">Cargando datos del dashboard...</p>
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
        <h2 className="text-xl font-semibold mb-2">Error de carga</h2>
        <p className="text-muted-foreground">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
      
      <DashboardMetrics />
      
      <ChartAndActivitySection 
        financialData={financialData} 
        recentActivities={typedRecentActivities} 
      />
      
      <div className="mt-4">
        <InvoicesSummary receivable={receivableInvoices} payable={payableInvoices} />
      </div>
    </div>
  );
};

export default Index;
