
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description?: string;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  className?: string;
  iconClassName?: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendLabel,
  className,
  iconClassName,
  valuePrefix,
  valueSuffix,
}: StatsCardProps) {
  const renderTrend = () => {
    if (trend === undefined) return null;
    
    const trendColor = trend > 0 ? "text-success" : trend < 0 ? "text-danger" : "text-muted-foreground";
    const trendSign = trend > 0 ? "+" : "";
    
    return (
      <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
        <span>{trendSign}{trend}%</span>
        {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
      </div>
    );
  };

  return (
    <Card className={cn("stats-card", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn(
          "p-2 rounded-full",
          iconClassName || "bg-primary/10 text-primary"
        )}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {valuePrefix}{value}{valueSuffix}
        </div>
        <div className="flex items-center justify-between mt-1">
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
          {renderTrend()}
        </div>
      </CardContent>
    </Card>
  );
}
