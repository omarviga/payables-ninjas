
import { useState, useEffect } from 'react';
import { ContactsHeader } from '@/components/contacts/ContactsHeader';
import { ContactsFilterBar } from '@/components/contacts/ContactsFilterBar';
import { ContactsTable } from '@/components/contacts/ContactsTable';
import { ContactsSummary } from '@/components/contacts/ContactsSummary';
import { contacts as allContacts } from '@/data/contacts';
import type { Contact } from '@/data/contacts';

const Contactos = () => {
  const [contacts, setContacts] = useState<Contact[]>(allContacts);
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all'
  });

  useEffect(() => {
    // Apply filters
    let filteredContacts = [...allContacts];

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

    setContacts(filteredContacts);
  }, [filters]);

  const handleFilterChange = (newFilters: {
    search: string;
    type: string;
    status: string;
  }) => {
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto py-6 px-4 max-w-7xl">
      <ContactsHeader />
      <ContactsSummary contacts={contacts} />
      <ContactsFilterBar onFilterChange={handleFilterChange} />
      <ContactsTable contacts={contacts} />
    </div>
  );
};

export default Contactos;
