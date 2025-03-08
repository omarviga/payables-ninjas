
import { Contact } from '@/data/contacts';

export interface ContactFilters {
  search: string;
  type: string;
  status: string;
}

export const filterContacts = (contacts: Contact[], filters: ContactFilters): Contact[] => {
  if (!contacts || !Array.isArray(contacts)) {
    console.error('filterContacts recibió un valor no válido para contacts:', contacts);
    return [];
  }

  const { search, type, status } = filters;
  
  return contacts.filter(contact => {
    // Filter by search term
    const matchesSearch = !search || 
      contact.name.toLowerCase().includes(search.toLowerCase()) || 
      contact.company.toLowerCase().includes(search.toLowerCase()) || 
      contact.email.toLowerCase().includes(search.toLowerCase());
    
    // Filter by type
    const matchesType = !type || contact.type === type;
    
    // Filter by status
    const matchesStatus = !status || contact.status === status;
    
    return matchesSearch && matchesType && matchesStatus;
  });
};
