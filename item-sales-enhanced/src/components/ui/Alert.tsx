import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface AlertProps {
  variant?: 'info' | 'warning' | 'error' | 'success';
  dismissable?: boolean;
  onDismiss?: () => void;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function Alert({ 
  variant = 'info', 
  dismissable = false, 
  onDismiss, 
  children, 
  action 
}: AlertProps) {
  const variantStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800'
  };

  return (
    <div
      className={cn(
        'border rounded-lg p-4 mb-4 flex items-center justify-between',
        variantStyles[variant]
      )}
      role="region"
      aria-label="Announcement"
    >
      <div className="flex-1">
        {children}
      </div>
      
      <div className="flex items-center gap-3">
        {action && (
          <div>
            {action}
          </div>
        )}
        
        {dismissable && (
          <button
            onClick={onDismiss}
            className="p-1 hover:bg-black/5 rounded transition-colors"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}