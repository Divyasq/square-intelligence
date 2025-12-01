import React from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { Label } from './Label';

interface InlineInputActionProps {
  label: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  actionLabel: string;
  onActionClick: () => void;
  actionIcon?: React.ReactNode;
  placeholder?: string;
  readOnly?: boolean;
  error?: string;
  className?: string;
}

export function InlineInputAction({
  label,
  value,
  onChange,
  actionLabel,
  onActionClick,
  actionIcon,
  placeholder,
  readOnly,
  error,
  className
}: InlineInputActionProps) {
  return (
    <div className={className}>
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, '-')}>{label}</Label>
      <div className="flex items-center mt-1">
        <Input
          id={label.toLowerCase().replace(/\s+/g, '-')}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          error={error}
          className="flex-1"
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="ml-2" 
          type="button"
          onClick={onActionClick}
        >
          {actionIcon}
          {actionLabel}
        </Button>
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
}