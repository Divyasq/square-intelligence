import React, { useState } from 'react';
import { cn } from '../../utils/cn';
import { Button } from './Button';
import { Bold, Italic, Underline, List, ChevronDown, Link, Type, Sparkles } from 'lucide-react';

interface RichTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  showGenerateButton?: boolean;
  onGenerate?: () => void;
}

export function RichTextArea({ 
  label, 
  error, 
  showGenerateButton = false,
  onGenerate,
  className, 
  ...props 
}: RichTextAreaProps) {
  const [showToolbar, setShowToolbar] = useState(false);

  const toolbarButtons = [
    { icon: Bold, label: 'Bold' },
    { icon: Italic, label: 'Italic' },
    { icon: Underline, label: 'Underline' },
  ];

  const advancedButtons = [
    { icon: List, label: 'List' },
    { icon: ChevronDown, label: 'More' },
  ];

  const disabledButtons = [
    { icon: Link, label: 'Link', disabled: true },
    { icon: Type, label: 'Type', disabled: true },
  ];

  return (
    <div className="w-full">
      {label && (
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700">
            {label}
          </label>
          {showToolbar && (
            <div className="flex items-center space-x-1">
              {toolbarButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  type="button"
                  className="p-1 h-7 w-7"
                >
                  <button.icon className="h-3 w-3" />
                </Button>
              ))}
              
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              
              {advancedButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  type="button"
                  className="p-1 h-7 w-7"
                >
                  <button.icon className="h-3 w-3" />
                </Button>
              ))}
              
              <div className="w-px h-4 bg-gray-300 mx-1"></div>
              
              {disabledButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  type="button"
                  disabled={button.disabled}
                  className="p-1 h-7 w-7"
                >
                  <button.icon className="h-3 w-3" />
                </Button>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="relative">
        <textarea
          className={cn(
            'w-full px-4 py-3 text-base border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-0 resize-none min-h-[120px]',
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          onFocus={() => setShowToolbar(true)}
          onBlur={(e) => {
            // Keep toolbar visible if clicking on toolbar buttons
            if (!e.relatedTarget?.closest('.toolbar-button')) {
              setShowToolbar(false);
            }
          }}
          {...props}
        />
        
        {showGenerateButton && (
          <Button
            variant="outline"
            size="sm"
            type="button"
            onClick={onGenerate}
            className="absolute bottom-3 right-3 toolbar-button"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Generate
          </Button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}