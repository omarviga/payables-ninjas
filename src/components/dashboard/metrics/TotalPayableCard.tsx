
import { FileText } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { getAllInvoices } from '@/data/invoices';

export function TotalPayableCard() {
  // Obtener todas las facturas por pagar
  const invoices = getAllInvoices();
  const payableInvoices = invoices.filter(inv => inv.type === 'payable' && inv.status !== 'paid');
  
  // Calcular el total por pagar
  const totalPayable = payableInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  
  // Formatear el valor para mostrar
  const formattedTotal = `$${totalPayable.toLocaleString('es-MX')}`;
  
  return (
    <StatsCard
      title="Total por Pagar"
      value={formattedTotal}
      description="Facturas pendientes de pago"
      icon={FileText}
      trend={0}
      trendLabel="vs. mes anterior"
      iconClassName="bg-danger/10 text-danger"
    />
  );
}
