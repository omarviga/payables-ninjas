
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { AdvancedFilters } from '@/components/reports/InformesAdvancedFilters';

export function useAdvancedFiltersState(
  onAdvancedFiltersChange?: (filters: AdvancedFilters) => void
) {
  const { toast } = useToast();
  const [advancedFiltersOpen, setAdvancedFiltersOpen] = useState(false);
  const [activeAdvancedFilters, setActiveAdvancedFilters] = useState<AdvancedFilters | null>(null);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Default filters
  const defaultFilters: AdvancedFilters = {
    incluirCanceladas: false,
    incluirBorradores: false,
  };

  // Effect to count active advanced filters
  useEffect(() => {
    if (activeAdvancedFilters) {
      let count = 0;
      if (activeAdvancedFilters.montoMin !== undefined) count++;
      if (activeAdvancedFilters.montoMax !== undefined) count++;
      if (activeAdvancedFilters.estado) count++;
      if (activeAdvancedFilters.cliente) count++;
      if (activeAdvancedFilters.categoria && activeAdvancedFilters.categoria.length > 0) count++;
      if (activeAdvancedFilters.incluirCanceladas) count++;
      if (activeAdvancedFilters.incluirBorradores) count++;
      setActiveFiltersCount(count);
    } else {
      setActiveFiltersCount(0);
    }
  }, [activeAdvancedFilters]);

  // Advanced filters change handler
  const handleAdvancedFiltersChange = (filters: AdvancedFilters) => {
    setActiveAdvancedFilters(filters);
    if (onAdvancedFiltersChange) {
      onAdvancedFiltersChange(filters);
    }
  };

  // Clear advanced filters
  const handleClearAdvancedFilters = () => {
    setActiveAdvancedFilters(null);
    setActiveFiltersCount(0);
    if (onAdvancedFiltersChange) {
      onAdvancedFiltersChange(defaultFilters);
    }
    toast({
      title: "Filtros avanzados eliminados",
      description: "Se han eliminado todos los filtros avanzados",
    });
  };

  // Reset advanced filters
  const resetAdvancedFilters = () => {
    setActiveAdvancedFilters(null);
    setActiveFiltersCount(0);
    if (onAdvancedFiltersChange) {
      onAdvancedFiltersChange(defaultFilters);
    }
  };

  return {
    advancedFiltersOpen,
    activeAdvancedFilters,
    activeFiltersCount,
    setAdvancedFiltersOpen,
    handleAdvancedFiltersChange,
    handleClearAdvancedFilters,
    resetAdvancedFilters
  };
}
