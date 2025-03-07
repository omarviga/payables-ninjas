
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Eye, 
  Edit, 
  Trash2, 
  Building, 
  Mail, 
  Phone, 
  User, 
  Briefcase, 
  ShoppingCart
} from 'lucide-react';
import { Contact } from '@/data/contacts';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { es } from 'date-fns/locale';

interface ContactsTableProps {
  contacts: Contact[];
}

export const ContactsTable = ({ contacts }: ContactsTableProps) => {
  const getTypeIcon = (type: Contact['type']) => {
    switch (type) {
      case 'client':
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case 'supplier':
        return <Briefcase className="h-4 w-4 text-amber-500" />;
      case 'employee':
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeName = (type: Contact['type']) => {
    switch (type) {
      case 'client':
        return 'Cliente';
      case 'supplier':
        return 'Proveedor';
      case 'employee':
        return 'Empleado';
      default:
        return 'Otro';
    }
  };

  const getStatusBadge = (status: Contact['status']) => {
    return status === 'active' ? (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Activo</Badge>
    ) : (
      <Badge variant="outline" className="bg-gray-100 text-gray-800 hover:bg-gray-100">Inactivo</Badge>
    );
  };

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead className="hidden md:table-cell">Empresa</TableHead>
            <TableHead className="hidden md:table-cell">Contacto</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="hidden md:table-cell">Creado</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contacts.map((contact) => (
            <TableRow key={contact.id}>
              <TableCell className="font-medium">{contact.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  {contact.company}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-col text-sm">
                  <div className="flex items-center gap-1">
                    <Mail className="h-3 w-3 text-muted-foreground" />
                    {contact.email}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Phone className="h-3 w-3 text-muted-foreground" />
                    {contact.phone}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {getTypeIcon(contact.type)}
                  <span className="hidden sm:inline">{getTypeName(contact.type)}</span>
                </div>
              </TableCell>
              <TableCell>{getStatusBadge(contact.status)}</TableCell>
              <TableCell className="hidden md:table-cell">
                {format(new Date(contact.createdAt), 'PP', { locale: es })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-red-500">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
