
import { AlertTriangle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';

export function OverdueInvoicesCard() {
  return (
    <StatsCard
      title="Facturas Vencidas"
      value="0"
      description="Requieren atención inmediata"
      icon={AlertTriangle}
      trend={0}
      trendLabel="vs. mes anterior"
      iconClassName="bg-warning/10 text-warning"
    />
  );
}
