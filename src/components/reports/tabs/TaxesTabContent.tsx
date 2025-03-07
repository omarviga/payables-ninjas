
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { payments, TaxCategory } from '@/data/payments';
import { FileWarning } from 'lucide-react';

// Colores para las categorías de impuestos
const TAX_COLORS = {
  'IVA': '#38A3A5',
  'ISR': '#8B5CF6', 
  'IEPS': '#EB5353',
  'otros': '#F59E0B'
};

export function TaxesTabContent() {
  // Verificar si hay datos disponibles
  const hasData = payments.length > 0 && payments.some(p => p.taxes && p.taxes.length > 0);
  
  // Si no hay datos, mostrar mensaje
  if (!hasData) {
    return (
      <div className="flex flex-col items-center justify-center p-10 text-center space-y-4">
        <FileWarning className="h-16 w-16 text-muted-foreground" />
        <h3 className="text-xl font-medium">No hay datos de impuestos disponibles</h3>
        <p className="text-muted-foreground max-w-md">
          Registra pagos con información de impuestos para visualizar el informe de impuestos.
        </p>
      </div>
    );
  }

  // Calcular totales por categoría de impuesto
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

  // Calcular totales por mes
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

  // Preparar datos para gráficos
  const taxTotals = calculateTaxTotals();
  const monthlyTaxes = calculateMonthlyTaxes();
  
  // Calcular totales por tipo (IVA acreditable/trasladado)
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
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Resumen de Impuestos</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">IVA Acreditable vs Trasladado</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
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
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Evolución Mensual de Impuestos</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
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
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Desglose de Impuestos por Transacción</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Concepto</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>IVA</TableHead>
                <TableHead>ISR</TableHead>
                <TableHead>IEPS</TableHead>
                <TableHead>Total Impuestos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                    No hay datos disponibles
                  </TableCell>
                </TableRow>
              ) : (
                payments.map((payment) => {
                  // Calcular montos de impuestos por categoría
                  const iva = payment.taxes?.find(t => t.category === 'IVA')?.amount || 0;
                  const isr = payment.taxes?.find(t => t.category === 'ISR')?.amount || 0;
                  const ieps = payment.taxes?.find(t => t.category === 'IEPS')?.amount || 0;
                  const totalTax = (payment.taxes || []).reduce((sum, tax) => sum + tax.amount, 0);
                  
                  return (
                    <TableRow key={payment.id}>
                      <TableCell>{payment.date}</TableCell>
                      <TableCell>{payment.concept}</TableCell>
                      <TableCell>
                        {payment.type === 'incoming' ? 'Ingreso' : 'Egreso'}
                      </TableCell>
                      <TableCell>${payment.amount.toLocaleString()}</TableCell>
                      <TableCell>${iva.toLocaleString()}</TableCell>
                      <TableCell>${isr.toLocaleString()}</TableCell>
                      <TableCell>${ieps.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">${totalTax.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
