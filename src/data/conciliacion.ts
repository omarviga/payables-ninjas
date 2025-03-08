
import { Landmark, FilePlus2, CheckCircle2, AlertCircle, XCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

export interface Transaction {
  id: string;
  date: string;
  reference: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'matched' | 'unmatched' | 'doubtful';
  matchedDocument: string | null;
  accountName: string;
}

export interface Bank {
  id: string;
  name: string;
  accounts: number;
  balance: number;
}

export const transactions: Transaction[] = [
  {
    id: '1',
    date: '15/05/2023',
    reference: 'TRF987654',
    description: 'TRANSFERENCIA RECIBIDA DE EMPRESA ABC',
    amount: 15000,
    type: 'credit',
    status: 'matched',
    matchedDocument: 'FAC-2023-001',
    accountName: 'CUENTA PRINCIPAL BBVA'
  },
  {
    id: '2',
    date: '18/05/2023',
    reference: 'TRF123456',
    description: 'PAGO A PROVEEDOR SUMINISTROS SA',
    amount: 8500,
    type: 'debit',
    status: 'matched',
    matchedDocument: 'PROV-2023-001',
    accountName: 'CUENTA PRINCIPAL BBVA'
  },
  {
    id: '3',
    date: '20/05/2023',
    reference: 'TDC98765',
    description: 'CARGO TARJETA CORPORATIVA MUEBLES Y EQ',
    amount: 2000,
    type: 'debit',
    status: 'unmatched',
    matchedDocument: null,
    accountName: 'TARJETA CORPORATIVA'
  },
  {
    id: '4',
    date: '25/05/2023',
    reference: 'DEP123456',
    description: 'DEPÓSITO EN EFECTIVO',
    amount: 3000,
    type: 'credit',
    status: 'matched',
    matchedDocument: 'FAC-2023-002',
    accountName: 'CUENTA PRINCIPAL BBVA'
  },
  {
    id: '5',
    date: '28/05/2023',
    reference: 'DOMICIL987',
    description: 'CARGO DOMICILIADO SERVICIOS VARIOS',
    amount: 1200,
    type: 'debit',
    status: 'unmatched',
    matchedDocument: null,
    accountName: 'CUENTA PRINCIPAL BBVA'
  },
  {
    id: '6',
    date: '01/06/2023',
    reference: 'CHQ000123',
    description: 'COBRO DE CHEQUE 000123',
    amount: 5000,
    type: 'debit',
    status: 'doubtful',
    matchedDocument: null,
    accountName: 'CUENTA PRINCIPAL BBVA'
  }
];

export const banks: Bank[] = [
  { id: 'bbva', name: 'BBVA', accounts: 2, balance: 120000 },
  { id: 'santander', name: 'Santander', accounts: 1, balance: 75000 },
  { id: 'banorte', name: 'Banorte', accounts: 1, balance: 45000 }
];

export const statusColors: Record<string, string> = {
  matched: "bg-success/20 text-success hover:bg-success/30",
  unmatched: "bg-warning/20 text-warning hover:bg-warning/30",
  doubtful: "bg-danger/20 text-danger hover:bg-danger/30",
};

export const statusMap: Record<string, { text: string, icon: any }> = {
  matched: {
    text: "Conciliado",
    icon: CheckCircle2
  },
  unmatched: {
    text: "Sin Conciliar",
    icon: AlertCircle
  },
  doubtful: {
    text: "Dudoso",
    icon: XCircle
  }
};

export const typeMap: Record<string, { text: string, icon: any, className: string }> = {
  credit: {
    text: "Ingreso",
    icon: ArrowDownLeft,
    className: "text-success"
  },
  debit: {
    text: "Egreso",
    icon: ArrowUpRight,
    className: "text-danger"
  }
};
