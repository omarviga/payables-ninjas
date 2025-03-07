
// Define proper Activity type with the correct status union type
type ActivityStatus = "completed" | "failed" | "pending" | "warning";

// Financial chart data - empty data
export const financialData = [
  { name: 'Ene', ingresos: 15000, gastos: 8000 },
  { name: 'Feb', ingresos: 12000, gastos: 9000 },
  { name: 'Mar', ingresos: 18000, gastos: 10000 },
  { name: 'Abr', ingresos: 16000, gastos: 8500 },
  { name: 'May', ingresos: 17500, gastos: 9200 },
  { name: 'Jun', ingresos: 19000, gastos: 11000 },
  { name: 'Jul', ingresos: 20000, gastos: 12000 },
  { name: 'Ago', ingresos: 18500, gastos: 10500 },
  { name: 'Sep', ingresos: 21000, gastos: 11500 },
  { name: 'Oct', ingresos: 22000, gastos: 12500 },
  { name: 'Nov', ingresos: 24000, gastos: 13000 },
  { name: 'Dic', ingresos: 26000, gastos: 14000 }
];

// Recent activities for dashboard - with correct status types
export const recentActivities = [
  {
    id: '1',
    title: 'Factura creada',
    description: 'Factura #A-001 para Distribuidora Nacional',
    timestamp: '2023-06-15T10:30:00',
    status: 'completed' as ActivityStatus,
    user: {
      name: 'María Rodríguez',
      initials: 'MR'
    }
  },
  {
    id: '2',
    title: 'Pago recibido',
    description: '$12,500 de Distribuidora Nacional',
    timestamp: '2023-06-15T14:45:00',
    status: 'completed' as ActivityStatus,
    user: {
      name: 'Carlos López',
      initials: 'CL'
    }
  },
  {
    id: '3',
    title: 'Factura pendiente',
    description: 'Factura #B-002 vence en 3 días',
    timestamp: '2023-06-16T09:15:00',
    status: 'warning' as ActivityStatus,
    user: {
      name: 'Ana Martínez',
      initials: 'AM'
    }
  }
];
