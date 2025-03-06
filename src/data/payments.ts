
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

export const payments: Payment[] = [
  {
    id: '1',
    date: '15/05/2023',
    type: 'outgoing',
    recipient: 'Suministros SA',
    concept: 'Pago de factura PROV-2023-001',
    amount: 8500,
    method: 'Transferencia',
    status: 'completed',
    invoiceId: 'PROV-2023-001'
  },
  {
    id: '2',
    date: '20/05/2023',
    type: 'outgoing',
    recipient: 'Muebles y Equipos',
    concept: 'Anticipo de compra',
    amount: 2000,
    method: 'Tarjeta Corporativa',
    status: 'completed',
    invoiceId: null
  },
  {
    id: '3',
    date: '01/06/2023',
    type: 'outgoing',
    recipient: 'Servicios Digitales',
    concept: 'Pago de factura PROV-2023-003',
    amount: 6000,
    method: 'Transferencia',
    status: 'pending',
    invoiceId: 'PROV-2023-003'
  },
  {
    id: '4',
    date: '10/05/2023',
    type: 'incoming',
    recipient: 'Empresa ABC',
    concept: 'Pago de factura FAC-2023-001',
    amount: 15000,
    method: 'Transferencia',
    status: 'completed',
    invoiceId: 'FAC-2023-001'
  },
  {
    id: '5',
    date: '25/05/2023',
    type: 'incoming',
    recipient: 'Corporativo XYZ',
    concept: 'Pago parcial de factura FAC-2023-002',
    amount: 3000,
    method: 'Depósito en Efectivo',
    status: 'completed',
    invoiceId: 'FAC-2023-002'
  },
  {
    id: '6',
    date: '08/06/2023',
    type: 'incoming',
    recipient: 'Servicios Integrales',
    concept: 'Pago de factura FAC-2023-003',
    amount: 12000,
    method: 'Transferencia',
    status: 'pending',
    invoiceId: 'FAC-2023-003'
  }
];
