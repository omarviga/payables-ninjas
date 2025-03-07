
import { FileText } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';

export function TotalPayableCard() {
  return (
    <StatsCard
      title="Total por Pagar"
      value="$0"
      description="Facturas pendientes de pago"
      icon={FileText}
      trend={0}
      trendLabel="vs. mes anterior"
      iconClassName="bg-danger/10 text-danger"
    />
  );
}
