
import { Button } from '@/components/ui/button';
import { UserPlus, DownloadCloud, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export const ContactsHeader = () => {
  const { toast } = useToast();

  const handleExportContacts = () => {
    toast({
      title: "Exportando contactos",
      description: "Se está generando un archivo CSV con todos tus contactos.",
    });
  };

  const handleImportContacts = () => {
    toast({
      title: "Importar contactos",
      description: "Abre el asistente para importar contactos desde un archivo CSV.",
    });
  };

  const handleNewContact = () => {
    toast({
      title: "Nuevo contacto",
      description: "Abre el formulario para crear un nuevo contacto.",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-heading">Contactos</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona tus clientes, proveedores y empleados
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="sm:w-auto"
          onClick={handleExportContacts}
        >
          <DownloadCloud className="mr-2 h-4 w-4" />
          Exportar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="sm:w-auto"
          onClick={handleImportContacts}
        >
          <UploadCloud className="mr-2 h-4 w-4" />
          Importar
        </Button>
        <Button 
          className="bg-payables-600 hover:bg-payables-700 sm:w-auto"
          onClick={handleNewContact}
        >
          <UserPlus className="mr-2 h-4 w-4" />
          Nuevo Contacto
        </Button>
      </div>
    </div>
  );
};
