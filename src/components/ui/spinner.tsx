
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2, type LucideProps } from 'lucide-react';

interface SpinnerProps {
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  ({ className, size = 'default', ...props }, ref) => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      default: 'h-6 w-6',
      lg: 'h-8 w-8'
    };
    
    return (
      <Loader2 
        ref={ref}
        className={cn(
          "animate-spin text-primary", 
          sizeClasses[size], 
          className
        )} 
        {...props} 
      />
    );
  }
);

Spinner.displayName = 'Spinner';
