
import { AlertTriangle } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { getAllInvoices } from '@/data/invoices';

export function OverdueInvoicesCard() {
  // Obtener todas las facturas vencidas
  const invoices = getAllInvoices();
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');
  
  // Obtener la cantidad de facturas vencidas
  const overdueCount = overdueInvoices.length;
  
  return (
    <StatsCard
      title="Facturas Vencidas"
      value={overdueCount.toString()}
      description="Requieren atención inmediata"
      icon={AlertTriangle}
      trend={0}
      trendLabel="vs. mes anterior"
      iconClassName="bg-warning/10 text-warning"
    />
  );
}
