
import { memo } from 'react';
import { ContactsTable } from './ContactsTable';
import { Contact } from '@/data/contacts';

interface MemoizedContactsTableProps {
  contacts: Contact[];
}

export const MemoizedContactsTable = memo(
  function MemoizedContactsTable({ contacts }: MemoizedContactsTableProps) {
    return (
      <>
        <ContactsTable contacts={contacts} />
        {contacts.length === 0 && (
          <div className="text-center py-8 border rounded-md bg-muted/20">
            <p className="text-muted-foreground">No se encontraron contactos con los filtros aplicados</p>
          </div>
        )}
      </>
    );
  }
);
