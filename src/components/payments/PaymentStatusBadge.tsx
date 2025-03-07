
import { Badge } from '@/components/ui/badge';

interface PaymentStatusBadgeProps {
  status: 'completed' | 'pending' | 'failed';
}

const statusColors: Record<string, string> = {
  completed: "bg-success/20 text-success hover:bg-success/30",
  pending: "bg-warning/20 text-warning hover:bg-warning/30",
  failed: "bg-danger/20 text-danger hover:bg-danger/30",
};

const statusMap: Record<string, string> = {
  completed: "Completado",
  pending: "Pendiente",
  failed: "Fallido",
};

export const PaymentStatusBadge = ({ status }: PaymentStatusBadgeProps) => {
  return (
    <Badge variant="outline" className={statusColors[status]}>
      {statusMap[status]}
    </Badge>
  );
};
