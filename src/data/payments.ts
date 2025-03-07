
export type PaymentType = 'incoming' | 'outgoing';
export type PaymentStatus = 'completed' | 'pending' | 'failed';
export type TaxCategory = 'IVA' | 'ISR' | 'IEPS' | 'otros';

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
  taxes?: {
    category: TaxCategory;
    rate: number;
    amount: number;
  }[];
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
    invoiceId: 'inv-001',
    taxes: [
      { category: 'IVA', rate: 0.16, amount: 2000 },
      { category: 'ISR', rate: 0.10, amount: 1250 }
    ]
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
    invoiceId: 'prov-001',
    taxes: [
      { category: 'IVA', rate: 0.16, amount: 1400 }
    ]
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
    invoiceId: null,
    taxes: [
      { category: 'IVA', rate: 0.16, amount: 800 },
      { category: 'IEPS', rate: 0.08, amount: 400 }
    ]
  },
  {
    id: '4',
    date: '2023-06-15',
    type: 'outgoing',
    recipient: 'Servicios Fiscales S.A.',
    concept: 'Asesoría fiscal',
    amount: 3500,
    method: 'Transferencia',
    status: 'completed',
    invoiceId: 'prov-002',
    taxes: [
      { category: 'IVA', rate: 0.16, amount: 560 },
      { category: 'ISR', rate: 0.10, amount: 350 }
    ]
  },
  {
    id: '5',
    date: '2023-07-05',
    type: 'incoming',
    recipient: 'Empresa Tecnológica S.A.',
    concept: 'Servicios de desarrollo',
    amount: 18000,
    method: 'Transferencia',
    status: 'completed',
    invoiceId: 'inv-003',
    taxes: [
      { category: 'IVA', rate: 0.16, amount: 2880 },
      { category: 'ISR', rate: 0.10, amount: 1800 }
    ]
  }
];
