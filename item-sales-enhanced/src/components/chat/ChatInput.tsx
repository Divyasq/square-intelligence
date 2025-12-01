import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Loader2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({ 
  onSendMessage, 
  isLoading = false, 
  placeholder = "Ask me about our products...",
  disabled = false 
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 p-4 border-t bg-white">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          className={cn(
            "w-full resize-none rounded-lg border border-gray-300 px-4 py-3 pr-12",
            "focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            "disabled:bg-gray-50 disabled:text-gray-500",
            "min-h-[48px] max-h-32 overflow-y-auto"
          )}
          rows={1}
        />
        <div className="absolute right-2 bottom-2 flex items-center gap-1">
          {isLoading && (
            <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
          )}
        </div>
      </div>
      <Button
        type="submit"
        disabled={!message.trim() || isLoading || disabled}
        size="sm"
        className="h-12 px-4"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
