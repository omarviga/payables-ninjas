
import { CfdiType } from '@/services/types/cfdiTypes';
import { fetchInvoices, addInvoicesToDb, updateInvoice, deleteInvoice } from '@/services/supabase/invoiceService';

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
  storagePath?: string; // Ruta de almacenamiento del archivo en Supabase
  fileUrl?: string;     // URL pública del archivo
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
      console.log("No se encontraron facturas en Supabase");
      // No utilizamos facturas de ejemplo - inicializamos con array vacío
      invoices = [];
    }
  } catch (error) {
    console.error("Error al inicializar facturas:", error);
    // Inicializamos con array vacío en caso de error
    invoices = [];
  }
};

// Función para agregar nuevas facturas al sistema
export const addInvoices = async (newInvoices: Invoice[]): Promise<Invoice[]> => {
  if (!newInvoices || !Array.isArray(newInvoices) || newInvoices.length === 0) {
    console.warn("Se intentó añadir facturas inválidas:", newInvoices);
    return [];
  }
  
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
    
    if (savedInvoices && savedInvoices.length > 0) {
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
  if (!invoiceId) {
    console.error("Se intentó actualizar una factura sin ID");
    return false;
  }
  
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

// Función para eliminar una factura
export const removeInvoice = async (invoiceId: string): Promise<boolean> => {
  if (!invoiceId) {
    console.error("Se intentó eliminar una factura sin ID");
    return false;
  }
  
  try {
    // Intentar eliminar en Supabase
    const success = await deleteInvoice(invoiceId);
    
    if (success) {
      // Actualizar la caché local
      invoices = invoices.filter(inv => inv.id !== invoiceId);
      console.log("Factura eliminada correctamente:", invoiceId);
      return true;
    } else {
      console.warn("No se pudo eliminar la factura en Supabase");
      return false;
    }
  } catch (error) {
    console.error("Error al eliminar factura:", error);
    return false;
  }
};

// Función para obtener todas las facturas
export const getAllInvoices = (): Invoice[] => {
  console.log("Obteniendo todas las facturas, cantidad:", invoices.length);
  // Aseguramos que siempre devolvemos un array (incluso vacío), nunca undefined
  return Array.isArray(invoices) ? [...invoices] : [];
};
