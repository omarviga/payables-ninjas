
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'sm' | 'lg';
}

export const Spinner = ({ 
  className, 
  size = 'default',
  ...props 
}: SpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    default: 'h-6 w-6',
    lg: 'h-8 w-8'
  };
  
  return (
    <Loader2 
      className={cn(
        "animate-spin text-primary", 
        sizeClasses[size], 
        className
      )} 
      {...props} 
    />
  );
};
