
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DateRange } from 'react-day-picker';
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Search } from "lucide-react";

interface TransactionFiltersProps {
  filters: {
    dateRange: DateRange | undefined;
    type: string;
    status: string;
    minAmount: string;
    maxAmount: string;
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    dateRange: DateRange | undefined;
    type: string;
    status: string;
    minAmount: string;
    maxAmount: string;
  }>>;
}

export function TransactionFilters({ filters, setFilters }: TransactionFiltersProps) {
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setFilters(prev => ({ ...prev, dateRange: range }));
  };

  const handleTypeChange = (value: string) => {
    setFilters(prev => ({ ...prev, type: value }));
  };

  const handleStatusChange = (value: string) => {
    setFilters(prev => ({ ...prev, status: value }));
  };

  const handleMinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, minAmount: e.target.value }));
  };

  const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, maxAmount: e.target.value }));
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date-range">Rango de Fechas</Label>
            <DateRangePicker
              initialDateRange={filters.dateRange}
              onChange={handleDateRangeChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select value={filters.type} onValueChange={handleTypeChange}>
              <SelectTrigger id="type">
                <SelectValue placeholder="Seleccionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="receivable">Por cobrar</SelectItem>
                <SelectItem value="payable">Por pagar</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Estado</Label>
            <Select value={filters.status} onValueChange={handleStatusChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder="Seleccionar estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="paid">Pagado</SelectItem>
                <SelectItem value="pending">Pendiente</SelectItem>
                <SelectItem value="overdue">Vencido</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="min-amount">Monto Mínimo</Label>
            <Input
              id="min-amount"
              type="number"
              placeholder="$ Mínimo"
              value={filters.minAmount}
              onChange={handleMinAmountChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="max-amount">Monto Máximo</Label>
            <Input
              id="max-amount"
              type="number"
              placeholder="$ Máximo"
              value={filters.maxAmount}
              onChange={handleMaxAmountChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
