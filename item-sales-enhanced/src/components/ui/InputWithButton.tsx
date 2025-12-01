import React from 'react';
import { cn } from '../../utils/cn';

interface InputWithButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  buttonText: string;
  onButtonClick: () => void;
  buttonVariant?: 'light' | 'dark';
  buttonIcon?: React.ReactNode;
}

export function InputWithButton({ 
  label, 
  error, 
  buttonText, 
  onButtonClick, 
  buttonVariant = 'light',
  buttonIcon,
  className, 
  ...props 
}: InputWithButtonProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          className={cn(
            'w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-0 pr-24',
            error && 'border-red-500 focus:border-red-500',
            props.readOnly && 'bg-gray-50',
            className
          )}
          {...props}
        />
        <button
          type="button"
          onClick={onButtonClick}
          className={cn(
            'absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1.5 text-sm font-medium rounded transition-colors',
            buttonVariant === 'dark' 
              ? 'bg-gray-900 text-white hover:bg-gray-800' 
              : 'bg-white text-blue-600 hover:bg-gray-50 border border-gray-300'
          )}
        >
          {buttonIcon && <span className="mr-1">{buttonIcon}</span>}
          {buttonText}
        </button>
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}