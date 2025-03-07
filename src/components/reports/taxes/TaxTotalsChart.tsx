import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { payments, TaxCategory } from '@/data/payments';
import { FileWarning } from 'lucide-react';
import { TAX_COLORS } from './utils/taxConstants';

export function TaxTotalsChart() {
  // Calculate tax totals for the pie chart
  const calculateTaxTotals = () => {
    const totals: Record<TaxCategory, number> = {
      'IVA': 0,
      'ISR': 0,
      'IEPS': 0,
      'otros': 0
    };
    
    payments.forEach(payment => {
      if (payment.taxes) {
        payment.taxes.forEach(tax => {
          totals[tax.category] += tax.amount;
        });
      }
    });
    
    return Object.entries(totals).map(([category, amount]) => ({
      category,
      amount
    }));
  };

  const taxTotals = calculateTaxTotals();
  const hasData = payments.length > 0 && payments.some(p => p.taxes && p.taxes.length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Resumen de Impuestos</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={taxTotals}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="amount"
                nameKey="category"
                label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(0)}%`}
              >
                {taxTotals.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={TAX_COLORS[entry.category as TaxCategory] || '#BFBFBF'} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Monto']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <FileWarning className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">No hay datos disponibles</h3>
            <p className="text-muted-foreground max-w-md">
              Registra pagos con información de impuestos para visualizar el resumen.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
