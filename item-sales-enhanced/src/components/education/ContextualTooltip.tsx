import React from 'react';
import { HelpCircle, Info } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ContextualTooltipProps {
  content: string;
  title?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  trigger?: 'hover' | 'click';
  children: React.ReactNode;
  className?: string;
}

export function ContextualTooltip({ 
  content, 
  title, 
  position = 'top', 
  trigger = 'hover',
  children, 
  className 
}: ContextualTooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const showTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false);
      }
    }, 100);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      setIsVisible(!isVisible);
    }
  };

  const getTooltipClasses = () => {
    const baseClasses = "absolute z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg max-w-xs";
    
    switch (position) {
      case 'top':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 mb-2`;
      case 'bottom':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 mt-2`;
      case 'left':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 mr-2`;
      case 'right':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 ml-2`;
      default:
        return baseClasses;
    }
  };

  const getArrowClasses = () => {
    const baseClasses = "absolute w-2 h-2 bg-gray-900 transform rotate-45";
    
    switch (position) {
      case 'top':
        return `${baseClasses} top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
      case 'bottom':
        return `${baseClasses} bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2`;
      case 'left':
        return `${baseClasses} left-full top-1/2 transform -translate-y-1/2 -translate-x-1/2`;
      case 'right':
        return `${baseClasses} right-full top-1/2 transform -translate-y-1/2 translate-x-1/2`;
      default:
        return baseClasses;
    }
  };

  return (
    <div 
      className={cn("relative inline-block", className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {children}
      
      {isVisible && (
        <div 
          className={getTooltipClasses()}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {title && (
            <div className="font-semibold mb-1">{title}</div>
          )}
          <div className="text-sm leading-relaxed">{content}</div>
          <div className={getArrowClasses()} />
        </div>
      )}
    </div>
  );
}

// Specific tooltip for metric explanations
interface MetricTooltipProps {
  metric: string;
  explanation: string;
  formula?: string;
  example?: string;
  className?: string;
}

export function MetricTooltip({ 
  metric, 
  explanation, 
  formula, 
  example, 
  className 
}: MetricTooltipProps) {
  return (
    <ContextualTooltip
      title={metric}
      content={
        <div className="space-y-2">
          <p>{explanation}</p>
          {formula && (
            <div className="bg-gray-800 rounded px-2 py-1">
              <code className="text-xs text-gray-300">{formula}</code>
            </div>
          )}
          {example && (
            <div className="text-xs text-gray-300">
              <strong>Example:</strong> {example}
            </div>
          )}
        </div>
      }
      position="top"
      className={className}
    >
      <button className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
        <Info className="h-4 w-4" />
      </button>
    </ContextualTooltip>
  );
}

// Help icon with tooltip
export function HelpTooltip({ content, title, className }: { 
  content: string; 
  title?: string; 
  className?: string; 
}) {
  return (
    <ContextualTooltip
      content={content}
      title={title}
      position="top"
      className={className}
    >
      <button className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-colors">
        <HelpCircle className="h-3 w-3" />
      </button>
    </ContextualTooltip>
  );
}
