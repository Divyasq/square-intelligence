import React from 'react';
import { cn } from '../../utils/cn';

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section className={cn('', className)}>
      <div className="mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">{title}</h2>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>
      {children}
    </section>
  );
}