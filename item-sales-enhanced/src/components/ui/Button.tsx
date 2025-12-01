import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-0',
        {
          'px-3 py-2 text-sm': size === 'sm',
          'px-4 py-2 text-sm': size === 'md',
          'px-6 py-3 text-base': size === 'lg',
        },
        {
          'bg-blue-600 text-white hover:bg-blue-700': variant === 'primary',
          'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300': variant === 'secondary',
          'border border-gray-300 bg-white text-blue-600 hover:bg-gray-50': variant === 'outline',
          'text-gray-700 hover:bg-gray-100': variant === 'ghost',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}