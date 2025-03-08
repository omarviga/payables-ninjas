
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Spinner } from '@/components/ui/spinner';

interface ContactsFilterBarProps {
  onFilterChange: (filters: {
    search: string;
    type: string;
    status: string;
  }) => void;
  disabled?: boolean;
}

export const ContactsFilterBar = ({ onFilterChange, disabled = false }: ContactsFilterBarProps) => {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleTypeChange = (value: string) => {
    setType(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const handleFilter = () => {
    onFilterChange({ search, type, status });
    
    toast({
      title: "Filtros aplicados",
      description: `Búsqueda: "${search || 'Todos'}", Tipo: ${type}, Estado: ${status}`,
    });
  };

  const handleReset = () => {
    setSearch('');
    setType('all');
    setStatus('all');
    onFilterChange({ search: '', type: 'all', status: 'all' });
    
    toast({
      title: "Filtros restablecidos",
      description: "Se han eliminado todos los filtros aplicados.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 mt-6 items-end">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar contactos..."
          className="pl-9"
          value={search}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}
          disabled={disabled}
        />
      </div>
      <div className="flex flex-1 gap-2 flex-col sm:flex-row">
        <Select value={type} onValueChange={handleTypeChange} disabled={disabled}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Tipo de contacto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="client">Clientes</SelectItem>
            <SelectItem value="supplier">Proveedores</SelectItem>
            <SelectItem value="employee">Empleados</SelectItem>
            <SelectItem value="other">Otros</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={handleStatusChange} disabled={disabled}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="inactive">Inactivos</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="icon" 
            className="min-w-10"
            onClick={handleFilter}
            disabled={disabled}
          >
            {disabled ? <Spinner size="sm" /> : <Filter className="h-4 w-4" />}
          </Button>
          <Button 
            variant="secondary"
            size="default"
            onClick={handleReset}
            disabled={disabled}
          >
            Restablecer
          </Button>
        </div>
      </div>
    </div>
  );
};
