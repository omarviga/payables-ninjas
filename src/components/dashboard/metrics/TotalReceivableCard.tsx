
import { FileText } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { getAllInvoices } from '@/data/invoices';

export function TotalReceivableCard() {
  // Obtener todas las facturas por cobrar
  const invoices = getAllInvoices();
  const receivableInvoices = invoices.filter(inv => inv.type === 'receivable' && inv.status !== 'paid');
  
  // Calcular el total por cobrar
  const totalReceivable = receivableInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  
  // Formatear el valor para mostrar
  const formattedTotal = `$${totalReceivable.toLocaleString('es-MX')}`;
  
  return (
    <StatsCard
      title="Total por Cobrar"
      value={formattedTotal}
      description="Facturas pendientes de cobro"
      icon={FileText}
      trend={0}
      trendLabel="vs. mes anterior"
      iconClassName="bg-success/10 text-success"
    />
  );
}
