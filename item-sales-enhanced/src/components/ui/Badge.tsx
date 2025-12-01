import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md';
  className?: string;
}

export function Badge({ children, variant = 'default', size = 'md', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        {
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-1 text-sm': size === 'md',
        },
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'bg-blue-100 text-blue-800': variant === 'primary',
          'bg-green-100 text-green-800': variant === 'secondary',
        },
        className
      )}
    >
      {children}
    </span>
  );
}