
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { payments } from '@/data/payments';
import { FileWarning } from 'lucide-react';

export function IVATypeChart() {
  // Calculate IVA by type (acreditable/trasladado)
  const calculateTaxByType = () => {
    const data = {
      acreditable: 0,  // IVA en gastos (outgoing)
      trasladado: 0,   // IVA en ingresos (incoming)
    };
    
    payments.forEach(payment => {
      if (payment.taxes) {
        payment.taxes.forEach(tax => {
          if (tax.category === 'IVA') {
            if (payment.type === 'outgoing') {
              data.acreditable += tax.amount;
            } else {
              data.trasladado += tax.amount;
            }
          }
        });
      }
    });
    
    return [
      { name: 'IVA Acreditable', value: data.acreditable },
      { name: 'IVA Trasladado', value: data.trasladado },
    ];
  };
  
  const ivaByType = calculateTaxByType();
  const hasData = payments.length > 0 && payments.some(p => p.taxes && p.taxes.length > 0 && p.taxes.some(t => t.category === 'IVA'));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">IVA Acreditable vs Trasladado</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        {hasData ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={ivaByType}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                <Cell fill="#4F46E5" />
                <Cell fill="#10B981" />
              </Pie>
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Monto']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
            <FileWarning className="h-16 w-16 text-muted-foreground" />
            <h3 className="text-xl font-medium">No hay datos de IVA disponibles</h3>
            <p className="text-muted-foreground max-w-md">
              Registra pagos con información de IVA para visualizar la comparativa.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
