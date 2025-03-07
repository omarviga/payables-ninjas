
// Financial chart data
export const financialData = [
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

// Invoice data
export const receivableInvoices = [
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

export const payableInvoices = [
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

// Recent activities data
export const recentActivities = [
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
