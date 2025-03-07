
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { payments, TaxCategory } from '@/data/payments';
import { FileWarning } from 'lucide-react';

// Colores para las categorías de impuestos
const TAX_COLORS = {
  'IVA': '#38A3A5',
  'ISR': '#8B5CF6', 
  'IEPS': '#EB5353',
  'otros': '#F59E0B'
};

export function MonthlyTaxesChart() {
  // Calculate monthly taxes for the bar chart
  const calculateMonthlyTaxes = () => {
    const monthlyData: Record<string, Record<TaxCategory, number>> = {};
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    
    payments.forEach(payment => {
      if (payment.taxes) {
        const date = new Date(payment.date);
        const monthIndex = date.getMonth();
        const monthName = months[monthIndex];
        
        if (!monthlyData[monthName]) {
          monthlyData[monthName] = {
            'IVA': 0,
            'ISR': 0,
            'IEPS': 0,
            'otros': 0
          };
        }
        
        payment.taxes.forEach(tax => {
          monthlyData[monthName][tax.category] += tax.amount;
        });
      }
    });
    
    return Object.entries(monthlyData).map(([month, taxes]) => ({
      month,
      ...taxes,
      total: Object.values(taxes).reduce((sum, value) => sum + value, 0)
    }));
  };

  const monthlyTaxes = calculateMonthlyTaxes();
  const hasData = payments.length > 0 && payments.some(p => p.taxes && p.taxes.length > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Evolución Mensual de Impuestos</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyTaxes}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, '']} />
              <Legend />
              <Bar dataKey="IVA" stackId="a" fill={TAX_COLORS.IVA} />
              <Bar dataKey="ISR" stackId="a" fill={TAX_COLORS.ISR} />
              <Bar dataKey="IEPS" stackId="a" fill={TAX_COLORS.IEPS} />
              <Bar dataKey="otros" stackId="a" fill={TAX_COLORS.otros} />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <FileWarning className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">No hay datos disponibles</h3>
            <p className="text-muted-foreground max-w-md">
              Registra pagos con información de impuestos para visualizar la evolución mensual.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
