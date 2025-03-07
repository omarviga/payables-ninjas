
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

// Inicializamos con un array vacío, sin datos de ejemplo
export const invoices: Invoice[] = [];

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
