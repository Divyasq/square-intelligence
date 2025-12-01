import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border ${getToastStyles()} shadow-lg max-w-sm`}>
      {type === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
      <span className="flex-1 text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/20 rounded"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
