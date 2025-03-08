
export interface Contact {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  type: 'client' | 'supplier' | 'employee' | 'other';
  status: 'active' | 'inactive';
  notes?: string;
  createdAt: string;
}

// Contactos de ejemplo para pruebas
export const contacts: Contact[] = [
  {
    id: '1',
    name: 'María Rodríguez',
    company: 'Distribuidora Nacional S.A.',
    email: 'maria@distribuidora.com',
    phone: '555-123-4567',
    type: 'client',
    status: 'active',
    notes: 'Cliente frecuente desde 2020',
    createdAt: '2020-03-15T10:30:00'
  },
  {
    id: '2',
    name: 'Carlos López',
    company: 'Suministros Industriales',
    email: 'carlos@suministros.com',
    phone: '555-987-6543',
    type: 'supplier',
    status: 'active',
    notes: 'Proveedor principal de materiales',
    createdAt: '2021-05-20T14:45:00'
  },
  {
    id: '3',
    name: 'Ana Martínez',
    company: 'Empresa ABC',
    email: 'ana@empresaabc.com',
    phone: '555-456-7890',
    type: 'employee',
    status: 'active',
    createdAt: '2022-01-10T09:15:00'
  }
];

/**
 * Función para obtener todos los contactos
 * @returns Array de contactos
 */
export const getAllContacts = (): Contact[] => {
  // En un caso real, esto podría hacer una llamada a una API
  // Por ahora, simplemente devolvemos los contactos de ejemplo
  return contacts;
};
