import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface PromotionalCardProps {
  title: string;
  description: string;
  qrCodeUrl?: string;
  appStoreUrl?: string;
  onDismiss?: () => void;
  className?: string;
}

export function PromotionalCard({ 
  title, 
  description, 
  qrCodeUrl = "https://dashboard-production-f.squarecdn.com/dashboard/@catalog/shared/images/photo-studio/photo-studio-qr-code-826a77fa3cff5f30582f7c6608282101.svg",
  appStoreUrl = "#",
  onDismiss,
  className 
}: PromotionalCardProps) {
  return (
    <div className={cn(
      'bg-blue-50 border border-blue-100 rounded-md p-4 flex items-center gap-4 relative',
      className
    )}>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      
      <div className="flex-shrink-0">
        <img 
          src={qrCodeUrl} 
          alt="QR Code" 
          className="w-20 h-20 rounded border border-gray-200"
        />
      </div>
      
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 text-sm mb-1">
          {title}
        </h4>
        <p className="text-sm text-gray-600 mb-3">
          {description}
        </p>
        <a 
          href={appStoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <img 
            src="https://dashboard-production-f.squarecdn.com/dashboard/@catalog/shared/images/photo-studio/photo-studio-app-store-banner-0f569770f26750612e0a0e65a170de1e.svg" 
            alt="Download on the App Store" 
            className="h-8"
          />
        </a>
      </div>
    </div>
  );
}