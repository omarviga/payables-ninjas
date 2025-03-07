
import { ArrowDownUp } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';

export function CashFlowCard() {
  return (
    <StatsCard
      title="Flujo de Efectivo"
      value="$0"
      description="Balance actual"
      icon={ArrowDownUp}
      trend={0}
      trendLabel="vs. mes anterior"
      iconClassName="bg-payables-500/10 text-payables-500"
    />
  );
}
