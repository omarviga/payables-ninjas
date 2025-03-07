
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { payments } from '@/data/payments';

export function TaxTransactionsTable() {
  return (
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
  );
}
