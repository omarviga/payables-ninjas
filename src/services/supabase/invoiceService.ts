
import { supabase } from './client';
import type { Invoice } from '@/data/invoices';
import { CfdiType } from '@/services/types/cfdiTypes';

// Tipo para la factura en la base de datos (nombres de campos en snake_case)
interface InvoiceDB {
  id: string;
  number: string;
  client: string;
  amount: number;
  date: string;
  due_date: string;
  status: "paid" | "pending" | "overdue";
  type: "receivable" | "payable";
  cfdi_type?: string;
  uuid?: string;
  related_documents?: string[];
  user_id: string;
  created_at?: string;
}

// Convertir de modelo de app a modelo de DB
const toDbModel = (invoice: Invoice, userId: string): InvoiceDB => {
  return {
    id: invoice.id,
    number: invoice.number,
    client: invoice.client,
    amount: invoice.amount,
    date: invoice.date,
    due_date: invoice.dueDate,
    status: invoice.status,
    type: invoice.type,
    cfdi_type: invoice.cfdiType,
    uuid: invoice.uuid,
    related_documents: invoice.relatedDocuments,
    user_id: userId
  };
};

// Convertir de modelo de DB a modelo de app
const toAppModel = (dbInvoice: InvoiceDB): Invoice => {
  return {
    id: dbInvoice.id,
    number: dbInvoice.number,
    client: dbInvoice.client,
    amount: dbInvoice.amount,
    date: dbInvoice.date,
    dueDate: dbInvoice.due_date,
    status: dbInvoice.status,
    type: dbInvoice.type,
    cfdiType: dbInvoice.cfdi_type as CfdiType,
    uuid: dbInvoice.uuid,
    relatedDocuments: dbInvoice.related_documents
  };
};

// Obtener todas las facturas del usuario actual
export const fetchInvoices = async (): Promise<Invoice[]> => {
  const user = supabase.auth.getUser();
  if (!user) {
    console.error("Usuario no autenticado");
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('invoices')
      .select('*');

    if (error) {
      console.error('Error al obtener facturas:', error);
      return [];
    }

    return (data as InvoiceDB[]).map(toAppModel);
  } catch (error) {
    console.error('Error inesperado al obtener facturas:', error);
    return [];
  }
};

// Añadir facturas a la base de datos
export const addInvoicesToDb = async (invoices: Invoice[]): Promise<Invoice[]> => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    console.error("Usuario no autenticado");
    return [];
  }

  try {
    // Convertir facturas al formato de la base de datos
    const dbInvoices = invoices.map(invoice => toDbModel(invoice, userData.user.id));
    
    // Insertar en la base de datos
    const { data, error } = await supabase
      .from('invoices')
      .insert(dbInvoices)
      .select();

    if (error) {
      console.error('Error al añadir facturas:', error);
      return [];
    }

    return (data as InvoiceDB[]).map(toAppModel);
  } catch (error) {
    console.error('Error inesperado al añadir facturas:', error);
    return [];
  }
};

// Actualizar una factura existente
export const updateInvoice = async (invoice: Invoice): Promise<boolean> => {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData?.user) {
    console.error("Usuario no autenticado");
    return false;
  }

  try {
    const dbInvoice = toDbModel(invoice, userData.user.id);
    const { error } = await supabase
      .from('invoices')
      .update(dbInvoice)
      .eq('id', invoice.id);

    if (error) {
      console.error('Error al actualizar factura:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error inesperado al actualizar factura:', error);
    return false;
  }
};
