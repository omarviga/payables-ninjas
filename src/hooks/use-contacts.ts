
import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getAllContacts } from '@/data/contacts';
import { filterContacts } from '@/utils/contactsFilters';
import type { Contact } from '@/data/contacts';

interface ContactFilters {
  search: string;
  type: string;
  status: string;
}

export function useContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // For now, we're using the mock data function
      // This could be replaced with an API call in the future
      const allContacts = getAllContacts();
      setContacts(allContacts);
      setFilteredContacts(allContacts);
    } catch (err) {
      console.error("Error loading contacts:", err);
      setError("Error al cargar los contactos. Por favor, inténtalo de nuevo.");
      toast({
        title: "Error",
        description: "No se pudieron cargar los contactos.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const applyFilters = useCallback((filters: ContactFilters) => {
    setIsLoading(true);
    try {
      const filtered = filterContacts(contacts, filters);
      setFilteredContacts(filtered);
      
      return {
        filteredCount: filtered.length,
        success: true
      };
    } catch (err) {
      console.error("Error filtering contacts:", err);
      toast({
        title: "Error",
        description: "Ocurrió un error al filtrar los contactos.",
        variant: "destructive"
      });
      return {
        filteredCount: 0,
        success: false,
        error: "Error al filtrar contactos"
      };
    } finally {
      setIsLoading(false);
    }
  }, [contacts, toast]);

  const addContact = useCallback((contact: Contact) => {
    // This would typically call an API to create a contact
    // For now, we'll just add it to our local state
    setContacts(prev => [...prev, contact]);
    setFilteredContacts(prev => [...prev, contact]);
    toast({
      title: "Contacto añadido",
      description: `${contact.name} ha sido añadido correctamente.`
    });
    return { success: true };
  }, [toast]);

  const updateContact = useCallback((id: string, updatedData: Partial<Contact>) => {
    // This would typically call an API to update a contact
    setContacts(prev => 
      prev.map(contact => 
        contact.id === id ? { ...contact, ...updatedData } : contact
      )
    );
    setFilteredContacts(prev => 
      prev.map(contact => 
        contact.id === id ? { ...contact, ...updatedData } : contact
      )
    );
    toast({
      title: "Contacto actualizado",
      description: "Los datos del contacto han sido actualizados."
    });
    return { success: true };
  }, [toast]);

  const deleteContact = useCallback((id: string) => {
    // This would typically call an API to delete a contact
    setContacts(prev => prev.filter(contact => contact.id !== id));
    setFilteredContacts(prev => prev.filter(contact => contact.id !== id));
    toast({
      title: "Contacto eliminado",
      description: "El contacto ha sido eliminado correctamente."
    });
    return { success: true };
  }, [toast]);

  return {
    contacts: filteredContacts,
    isLoading,
    error,
    loadContacts,
    applyFilters,
    addContact,
    updateContact,
    deleteContact
  };
}
