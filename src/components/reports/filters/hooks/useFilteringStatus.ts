
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useFilteringStatus() {
  const { toast } = useToast();
  const [isFiltering, setIsFiltering] = useState(false);

  // Start filtering status
  const startFiltering = () => {
    setIsFiltering(true);
  };

  // Display toast notification for applied filters
  const notifyFilterApplied = (periodText: string, invoiceTypeText: string) => {
    toast({
      title: "Filtro aplicado",
      description: `Mostrando datos del ${periodText} y facturas ${invoiceTypeText}`,
    });
  };

  // Effect to handle filtering state and toast notifications
  useEffect(() => {
    if (isFiltering) {
      const timer = setTimeout(() => {
        setIsFiltering(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isFiltering]);

  return {
    isFiltering,
    startFiltering,
    notifyFilterApplied
  };
}
