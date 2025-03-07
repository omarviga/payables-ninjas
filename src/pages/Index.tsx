
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { ChartAndActivitySection } from '@/components/dashboard/ChartAndActivitySection';
import { InvoicesSummary } from '@/components/dashboard/InvoicesSummary';
import { financialData, recentActivities } from '@/data/dashboardData';
import { getAllInvoices } from '@/data/invoices';

// Define the proper type for activity status
type ActivityStatus = "completed" | "failed" | "pending" | "warning";

const Index = () => {
  // Obtener todas las facturas del sistema
  const allInvoices = getAllInvoices();
  
  // Separar facturas por cobrar y por pagar
  const receivableInvoices = allInvoices.filter(inv => inv.type === 'receivable');
  const payableInvoices = allInvoices.filter(inv => inv.type === 'payable');
  
  // Make sure we're using properly typed activities
  const typedRecentActivities = recentActivities.map(activity => ({
    ...activity,
    status: activity.status as ActivityStatus
  }));
  
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
