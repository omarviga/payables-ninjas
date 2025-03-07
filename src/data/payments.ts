
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

// Empty payments array
export const payments: Payment[] = [];
