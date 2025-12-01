import React from 'react';
import { cn } from '../../utils/cn';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(
        'rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2',
        className
      )}
      {...props}
    />
  );
}