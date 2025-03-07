import { StatsCard } from '@/components/dashboard/StatsCard';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { InvoicesSummary } from '@/components/dashboard/InvoicesSummary';
import { FinancialChart } from '@/components/dashboard/FinancialChart';
import { ArrowDownUp, CreditCard, FileText, TrendingUp, AlertTriangle } from 'lucide-react';

// Datos de ejemplo para las gráficas
const financialData = [
  { name: 'Ene', ingresos: 4000, gastos: 2400 },
  { name: 'Feb', ingresos: 3000, gastos: 1398 },
  { name: 'Mar', ingresos: 2000, gastos: 9800 },
  { name: 'Abr', ingresos: 2780, gastos: 3908 },
  { name: 'May', ingresos: 1890, gastos: 4800 },
  { name: 'Jun', ingresos: 2390, gastos: 3800 },
  { name: 'Jul', ingresos: 3490, gastos: 4300 },
  { name: 'Ago', ingresos: 4000, gastos: 2400 },
  { name: 'Sep', ingresos: 3000, gastos: 1398 },
  { name: 'Oct', ingresos: 2000, gastos: 9800 },
  { name: 'Nov', ingresos: 2780, gastos: 3908 },
  { name: 'Dic', ingresos: 1890, gastos: 4800 }
];

// Datos de ejemplo para las facturas
const receivableInvoices = [
  { 
    id: '1', 
    number: 'FAC-2023-001', 
    client: 'Empresa ABC', 
    amount: 15000, 
    date: '2023-01-15', 
    dueDate: '2023-02-15', 
    status: 'paid' as const
  },
  { 
    id: '2', 
    number: 'FAC-2023-002', 
    client: 'Corporativo XYZ', 
    amount: 7500, 
    date: '2023-02-01', 
    dueDate: '2023-03-03', 
    status: 'pending' as const
  },
  { 
    id: '3', 
    number: 'FAC-2023-003', 
    client: 'Servicios Integrales', 
    amount: 12000, 
    date: '2023-02-15', 
    dueDate: '2023-03-17', 
    status: 'pending' as const
  },
  { 
    id: '4', 
    number: 'FAC-2023-004', 
    client: 'Distribuidora Nacional', 
    amount: 5000, 
    date: '2023-01-10', 
    dueDate: '2023-02-09', 
    status: 'overdue' as const
  },
];

const payableInvoices = [
  { 
    id: '1', 
    number: 'PROV-2023-001', 
    client: 'Suministros SA', 
    amount: 8500, 
    date: '2023-01-15', 
    dueDate: '2023-02-14', 
    status: 'paid' as const
  },
  { 
    id: '2', 
    number: 'PROV-2023-002', 
    client: 'Muebles y Equipos', 
    amount: 3700, 
    date: '2023-02-01', 
    dueDate: '2023-03-03', 
    status: 'pending' as const
  },
  { 
    id: '3', 
    number: 'PROV-2023-003', 
    client: 'Servicios Digitales', 
    amount: 6000, 
    date: '2023-02-10', 
    dueDate: '2023-03-12', 
    status: 'pending' as const
  },
  { 
    id: '4', 
    number: 'PROV-2023-004', 
    client: 'Papelería Global', 
    amount: 1500, 
    date: '2023-01-05', 
    dueDate: '2023-02-04', 
    status: 'overdue' as const
  },
];

// Datos de ejemplo para actividades recientes
const recentActivities = [
  {
    id: '1',
    title: 'Factura procesada',
    description: 'La factura FAC-2023-005 ha sido procesada correctamente',
    timestamp: 'Hace 10 minutos',
    status: 'completed' as const,
    user: {
      name: 'Juan Pérez',
      initials: 'JP'
    }
  },
  {
    id: '2',
    title: 'Error en conciliación',
    description: 'No se pudo relacionar el pago de Empresa ABC',
    timestamp: 'Hace 30 minutos',
    status: 'failed' as const,
    user: {
      name: 'María Gómez',
      initials: 'MG'
    }
  },
  {
    id: '3',
    title: 'Pago programado',
    description: 'Pago al proveedor Muebles y Equipos programado',
    timestamp: 'Hace 1 hora',
    status: 'pending' as const,
    user: {
      name: 'Carlos Ruiz',
      initials: 'CR'
    }
  },
  {
    id: '4',
    title: 'Facturas vencidas',
    description: '3 facturas están próximas a vencer',
    timestamp: 'Hace 3 horas',
    status: 'warning' as const,
    user: {
      name: 'Ana López',
      initials: 'AL'
    }
  },
];

const Index = () => {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold font-heading">Dashboard</h1>
      
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FinancialChart data={financialData} />
        </div>
        <div>
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
      
      <div className="mt-4">
        <InvoicesSummary receivable={receivableInvoices} payable={payableInvoices} />
      </div>
    </div>
  );
};

export default Index;
