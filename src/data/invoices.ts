
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
}

// Inicialmente vacío, se llenará con los datos cargados desde XML
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
