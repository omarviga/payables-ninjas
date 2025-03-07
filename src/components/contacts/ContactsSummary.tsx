
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Briefcase, User, Users } from 'lucide-react';
import { Contact } from '@/data/contacts';

interface ContactsSummaryProps {
  contacts: Contact[];
}

export const ContactsSummary = ({ contacts }: ContactsSummaryProps) => {
  const totalContacts = contacts.length;
  const activeContacts = contacts.filter(c => c.status === 'active').length;
  
  const clients = contacts.filter(c => c.type === 'client').length;
  const suppliers = contacts.filter(c => c.type === 'supplier').length;
  const employees = contacts.filter(c => c.type === 'employee').length;
  const others = contacts.filter(c => c.type === 'other').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card className="bg-white">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Total Contactos</p>
            <CardTitle className="text-3xl font-bold mt-2">{totalContacts}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{activeContacts} activos</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-payables-100 flex items-center justify-center">
            <Users className="h-6 w-6 text-payables-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Clientes</p>
            <CardTitle className="text-3xl font-bold mt-2">{clients}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{Math.round(clients/totalContacts*100)}% del total</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <ShoppingCart className="h-6 w-6 text-blue-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Proveedores</p>
            <CardTitle className="text-3xl font-bold mt-2">{suppliers}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{Math.round(suppliers/totalContacts*100)}% del total</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
            <Briefcase className="h-6 w-6 text-amber-600" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-6 flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Empleados</p>
            <CardTitle className="text-3xl font-bold mt-2">{employees}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">{Math.round(employees/totalContacts*100)}% del total</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <User className="h-6 w-6 text-green-600" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
