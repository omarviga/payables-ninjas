
// Datos de ejemplo para las facturas
export interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  type: "receivable" | "payable";
}

export const invoices: Invoice[] = [
  { 
    id: '1', 
    number: 'FAC-2023-001', 
    client: 'Empresa ABC', 
    amount: 15000, 
    date: '15/01/2023', 
    dueDate: '15/02/2023', 
    status: 'paid',
    type: 'receivable'
  },
  { 
    id: '2', 
    number: 'FAC-2023-002', 
    client: 'Corporativo XYZ', 
    amount: 7500, 
    date: '01/02/2023', 
    dueDate: '03/03/2023', 
    status: 'pending',
    type: 'receivable'
  },
  { 
    id: '3', 
    number: 'FAC-2023-003', 
    client: 'Servicios Integrales', 
    amount: 12000, 
    date: '15/02/2023', 
    dueDate: '17/03/2023', 
    status: 'pending',
    type: 'receivable'
  },
  { 
    id: '4', 
    number: 'FAC-2023-004', 
    client: 'Distribuidora Nacional', 
    amount: 5000, 
    date: '10/01/2023', 
    dueDate: '09/02/2023', 
    status: 'overdue',
    type: 'receivable'
  },
  { 
    id: '5', 
    number: 'PROV-2023-001', 
    client: 'Suministros SA', 
    amount: 8500, 
    date: '15/01/2023', 
    dueDate: '14/02/2023', 
    status: 'paid',
    type: 'payable'
  },
  { 
    id: '6', 
    number: 'PROV-2023-002', 
    client: 'Muebles y Equipos', 
    amount: 3700, 
    date: '01/02/2023', 
    dueDate: '03/03/2023', 
    status: 'pending',
    type: 'payable'
  },
  { 
    id: '7', 
    number: 'PROV-2023-003', 
    client: 'Servicios Digitales', 
    amount: 6000, 
    date: '10/02/2023', 
    dueDate: '12/03/2023', 
    status: 'pending',
    type: 'payable'
  },
  { 
    id: '8', 
    number: 'PROV-2023-004', 
    client: 'Papelería Global', 
    amount: 1500, 
    date: '05/01/2023', 
    dueDate: '04/02/2023', 
    status: 'overdue',
    type: 'payable'
  },
];
