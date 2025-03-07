
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

export const PaymentsHeader = () => {
  const { toast } = useToast();

  const handleRegisterPayment = () => {
    toast({
      title: "Registrar pago",
      description: "Abre el formulario para registrar un nuevo pago."
    });
  };

  const handleRegisterIncome = () => {
    toast({
      title: "Registrar cobro",
      description: "Abre el formulario para registrar un nuevo cobro."
    });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-heading">Pagos y Cobros</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona todos los pagos realizados y cobros recibidos
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button 
          variant="outline" 
          className="sm:w-auto"
          onClick={handleRegisterPayment}
        >
          <ArrowUpRight className="mr-2 h-4 w-4" />
          Registrar Pago
        </Button>
        <Button 
          className="bg-payables-600 hover:bg-payables-700 sm:w-auto"
          onClick={handleRegisterIncome}
        >
          <ArrowDownLeft className="mr-2 h-4 w-4" />
          Registrar Cobro
        </Button>
      </div>
    </div>
  );
};
