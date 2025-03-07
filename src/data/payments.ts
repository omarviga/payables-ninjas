
export type PaymentType = 'incoming' | 'outgoing';
export type PaymentStatus = 'completed' | 'pending' | 'failed';

export interface Payment {
  id: string;
  date: string;
  type: PaymentType;
  recipient: string;
  concept: string;
  amount: number;
  method: string;
  status: PaymentStatus;
  invoiceId: string | null;
}

// Pagos de ejemplo para pruebas
export const payments: Payment[] = [
  {
    id: '1',
    date: '2023-05-15',
    type: 'incoming',
    recipient: 'Distribuidora Nacional S.A.',
    concept: 'Pago de factura #A-001',
    amount: 12500,
    method: 'Transferencia',
    status: 'completed',
    invoiceId: 'inv-001'
  },
  {
    id: '2',
    date: '2023-05-20',
    type: 'outgoing',
    recipient: 'Suministros Industriales',
    concept: 'Compra de materiales',
    amount: 8750,
    method: 'Cheque',
    status: 'completed',
    invoiceId: 'prov-001'
  },
  {
    id: '3',
    date: '2023-06-01',
    type: 'incoming',
    recipient: 'Cliente Nuevo S.A.',
    concept: 'Anticipo de proyecto',
    amount: 5000,
    method: 'Tarjeta de crédito',
    status: 'pending',
    invoiceId: null
  }
];
