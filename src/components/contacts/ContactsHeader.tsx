
import { Button } from '@/components/ui/button';
import { UserPlus, DownloadCloud, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ContactsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-heading">Contactos</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona tus clientes, proveedores y empleados
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button asChild variant="outline" size="sm" className="sm:w-auto">
          <Link to="#">
            <DownloadCloud className="mr-2 h-4 w-4" />
            Exportar
          </Link>
        </Button>
        <Button asChild variant="outline" size="sm" className="sm:w-auto">
          <Link to="#">
            <UploadCloud className="mr-2 h-4 w-4" />
            Importar
          </Link>
        </Button>
        <Button className="bg-payables-600 hover:bg-payables-700 sm:w-auto">
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Contacto
        </Button>
      </div>
    </div>
  );
};
