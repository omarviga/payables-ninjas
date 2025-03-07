
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

// Pagos (array vacío)
export const payments: Payment[] = [];
