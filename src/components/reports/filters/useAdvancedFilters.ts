
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AdvancedFilters } from "@/components/reports/InformesAdvancedFilters";

export function useAdvancedFilters(
  onApplyFilters: (filters: AdvancedFilters) => void
) {
  const { toast } = useToast();
  const [filters, setFilters] = useState<AdvancedFilters>({
    incluirCanceladas: false,
    incluirBorradores: false,
  });

  const handleApplyFilters = (onOpenChange: (open: boolean) => void) => {
    onApplyFilters(filters);
    onOpenChange(false);
    toast({
      title: "Filtros avanzados aplicados",
      description: "Se han aplicado los filtros avanzados a los informes",
    });
  };

  const handleResetFilters = () => {
    setFilters({
      incluirCanceladas: false,
      incluirBorradores: false,
    });
    toast({
      title: "Filtros restablecidos",
      description: "Se han restablecido los filtros avanzados",
    });
  };

  const handleChange = (field: keyof AdvancedFilters, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    filters,
    handleChange,
    handleApplyFilters,
    handleResetFilters
  };
}
