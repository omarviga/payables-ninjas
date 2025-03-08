
import React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string | React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, className = "" }: PageHeaderProps) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <h1 className="text-3xl font-bold font-heading">{title}</h1>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
