import React from 'react';
import { cn } from '../../utils/cn';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ label, error, className, ...props }: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-base font-normal text-gray-700 mb-2">
          {label}
        </label>
      )}
      <textarea
        className={cn(
          'w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-0 resize-vertical min-h-[120px]',
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}