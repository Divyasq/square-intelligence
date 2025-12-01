import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FilterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  showChevron?: boolean;
  badge?: string;
  className?: string;
}

export function FilterButton({ 
  children, 
  showChevron = true, 
  badge, 
  className, 
  ...props 
}: FilterButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm',
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {badge && (
        <span className="text-sm text-gray-500">{badge}</span>
      )}
      {showChevron && <ChevronDown className="h-4 w-4" />}
    </button>
  );
}