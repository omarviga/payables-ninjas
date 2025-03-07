
import { FileText } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';

export function TotalReceivableCard() {
  return (
    <StatsCard
      title="Total por Cobrar"
      value="$39,500"
      description="Facturas pendientes de cobro"
      icon={FileText}
      trend={4.5}
      trendLabel="vs. mes anterior"
      iconClassName="bg-success/10 text-success"
    />
  );
}
