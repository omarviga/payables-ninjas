
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ArrowDownUp, FileText, TrendingUp, AlertTriangle } from 'lucide-react';

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        title="Total por Cobrar"
        value="$39,500"
        description="Facturas pendientes de cobro"
        icon={FileText}
        trend={4.5}
        trendLabel="vs. mes anterior"
        iconClassName="bg-success/10 text-success"
      />
      <StatsCard
        title="Total por Pagar"
        value="$21,700"
        description="Facturas pendientes de pago"
        icon={FileText}
        trend={-2.3}
        trendLabel="vs. mes anterior"
        iconClassName="bg-danger/10 text-danger"
      />
      <StatsCard
        title="Flujo de Efectivo"
        value="$17,800"
        description="Balance actual"
        icon={ArrowDownUp}
        trend={1.8}
        trendLabel="vs. mes anterior"
        iconClassName="bg-payables-500/10 text-payables-500"
      />
      <StatsCard
        title="Facturas Vencidas"
        value="5"
        description="Requieren atención inmediata"
        icon={AlertTriangle}
        trend={-3}
        trendLabel="vs. mes anterior"
        iconClassName="bg-warning/10 text-warning"
      />
    </div>
  );
}
