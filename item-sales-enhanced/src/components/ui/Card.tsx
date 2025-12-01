import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-6 shadow-sm',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}