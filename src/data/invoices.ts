import { CfdiType } from '@/services/types/cfdiTypes';

// Datos para las facturas
export interface Invoice {
  id: string;
  number: string;
  client: string;
  amount: number;
  date: string;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  type: "receivable" | "payable";
  cfdiType?: CfdiType;  // Tipo de CFDI según clasificación SAT
  uuid?: string;        // UUID único del CFDI
  relatedDocuments?: string[];  // Documentos relacionados (UUID)
}

// Facturas de ejemplo para pruebas
let invoices: Invoice[] = [
  {
    id: 'inv-001',
    number: 'A-001',
    client: 'Distribuidora Nacional S.A.',
    amount: 12500,
    date: '15/05/2023',
    dueDate: '15/06/2023',
    status: 'paid',
    type: 'receivable',
    cfdiType: CfdiType.INGRESO,
    uuid: 'UUID-001-1234567890',
    relatedDocuments: []
  },
  {
    id: 'inv-002',
    number: 'A-002',
    client: 'Cliente Nuevo S.A.',
    amount: 8500,
    date: '20/05/2023',
    dueDate: '20/06/2023',
    status: 'pending',
    type: 'receivable',
    cfdiType: CfdiType.INGRESO,
    uuid: 'UUID-002-0987654321',
    relatedDocuments: []
  },
  {
    id: 'prov-001',
    number: 'B-001',
    client: 'Suministros Industriales',
    amount: 9750,
    date: '10/05/2023',
    dueDate: '10/06/2023',
    status: 'pending',
    type: 'payable',
    cfdiType: CfdiType.INGRESO,
    uuid: 'UUID-003-5678901234',
    relatedDocuments: []
  },
  {
    id: 'prov-002',
    number: 'B-002',
    client: 'Proveedor de Servicios',
    amount: 5000,
    date: '05/05/2023',
    dueDate: '05/06/2023',
    status: 'overdue',
    type: 'payable',
    cfdiType: CfdiType.INGRESO,
    uuid: 'UUID-004-2345678901',
    relatedDocuments: []
  }
];

// Función para agregar nuevas facturas al sistema
export const addInvoices = (newInvoices: Invoice[]): Invoice[] => {
  console.log("Agregando nuevas facturas al sistema:", newInvoices.length);
  
  // Agregar IDs únicos si no los tienen
  const invoicesWithIds = newInvoices.map((invoice, index) => {
    if (!invoice.id) {
      return { ...invoice, id: `xml-${Date.now()}-${index}` };
    }
    return invoice;
  });
  
  // Actualizar el array de facturas
  invoices = [...invoices, ...invoicesWithIds];
  console.log("Total de facturas en el sistema:", invoices.length);
  
  return invoicesWithIds;
};

// Función para obtener todas las facturas
export const getAllInvoices = (): Invoice[] => {
  console.log("Obteniendo todas las facturas, cantidad:", invoices.length);
  return [...invoices];
};
