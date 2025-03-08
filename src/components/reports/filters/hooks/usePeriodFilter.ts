
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function usePeriodFilter(
  onPeriodChange?: (period: string) => void
) {
  const { toast } = useToast();
  const [period, setPeriod] = useState('month');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Effect to show/hide the date picker based on period selection
  useEffect(() => {
    setShowDatePicker(period === 'custom');
  }, [period]);

  // Period change handler
  const handlePeriodChange = (value: string) => {
    setPeriod(value);
    if (onPeriodChange) {
      onPeriodChange(value);
    }
  };

  // Reset to default
  const resetPeriod = () => {
    setPeriod('month');
    if (onPeriodChange) {
      onPeriodChange('month');
    }
  };

  // Helper function for descriptive text
  const getPeriodText = (periodValue: string): string => {
    switch (periodValue) {
      case 'week': return 'esta semana';
      case 'month': return 'este mes';
      case 'quarter': return 'este trimestre';
      case 'year': return 'este año';
      case 'custom': return 'periodo personalizado';
      default: return periodValue;
    }
  };

  return {
    period,
    showDatePicker,
    handlePeriodChange,
    resetPeriod,
    getPeriodText
  };
}
