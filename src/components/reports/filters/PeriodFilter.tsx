
import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface PeriodFilterProps {
  value: string;
  isLoading?: boolean;
  onChange: (value: string) => void;
}

export function PeriodFilter({ value, isLoading = false, onChange }: PeriodFilterProps) {
  return (
    <div className="w-full sm:w-48">
      <Select 
        value={value} 
        onValueChange={onChange}
        disabled={isLoading}
      >
        <SelectTrigger>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <SelectValue placeholder="Periodo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="week">Esta semana</SelectItem>
          <SelectItem value="month">Este mes</SelectItem>
          <SelectItem value="quarter">Este trimestre</SelectItem>
          <SelectItem value="year">Este año</SelectItem>
          <SelectItem value="custom">Personalizado</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
