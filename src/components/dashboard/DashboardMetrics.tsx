
import { TotalReceivableCard } from '@/components/dashboard/metrics/TotalReceivableCard';
import { TotalPayableCard } from '@/components/dashboard/metrics/TotalPayableCard';
import { CashFlowCard } from '@/components/dashboard/metrics/CashFlowCard';
import { OverdueInvoicesCard } from '@/components/dashboard/metrics/OverdueInvoicesCard';

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TotalReceivableCard />
      <TotalPayableCard />
      <CashFlowCard />
      <OverdueInvoicesCard />
    </div>
  );
}
