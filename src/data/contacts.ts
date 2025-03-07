
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

// Empty contacts array
export const contacts: Contact[] = [];
