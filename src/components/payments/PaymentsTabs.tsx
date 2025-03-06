
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Wallet, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { PaymentsTable } from './PaymentsTable';
import type { Payment } from './PaymentsTable';

interface PaymentsTabsProps {
  payments: Payment[];
  incomingPayments: Payment[];
  outgoingPayments: Payment[];
}

export const PaymentsTabs = ({ 
  payments, 
  incomingPayments, 
  outgoingPayments 
}: PaymentsTabsProps) => {
  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4 w-full sm:w-auto">
        <TabsTrigger value="all" className="flex gap-2 items-center">
          <Wallet className="h-4 w-4" />
          <span className="hidden sm:inline">Todos</span>
          <Badge variant="outline" className="ml-auto">{payments.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="incoming" className="flex gap-2 items-center">
          <ArrowDownLeft className="h-4 w-4 text-success" />
          <span className="hidden sm:inline">Cobros</span>
          <Badge variant="outline" className="ml-auto">{incomingPayments.length}</Badge>
        </TabsTrigger>
        <TabsTrigger value="outgoing" className="flex gap-2 items-center">
          <ArrowUpRight className="h-4 w-4 text-danger" />
          <span className="hidden sm:inline">Pagos</span>
          <Badge variant="outline" className="ml-auto">{outgoingPayments.length}</Badge>
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-0">
        <PaymentsTable paymentList={payments} />
      </TabsContent>
      
      <TabsContent value="incoming" className="mt-0">
        <PaymentsTable paymentList={incomingPayments} />
      </TabsContent>
      
      <TabsContent value="outgoing" className="mt-0">
        <PaymentsTable paymentList={outgoingPayments} />
      </TabsContent>
    </Tabs>
  );
};
