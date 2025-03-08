
import { useState, useMemo, useCallback } from 'react';
import { ContactsHeader } from '@/components/contacts/ContactsHeader';
import { ContactsFilterBar } from '@/components/contacts/ContactsFilterBar';
import { MemoizedContactsTable } from '@/components/contacts/MemoizedContactsTable';
import { MemoizedContactsSummary } from '@/components/contacts/MemoizedContactsSummary';
import { Spinner } from '@/components/ui/spinner';
import { contacts as allContacts } from '@/data/contacts';
import { filterContacts } from '@/utils/contactsFilters';

const Contactos = () => {
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all'
  });
  const [isFiltering, setIsFiltering] = useState(false);

  // Use useMemo instead of useEffect for filtering
  const filteredContacts = useMemo(() => {
    return filterContacts(allContacts, filters);
  }, [filters]);

  const handleFilterChange = useCallback(async (newFilters: {
    search: string;
    type: string;
    status: string;
  }) => {
    setIsFiltering(true);
    setFilters(newFilters);
    // Simulate async filtering with a small delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    setIsFiltering(false);
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full">
      <ContactsHeader />
      <MemoizedContactsSummary contacts={filteredContacts} />
      <ContactsFilterBar onFilterChange={handleFilterChange} disabled={isFiltering} />
      
      {isFiltering ? (
        <div className="flex justify-center my-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <MemoizedContactsTable contacts={filteredContacts} />
      )}
    </div>
  );
};

export default Contactos;
