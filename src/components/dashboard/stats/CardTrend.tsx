
import React from "react";

interface CardTrendProps {
  trend?: number;
  trendLabel?: string;
}

export function CardTrend({ trend, trendLabel }: CardTrendProps) {
  if (trend === undefined) return null;
  
  const trendColor = trend > 0 ? "text-success" : trend < 0 ? "text-danger" : "text-muted-foreground";
  const trendSign = trend > 0 ? "+" : "";
  
  return (
    <div className={`flex items-center gap-1 text-xs font-medium ${trendColor}`}>
      <span>{trendSign}{trend}%</span>
      {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
    </div>
  );
}
