import React from 'react';
import { cn } from '../../utils/cn';

interface TableProps {
  children: React.ReactNode;
  className?: string;
}

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface TableBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

interface TableCellProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
  colSpan?: number;
}

interface TableHeaderCellProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export function Table({ children, className }: TableProps) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className={cn('w-full', className)}>
          {children}
        </table>
      </div>
    </div>
  );
}

export function TableHeader({ children, className }: TableHeaderProps) {
  return (
    <thead className={cn('bg-white border-b border-gray-200', className)}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody className={className}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className, hover = true }: TableRowProps) {
  return (
    <tr className={cn(
      'border-b border-gray-200',
      hover && 'hover:bg-gray-50',
      className
    )}>
      {children}
    </tr>
  );
}

export function TableCell({ children, className, align = 'left', colSpan }: TableCellProps) {
  return (
    <td 
      className={cn(
        'py-4 px-6',
        {
          'text-left': align === 'left',
          'text-center': align === 'center',
          'text-right': align === 'right',
        },
        className
      )}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
}

export function TableHeaderCell({ children, className, align = 'left' }: TableHeaderCellProps) {
  return (
    <th className={cn(
      'py-3 px-6 font-semibold text-gray-900',
      {
        'text-left': align === 'left',
        'text-center': align === 'center',
        'text-right': align === 'right',
      },
      className
    )}>
      {children}
    </th>
  );
}