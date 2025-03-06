
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard, Wallet } from 'lucide-react';

interface PaymentsSummaryCardsProps {
  totalIncoming: number;
  totalOutgoing: number;
  balance: number;
}

export const PaymentsSummaryCards = ({ 
  totalIncoming, 
  totalOutgoing, 
  balance 
}: PaymentsSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Cobrado</CardTitle>
          <Wallet className="h-4 w-4 text-success" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalIncoming.toLocaleString('es-MX')}</div>
          <p className="text-xs text-muted-foreground">
            +15% respecto al mes anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
          <CreditCard className="h-4 w-4 text-danger" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalOutgoing.toLocaleString('es-MX')}</div>
          <p className="text-xs text-muted-foreground">
            +5% respecto al mes anterior
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <Wallet className="h-4 w-4 text-payables-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${balance.toLocaleString('es-MX')}</div>
          <p className="text-xs text-muted-foreground">
            En el periodo actual
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
