
import { ArrowDownUp } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { payments } from '@/data/payments';

export function CashFlowCard() {
  // Calcular el balance actual basado en los pagos
  const totalIncoming = payments
    .filter(payment => payment.type === 'incoming')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const totalOutgoing = payments
    .filter(payment => payment.type === 'outgoing')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const balance = totalIncoming - totalOutgoing;
  
  // Formatear el valor para mostrar
  const formattedBalance = `$${balance.toLocaleString('es-MX')}`;
  
  return (
    <StatsCard
      title="Flujo de Efectivo"
      value={formattedBalance}
      description="Balance actual"
      icon={ArrowDownUp}
      trend={0}
      trendLabel="vs. mes anterior"
      iconClassName="bg-payables-500/10 text-payables-500"
    />
  );
}
