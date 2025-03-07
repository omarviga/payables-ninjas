
import { supabase, getPublicUrl } from './client';
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
  storage_path?: string; // Nuevo campo para la ruta del archivo en Storage
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
    storage_path: invoice.storagePath, // Nuevo campo
    user_id: userId
  };
};

// Convertir de modelo de DB a modelo de app
const toAppModel = (dbInvoice: InvoiceDB): Invoice => {
  const invoice: Invoice = {
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
  
  // Añadir el path de almacenamiento si existe
  if (dbInvoice.storage_path) {
    invoice.storagePath = dbInvoice.storage_path;
    // Obtener la URL pública para el archivo
    invoice.fileUrl = getPublicUrl(dbInvoice.storage_path);
  }
  
  return invoice;
};

// Obtener todas las facturas del usuario actual
export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      console.log("Usuario no autenticado, utilizando modo de demostración");
      return []; // No data will trigger demo mode
    }

    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('user_id', userData.user.id);

    if (error) {
      console.error('Error al obtener facturas:', error);
      return [];
    }

    return data ? (data as InvoiceDB[]).map(toAppModel) : [];
  } catch (error) {
    console.error('Error inesperado al obtener facturas:', error);
    return [];
  }
};

// Añadir facturas a la base de datos
export const addInvoicesToDb = async (invoices: Invoice[]): Promise<Invoice[]> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      console.log("Usuario no autenticado, utilizando modo de demostración");
      return invoices; // En modo demo, solo devolvemos las facturas sin guardarlas
    }

    // Filtrar facturas sin UUID duplicado
    const invoicesToAdd = [];
    for (const invoice of invoices) {
      if (invoice.uuid) {
        // Verificar si ya existe una factura con este UUID
        const { data, error } = await supabase
          .from('invoices')
          .select('id')
          .eq('uuid', invoice.uuid)
          .eq('user_id', userData.user.id)
          .limit(1);
        
        if (error) {
          console.error('Error al verificar UUID duplicado:', error);
          continue;
        }
        
        if (data && data.length > 0) {
          console.log(`Factura con UUID ${invoice.uuid} ya existe, omitiendo`);
          continue;
        }
      }
      
      invoicesToAdd.push(invoice);
    }
    
    if (invoicesToAdd.length === 0) {
      console.log('No hay facturas nuevas para añadir');
      return [];
    }

    // Convertir facturas al formato de la base de datos
    const dbInvoices = invoicesToAdd.map(invoice => toDbModel(invoice, userData.user.id));
    
    // Insertar en la base de datos
    const { data, error } = await supabase
      .from('invoices')
      .insert(dbInvoices)
      .select();

    if (error) {
      console.error('Error al añadir facturas:', error);
      return invoicesToAdd; // Si hay error, devolvemos las facturas originales
    }

    return data ? (data as InvoiceDB[]).map(toAppModel) : invoicesToAdd;
  } catch (error) {
    console.error('Error inesperado al añadir facturas:', error);
    return invoices;
  }
};

// Actualizar una factura existente
export const updateInvoice = async (invoice: Invoice): Promise<boolean> => {
  try {
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) {
      console.log("Usuario no autenticado, utilizando modo de demostración");
      return true; // En modo demo, fingimos que todo fue bien
    }

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

// Descargar el archivo XML de una factura
export const downloadInvoiceFile = async (invoice: Invoice): Promise<string | null> => {
  if (!invoice.storagePath) {
    console.error('La factura no tiene un archivo asociado');
    return null;
  }
  
  return getPublicUrl(invoice.storagePath);
};
