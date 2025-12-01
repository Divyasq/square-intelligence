import React from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  trailingAction?: React.ReactNode;
  unit?: string;
}

export function Input({ label, error, trailingAction, unit, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        <input
          className={cn(
            'w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-0',
            error && 'border-red-500 focus:border-red-500',
            (trailingAction || unit) && 'pr-20',
            props.readOnly && 'bg-gray-50',
            className
          )}
          {...props}
        />
        {unit && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
            {unit}
          </span>
        )}
        {trailingAction && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {trailingAction}
          </div>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}