
import { memo } from 'react';
import { ContactsSummary } from './ContactsSummary';
import { Contact } from '@/data/contacts';

interface MemoizedContactsSummaryProps {
  contacts: Contact[];
}

export const MemoizedContactsSummary = memo(
  function MemoizedContactsSummary({ contacts }: MemoizedContactsSummaryProps) {
    return <ContactsSummary contacts={contacts} />;
  }
);
