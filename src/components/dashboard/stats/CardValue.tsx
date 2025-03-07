
import React from "react";

interface CardValueProps {
  value: string;
  valuePrefix?: string;
  valueSuffix?: string;
}

export function CardValue({ value, valuePrefix, valueSuffix }: CardValueProps) {
  return (
    <div className="text-2xl font-bold">
      {valuePrefix}{value}{valueSuffix}
    </div>
  );
}
