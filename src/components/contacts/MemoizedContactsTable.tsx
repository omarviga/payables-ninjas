
import { memo } from 'react';
import { ContactsTable } from './ContactsTable';
import { Contact } from '@/data/contacts';

interface MemoizedContactsTableProps {
  contacts: Contact[];
}

export const MemoizedContactsTable = memo(
  function MemoizedContactsTable({ contacts }: MemoizedContactsTableProps) {
    return <ContactsTable contacts={contacts} />;
  }
);
