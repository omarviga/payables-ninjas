
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { PaymentsTable } from '@/components/payments/PaymentsTable';
import { PaymentsSummaryCards } from '@/components/payments/PaymentsSummaryCards';
import { PaymentsFilterBar } from '@/components/payments/PaymentsFilterBar';
import { PaymentsHeader } from '@/components/payments/PaymentsHeader';
import { PaymentsTabs } from '@/components/payments/PaymentsTabs';
import { payments } from '@/data/payments';

const Pagos = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter payments based on search term
  const filteredPayments = payments.filter(payment => 
    payment.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.concept.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.amount.toString().includes(searchTerm)
  );
  
  const incomingPayments = filteredPayments.filter(payment => payment.type === 'incoming');
  const outgoingPayments = filteredPayments.filter(payment => payment.type === 'outgoing');
  
  // Calculate totals
  const totalIncoming = incomingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalOutgoing = outgoingPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const balance = totalIncoming - totalOutgoing;

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <PaymentsHeader />
        
        <PaymentsSummaryCards 
          totalIncoming={totalIncoming}
          totalOutgoing={totalOutgoing}
          balance={balance}
        />
        
        <PaymentsFilterBar 
          onFilterChange={setSearchTerm}
        />
        
        <PaymentsTabs 
          payments={filteredPayments}
          incomingPayments={incomingPayments}
          outgoingPayments={outgoingPayments}
        />
      </div>
    </MainLayout>
  );
};

export default Pagos;
