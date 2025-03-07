
import { FinancialChart } from '@/components/dashboard/FinancialChart';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

interface ChartAndActivitySectionProps {
  financialData: {
    name: string;
    ingresos: number;
    gastos: number;
  }[];
  recentActivities: {
    id: string;
    title: string;
    description: string;
    timestamp: string;
    status: "completed" | "failed" | "pending" | "warning";
    user: {
      name: string;
      initials: string;
    };
  }[];
}

export function ChartAndActivitySection({ financialData, recentActivities }: ChartAndActivitySectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <FinancialChart data={financialData} />
      </div>
      <div>
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
}
