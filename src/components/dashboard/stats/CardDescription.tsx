
import React from "react";

interface CardDescriptionProps {
  description?: string;
}

export function CardDescription({ description }: CardDescriptionProps) {
  if (!description) return null;
  
  return (
    <p className="text-xs text-muted-foreground">{description}</p>
  );
}
