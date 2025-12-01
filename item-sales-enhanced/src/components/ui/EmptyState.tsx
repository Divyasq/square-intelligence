import React from 'react';
import { Button } from './Button';
import { cn } from '../../utils/cn';

interface EmptyStateProps {
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    onClick: () => void;
  };
  secondaryAction?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  title,
  description,
  primaryAction,
  secondaryAction,
  className
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-8",
        className
      )}
      style={{
        height: "250px",
        width: "100%",
        backgroundColor: "rgb(255, 255, 255)",
        color: "rgb(26, 26, 26)",
        fontSize: "14px",
        lineHeight: "22px",
        fontFamily: '"Square Sans Text VF", "Square Sans Text", Helvetica, Arial, sans-serif',
      }}
    >
      <h3
        style={{
          fontFamily: '"Square Sans Display VF", "Square Sans Display", Helvetica, Arial, sans-serif',
          fontSize: "19px",
          fontWeight: "700",
          lineHeight: "26px",
          letterSpacing: "normal",
          border: "0px none rgba(0, 0, 0, 0.9)",
          padding: "0px",
          margin: "0px 0px 9.5px 0px",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "14px",
          lineHeight: "22px",
          marginTop: "0px",
          marginBottom: "14px",
        }}
      >
        {description}
      </p>

      <div className="flex gap-3">
        {primaryAction && (
          <Button
            variant="primary"
            size="md"
            onClick={primaryAction.onClick}
          >
            {primaryAction.label}
          </Button>
        )}
        
        {secondaryAction && (
          <Button
            variant="outline"
            size="md"
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
}