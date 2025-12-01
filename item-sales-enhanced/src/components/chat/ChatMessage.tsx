import React from 'react';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { User, Bot, Clock } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ChatMessageProps {
  message: ChatMessageType;
  isTyping?: boolean;
}

export function ChatMessage({ message, isTyping = false }: ChatMessageProps) {
  const isUser = message.sender === 'user';
  
  const formatTime = (timestamp: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(timestamp);
  };

  const formatMessageContent = (content: string) => {
    // Simple markdown-like formatting
    return content
      .split('\n')
      .map((line, index) => {
        // Handle bold text
        const boldFormatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Handle bullet points
        if (line.trim().startsWith('•')) {
          return (
            <div key={index} className="flex items-start gap-2 ml-2">
              <span className="text-gray-600 mt-1">•</span>
              <span dangerouslySetInnerHTML={{ __html: boldFormatted.replace('•', '').trim() }} />
            </div>
          );
        }
        
        // Handle headers
        if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
          return (
            <div key={index} className="font-semibold text-gray-900 mt-3 mb-1">
              {line.replace(/\*\*/g, '')}
            </div>
          );
        }
        
        return line.trim() ? (
          <div key={index} dangerouslySetInnerHTML={{ __html: boldFormatted }} />
        ) : (
          <div key={index} className="h-2" />
        );
      });
  };

  return (
    <div className={cn(
      "flex gap-3 p-4 group hover:bg-gray-50/50 transition-colors",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
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
          "inline-block rounded-lg px-4 py-2 max-w-full",
          isUser
            ? "bg-blue-500 text-white"
            : "bg-white border border-gray-200 text-gray-900"
        )}>
          <div className="text-sm leading-relaxed whitespace-pre-wrap">
            {isTyping ? (
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <span className="text-xs text-gray-500 ml-2">AI is typing...</span>
              </div>
            ) : (
              <div className="space-y-1">
                {formatMessageContent(message.content)}
              </div>
            )}
          </div>
        </div>
        
        {/* Timestamp */}
        <div className={cn(
          "flex items-center gap-1 mt-1 text-xs text-gray-500",
          isUser ? "justify-end" : "justify-start"
        )}>
          <Clock className="h-3 w-3" />
          <span>{formatTime(message.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}
