
import { CfdiType } from '@/services/invoiceProcessor';

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

// Inicialmente tendremos algunos datos de ejemplo para que la interfaz no esté vacía
export const invoices: Invoice[] = [
  {
    id: "example-1",
    number: "FACT-2023-001",
    client: "Empresa Ejemplo S.A. de C.V.",
    amount: 12500,
    date: "01/05/2023",
    dueDate: "31/05/2023",
    status: "paid",
    type: "receivable",
    cfdiType: CfdiType.INGRESO,
    uuid: "a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6",
    relatedDocuments: []
  },
  {
    id: "example-2",
    number: "FACT-2023-002",
    client: "Distribuidora Nacional S.A.",
    amount: 8750,
    date: "15/05/2023",
    dueDate: "15/06/2023",
    status: "pending",
    type: "receivable",
    cfdiType: CfdiType.INGRESO,
    uuid: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
    relatedDocuments: []
  },
  {
    id: "example-3",
    number: "PROV-2023-001",
    client: "Proveedores Unidos S.A.",
    amount: 15200,
    date: "10/05/2023",
    dueDate: "10/06/2023",
    status: "pending",
    type: "payable",
    cfdiType: CfdiType.INGRESO,
    uuid: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
    relatedDocuments: []
  },
  {
    id: "example-4",
    number: "PROV-2023-002",
    client: "Suministros Industriales S.A.",
    amount: 6500,
    date: "20/05/2023",
    dueDate: "20/05/2023",
    status: "overdue",
    type: "payable",
    cfdiType: CfdiType.INGRESO,
    uuid: "d4e5f6g7-h8i9-j0k1-l2m3-n4o5p6q7r8s9",
    relatedDocuments: []
  },
  {
    id: "example-5",
    number: "PAG-2023-001",
    client: "Empresa Ejemplo S.A. de C.V.",
    amount: 5000,
    date: "25/05/2023",
    dueDate: "25/05/2023",
    status: "paid",
    type: "receivable",
    cfdiType: CfdiType.PAGO,
    uuid: "e5f6g7h8-i9j0-k1l2-m3n4-o5p6q7r8s9t0",
    relatedDocuments: ["a1b2c3d4-e5f6-g7h8-i9j0-k1l2m3n4o5p6"]
  }
];

// Función para agregar nuevas facturas al sistema
export const addInvoices = (newInvoices: Invoice[]) => {
  // Agregar IDs únicos si no los tienen
  const invoicesWithIds = newInvoices.map((invoice, index) => {
    if (!invoice.id) {
      return { ...invoice, id: `xml-${Date.now()}-${index}` };
    }
    return invoice;
  });
  
  // Actualizar el array de facturas
  invoices.push(...invoicesWithIds);
  
  return invoicesWithIds;
};

// Función para obtener todas las facturas
export const getAllInvoices = (): Invoice[] => {
  return [...invoices];
};
