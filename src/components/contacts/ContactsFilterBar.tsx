
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface ContactsFilterBarProps {
  onFilterChange: (filters: {
    search: string;
    type: string;
    status: string;
  }) => void;
}

export const ContactsFilterBar = ({ onFilterChange }: ContactsFilterBarProps) => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({ search: e.target.value, type, status });
  };

  const handleTypeChange = (value: string) => {
    setType(value);
    onFilterChange({ search, type: value, status });
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange({ search, type, status: value });
  };

  const handleReset = () => {
    setSearch('');
    setType('all');
    setStatus('all');
    onFilterChange({ search: '', type: 'all', status: 'all' });
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
        />
      </div>
      <div className="flex flex-1 gap-2 flex-col sm:flex-row">
        <Select value={type} onValueChange={handleTypeChange}>
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
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Activos</SelectItem>
            <SelectItem value="inactive">Inactivos</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" onClick={handleReset} className="min-w-10">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
