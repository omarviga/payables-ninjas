
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface PaymentTypeIndicatorProps {
  type: 'incoming' | 'outgoing';
}

export const PaymentTypeIndicator = ({ type }: PaymentTypeIndicatorProps) => {
  const TypeIcon = type === 'incoming' ? ArrowDownLeft : ArrowUpRight;
  
  return (
    <div className="flex items-center gap-1">
      <TypeIcon className={`h-4 w-4 ${type === 'incoming' ? 'text-success' : 'text-danger'}`} />
      <span>{type === 'incoming' ? 'Ingreso' : 'Egreso'}</span>
    </div>
  );
};
