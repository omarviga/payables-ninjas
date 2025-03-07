
import { DashboardMetrics } from '@/components/dashboard/DashboardMetrics';
import { ChartAndActivitySection } from '@/components/dashboard/ChartAndActivitySection';
import { InvoicesSummary } from '@/components/dashboard/InvoicesSummary';
import { financialData, receivableInvoices, payableInvoices, recentActivities } from '@/data/dashboardData';

const Index = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
      
      <DashboardMetrics />
      
      <ChartAndActivitySection 
        financialData={financialData} 
        recentActivities={recentActivities} 
      />
      
      <div className="mt-4">
        <InvoicesSummary receivable={receivableInvoices} payable={payableInvoices} />
      </div>
    </div>
  );
};

export default Index;
