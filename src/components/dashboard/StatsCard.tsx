
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { CardTitle } from "./stats/CardTitle";
import { CardValue } from "./stats/CardValue";
import { CardDescription } from "./stats/CardDescription";
import { CardTrend } from "./stats/CardTrend";

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
  icon,
  trend,
  trendLabel,
  className,
  iconClassName,
  valuePrefix,
  valueSuffix,
}: StatsCardProps) {
  return (
    <Card className={cn("stats-card", className)}>
      <CardTitle 
        title={title} 
        icon={icon} 
        iconClassName={iconClassName} 
      />
      <CardContent>
        <CardValue 
          value={value} 
          valuePrefix={valuePrefix} 
          valueSuffix={valueSuffix} 
        />
        <div className="flex items-center justify-between mt-1">
          <CardDescription description={description} />
          <CardTrend trend={trend} trendLabel={trendLabel} />
        </div>
      </CardContent>
    </Card>
  );
}
