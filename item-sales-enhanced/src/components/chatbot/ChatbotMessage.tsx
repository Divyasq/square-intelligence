import React, { useState } from 'react';
import { Message } from '../../types/chatbot';
import { User, Bot, Copy, RotateCcw, ThumbsUp, ThumbsDown, Clock, Paperclip, Code, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface ChatbotMessageProps {
  message: Message;
  onRegenerate?: (messageId: string) => void;
  onRate?: (messageId: string, rating: number) => void;
  showTimestamp?: boolean;
  isTyping?: boolean;
}

export function ChatbotMessage({ 
  message, 
  onRegenerate, 
  onRate, 
  showTimestamp = true,
  isTyping = false 
}: ChatbotMessageProps) {
  const [copied, setCopied] = useState(false);
  const [showActions, setShowActions] = useState(false);
  
  const isUser = message.role === 'user';
  const isAssistant = message.role === 'assistant';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy message:', error);
    }
  };

  const handleRate = (rating: number) => {
    if (onRate) {
      onRate(message.id, rating);
    }
  };

  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const renderMessageContent = () => {
    if (isTyping) {
      return (
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-sm text-gray-500">Thinking...</span>
        </div>
      );
    }

    // Handle code blocks
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(message.content)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push(
          <div key={`text-${lastIndex}`} className="whitespace-pre-wrap">
            {formatTextContent(message.content.slice(lastIndex, match.index))}
          </div>
        );
      }

      // Add code block
      const language = match[1] || 'text';
      const code = match[2];
      parts.push(
        <div key={`code-${match.index}`} className="my-3">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                <span>{language}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigator.clipboard.writeText(code)}
                className="h-6 px-2 text-gray-400 hover:text-white"
              >
                <Copy className="h-3 w-3" />
              </Button>
            </div>
            <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
              <code>{code}</code>
            </pre>
          </div>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < message.content.length) {
      parts.push(
        <div key={`text-${lastIndex}`} className="whitespace-pre-wrap">
          {formatTextContent(message.content.slice(lastIndex))}
        </div>
      );
    }

    return parts.length > 0 ? parts : (
      <div className="whitespace-pre-wrap">
        {formatTextContent(message.content)}
      </div>
    );
  };

  const formatTextContent = (text: string) => {
    // Handle bold text
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderFileAttachments = () => {
    if (!message.metadata?.files?.length) return null;

    return (
      <div className="mt-2 space-y-2">
        {message.metadata.files.map((file, index) => (
          <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg border">
            <Paperclip className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">{file.name}</span>
            <span className="text-xs text-gray-500">
              ({(file.size / 1024).toFixed(1)} KB)
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div 
      className={cn(
        "flex gap-3 p-4 group transition-colors",
        isUser ? "flex-row-reverse bg-transparent" : "flex-row hover:bg-gray-50/50"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      {/* Avatar */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser 
          ? "bg-blue-500 text-white" 
          : "bg-gray-100 text-gray-600"
      )}>
        {isUser ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>

      {/* Message Content */}
      <div className={cn(
        "flex-1 max-w-3xl",
        isUser ? "text-right" : "text-left"
      )}>
        <div className={cn(
          "inline-block rounded-lg px-4 py-3 max-w-full",
          isUser
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-200 text-gray-900"
        )}>
          <div className="text-sm leading-relaxed">
            {message.error ? (
              <div className="text-red-600 flex items-center gap-2">
                <span>⚠️ Error: {message.error}</span>
              </div>
            ) : (
              renderMessageContent()
            )}
          </div>
          
          {renderFileAttachments()}
        </div>

        {/* Message Actions */}
        <div className={cn(
          "flex items-center gap-2 mt-2 transition-opacity",
          isUser ? "justify-end" : "justify-start",
          showActions ? "opacity-100" : "opacity-0"
        )}>
          {/* Timestamp */}
          {showTimestamp && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3 w-3" />
              <span>{formatTime(message.timestamp)}</span>
              {message.metadata?.regenerated && (
                <span className="text-blue-500">(regenerated)</span>
              )}
            </div>
          )}

          {/* Copy Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-6 px-2 text-gray-500 hover:text-gray-700"
            title="Copy message"
          >
            {copied ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
          </Button>

          {/* Regenerate Button (Assistant messages only) */}
          {isAssistant && onRegenerate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRegenerate(message.id)}
              className="h-6 px-2 text-gray-500 hover:text-gray-700"
              title="Regenerate response"
            >
              <RotateCcw className="h-3 w-3" />
            </Button>
          )}

          {/* Rating Buttons (Assistant messages only) */}
          {isAssistant && onRate && (
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRate(1)}
                className={cn(
                  "h-6 px-2",
                  message.metadata?.rating === 1
                    ? "text-green-600 bg-green-50"
                    : "text-gray-500 hover:text-green-600"
                )}
                title="Good response"
              >
                <ThumbsUp className="h-3 w-3" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleRate(-1)}
                className={cn(
                  "h-6 px-2",
                  message.metadata?.rating === -1
                    ? "text-red-600 bg-red-50"
                    : "text-gray-500 hover:text-red-600"
                )}
                title="Poor response"
              >
                <ThumbsDown className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
