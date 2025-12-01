import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, className, size = 'md' }: ModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md mx-auto';
      case 'md':
        return 'max-w-lg mx-auto';
      case 'lg':
        return 'max-w-2xl mx-auto';
      case 'xl':
        return 'max-w-4xl mx-auto';
      default:
        return 'max-w-lg mx-auto';
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className={cn(
          "absolute inset-0 bg-black transition-opacity duration-300",
          isOpen ? "opacity-50" : "opacity-0"
        )}
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div
        className={cn(
          "absolute inset-x-4 bottom-0 bg-white rounded-t-xl transform transition-transform duration-300 ease-out flex flex-col",
          isOpen ? "translate-y-0" : "translate-y-full",
          getSizeClasses(),
          className
        )}
        style={{ height: '95vh' }}
      >
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        
        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
