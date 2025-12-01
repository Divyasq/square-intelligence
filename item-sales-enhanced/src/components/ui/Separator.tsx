import React from 'react';
import { cn } from '../../utils/cn';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function Separator({ 
  orientation = 'horizontal', 
  className,
  ...props 
}: SeparatorProps) {
  return (
    <div
      className={cn(
        'shrink-0 bg-gray-200',
        orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
        className
      )}
      {...props}
    />
  );
}