
import React from 'react';
import { payments } from '@/data/payments';
import { TaxTotalsChart } from '../taxes/TaxTotalsChart';
import { IVATypeChart } from '../taxes/IVATypeChart';
import { MonthlyTaxesChart } from '../taxes/MonthlyTaxesChart';
import { TaxTransactionsTable } from '../taxes/TaxTransactionsTable';
import { NoTaxDataMessage } from '../taxes/NoTaxDataMessage';

export function TaxesTabContent() {
  // Verificar si hay datos disponibles
  const hasData = payments.length > 0 && payments.some(p => p.taxes && p.taxes.length > 0);
  
  // Si no hay datos, mostrar mensaje
  if (!hasData) {
    return <NoTaxDataMessage />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaxTotalsChart />
        <IVATypeChart />
        <MonthlyTaxesChart />
      </div>
      
      <TaxTransactionsTable />
    </div>
  );
}
