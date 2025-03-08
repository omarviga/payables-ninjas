
import { Contact } from '@/data/contacts';

interface ContactFilters {
  search: string;
  type: string;
  status: string;
}

export const filterContacts = (contacts: Contact[], filters: ContactFilters): Contact[] => {
  try {
    let filteredContacts = [...contacts];

    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredContacts = filteredContacts.filter(
        contact =>
          contact.name.toLowerCase().includes(searchTerm) ||
          contact.company.toLowerCase().includes(searchTerm) ||
          contact.email.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by type
    if (filters.type !== 'all') {
      filteredContacts = filteredContacts.filter(
        contact => contact.type === filters.type
      );
    }

    // Filter by status
    if (filters.status !== 'all') {
      filteredContacts = filteredContacts.filter(
        contact => contact.status === filters.status
      );
    }

    return filteredContacts;
  } catch (error) {
    console.error("Error filtering contacts:", error);
    // Return original contacts if filtering fails
    return contacts;
  }
};
