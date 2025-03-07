
import { CfdiType } from '@/services/types/cfdiTypes';
import { fetchInvoices, addInvoicesToDb, updateInvoice } from '@/services/supabase/invoiceService';

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

// Caché local de facturas (para rendimiento y funcionamiento offline)
let invoices: Invoice[] = [];

// Inicializar las facturas desde Supabase o desde datos de ejemplo
export const initInvoices = async (): Promise<void> => {
  try {
    console.log("Intentando cargar facturas desde Supabase...");
    const dbInvoices = await fetchInvoices();
    
    if (dbInvoices && dbInvoices.length > 0) {
      invoices = dbInvoices;
      console.log("Facturas cargadas desde Supabase:", invoices.length);
    } else {
      console.log("No se encontraron facturas en Supabase, usando datos de ejemplo");
      // Si no hay facturas en la caché local o Supabase, usar datos de ejemplo
      if (invoices.length === 0) {
        invoices = getExampleInvoices();
        console.log("Facturas de ejemplo cargadas:", invoices.length);
      }
    }
  } catch (error) {
    console.error("Error al inicializar facturas:", error);
    // Usar facturas de ejemplo en caso de error
    if (invoices.length === 0) {
      invoices = getExampleInvoices();
      console.log("Error al cargar desde Supabase, usando datos de ejemplo:", invoices.length);
    }
  }
};

// Función para obtener facturas de ejemplo (para testing y demo)
const getExampleInvoices = (): Invoice[] => {
  return [
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
};

// Función para agregar nuevas facturas al sistema
export const addInvoices = async (newInvoices: Invoice[]): Promise<Invoice[]> => {
  console.log("Agregando nuevas facturas al sistema:", newInvoices.length);
  
  // Agregar IDs únicos si no los tienen
  const invoicesWithIds = newInvoices.map((invoice, index) => {
    if (!invoice.id) {
      return { ...invoice, id: `xml-${Date.now()}-${index}` };
    }
    return invoice;
  });
  
  try {
    // Guardar en Supabase
    const savedInvoices = await addInvoicesToDb(invoicesWithIds);
    
    if (savedInvoices.length > 0) {
      // Actualizar la caché local
      invoices = [...invoices, ...savedInvoices];
      console.log("Facturas guardadas en Supabase:", savedInvoices.length);
      return savedInvoices;
    } else {
      // Si falló la escritura en Supabase, actualizar solo la caché local
      invoices = [...invoices, ...invoicesWithIds];
      console.warn("No se pudieron guardar las facturas en Supabase, solo se actualizó la caché local");
      return invoicesWithIds;
    }
  } catch (error) {
    console.error("Error al guardar facturas en Supabase:", error);
    // Actualizar solo la caché local en caso de error
    invoices = [...invoices, ...invoicesWithIds];
    return invoicesWithIds;
  }
};

// Función para actualizar una factura
export const updateInvoiceStatus = async (invoiceId: string, status: "paid" | "pending" | "overdue"): Promise<boolean> => {
  // Buscar la factura en la caché local
  const invoice = invoices.find(inv => inv.id === invoiceId);
  if (!invoice) {
    console.error("Factura no encontrada:", invoiceId);
    return false;
  }
  
  // Actualizar el estado de la factura
  const updatedInvoice = { ...invoice, status };
  
  try {
    // Intentar actualizar en Supabase
    const success = await updateInvoice(updatedInvoice);
    
    if (success) {
      // Actualizar la caché local
      invoices = invoices.map(inv => inv.id === invoiceId ? updatedInvoice : inv);
      console.log("Factura actualizada correctamente en Supabase:", invoiceId);
      return true;
    } else {
      // Si falló la actualización en Supabase, actualizar solo la caché local
      invoices = invoices.map(inv => inv.id === invoiceId ? updatedInvoice : inv);
      console.warn("No se pudo actualizar la factura en Supabase, solo se actualizó la caché local");
      return true;
    }
  } catch (error) {
    console.error("Error al actualizar factura en Supabase:", error);
    // Actualizar solo la caché local en caso de error
    invoices = invoices.map(inv => inv.id === invoiceId ? updatedInvoice : inv);
    return true;
  }
};

// Función para obtener todas las facturas
export const getAllInvoices = (): Invoice[] => {
  console.log("Obteniendo todas las facturas, cantidad:", invoices.length);
  // Aseguramos que siempre devolvemos un array (incluso vacío), nunca undefined
  return Array.isArray(invoices) ? [...invoices] : [];
};
