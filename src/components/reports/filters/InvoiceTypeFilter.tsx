
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface InvoiceTypeFilterProps {
  value: string;
  isLoading?: boolean;
  onChange: (value: string) => void;
}

export function InvoiceTypeFilter({ value, isLoading = false, onChange }: InvoiceTypeFilterProps) {
  return (
    <div className="w-full sm:w-48">
      <Select 
        value={value} 
        onValueChange={onChange}
        disabled={isLoading}
      >
        <SelectTrigger>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <SelectValue placeholder="Tipo de factura" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas</SelectItem>
          <SelectItem value="receivable">Por cobrar</SelectItem>
          <SelectItem value="payable">Por pagar</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
