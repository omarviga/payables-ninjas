
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PaymentsHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold font-heading">Pagos y Cobros</h1>
        <p className="text-muted-foreground mt-1">
          Gestiona todos los pagos realizados y cobros recibidos
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button asChild variant="outline" className="sm:w-auto">
          <Link to="#">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Registrar Pago
          </Link>
        </Button>
        <Button className="bg-payables-600 hover:bg-payables-700 sm:w-auto">
          <ArrowDownLeft className="mr-2 h-4 w-4" />
          Registrar Cobro
        </Button>
      </div>
    </div>
  );
};
