
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

export interface BankCardProps {
  name: string;
  balance: number;
  accounts: number;
  icon: LucideIcon;
  valueIsCurrency?: boolean;
}

export const BankCard = React.memo(({ 
  name, 
  balance, 
  accounts, 
  icon: Icon,
  valueIsCurrency = true
}: BankCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Icon className="h-4 w-4 text-payables-600" />
      </CardHeader>
      <CardContent>
        <div className="text-xl font-bold">
          {valueIsCurrency 
            ? `$${balance.toLocaleString('es-MX')}` 
            : `${balance}%`}
        </div>
        <p className="text-xs text-muted-foreground">
          {accounts} {accounts === 1 ? 'cuenta' : 'cuentas'}
        </p>
      </CardContent>
    </Card>
  );
});

BankCard.displayName = 'BankCard';
