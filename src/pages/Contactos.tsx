
import { useState, useMemo, useCallback } from 'react';
import { ContactsHeader } from '@/components/contacts/ContactsHeader';
import { ContactsFilterBar } from '@/components/contacts/ContactsFilterBar';
import { MemoizedContactsTable } from '@/components/contacts/MemoizedContactsTable';
import { MemoizedContactsSummary } from '@/components/contacts/MemoizedContactsSummary';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { contacts as allContacts } from '@/data/contacts';
import { filterContacts } from '@/utils/contactsFilters';
import { useToast } from '@/hooks/use-toast';

const Contactos = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    status: 'all'
  });
  const [isFiltering, setIsFiltering] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Use useMemo instead of useEffect for filtering
  const filteredContacts = useMemo(() => {
    return filterContacts(allContacts, filters);
  }, [filters]);

  // Calculate paginated contacts
  const paginatedContacts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredContacts.slice(start, end);
  }, [filteredContacts, page, itemsPerPage]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setPage(1);
  }, [filters]);

  const handleFilterChange = useCallback(async (newFilters: {
    search: string;
    type: string;
    status: string;
  }) => {
    setIsFiltering(true);
    setError(null);
    
    try {
      setFilters(newFilters);
      // Simulate async filtering with a small delay
      await new Promise((resolve) => setTimeout(resolve, 300));
    } catch (err) {
      setError("Ocurrió un error al aplicar los filtros. Inténtalo de nuevo.");
      toast({
        title: "Error",
        description: "No se pudieron aplicar los filtros correctamente.",
        variant: "destructive",
      });
    } finally {
      setIsFiltering(false);
    }
  }, [toast]);

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <ContactsHeader />
      <MemoizedContactsSummary contacts={filteredContacts} />
      <ContactsFilterBar onFilterChange={handleFilterChange} disabled={isFiltering} />
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-4 my-4">
          {error}
        </div>
      )}
      
      {isFiltering ? (
        <div className="flex justify-center my-12">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <MemoizedContactsTable contacts={paginatedContacts} />
          
          {filteredContacts.length > itemsPerPage && (
            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-muted-foreground">
                Mostrando {Math.min(filteredContacts.length, (page - 1) * itemsPerPage + 1)}-
                {Math.min(page * itemsPerPage, filteredContacts.length)} de {filteredContacts.length} contactos
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrevPage} 
                  disabled={page === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleNextPage} 
                  disabled={page >= totalPages}
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Contactos;
