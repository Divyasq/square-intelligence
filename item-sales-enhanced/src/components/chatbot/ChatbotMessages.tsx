import React, { useRef, useEffect } from 'react';
import { ChatbotMessage } from './ChatbotMessage';
import { ChatbotWelcome } from './ChatbotWelcome';
import { Message } from '../../types/chatbot';
import { cn } from '../../utils/cn';

interface ChatbotMessagesProps {
  messages: Message[];
  isTyping?: boolean;
  onRegenerate?: (messageId: string) => void;
  onRate?: (messageId: string, rating: number) => void;
  onSuggestedQuestionClick?: (question: string) => void;
  showTimestamps?: boolean;
  className?: string;
}

export function ChatbotMessages({ 
  messages, 
  isTyping = false,
  onRegenerate,
  onRate,
  onSuggestedQuestionClick,
  showTimestamps = true,
  className 
}: ChatbotMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className={cn("flex-1 overflow-y-auto bg-gray-50", className)}>
      {messages.length === 0 ? (
        <ChatbotWelcome 
          onSuggestedQuestionClick={onSuggestedQuestionClick}
          className="h-full flex items-center justify-center"
        />
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatbotMessage
              key={message.id}
              message={message}
              onRegenerate={onRegenerate}
              onRate={onRate}
              showTimestamp={showTimestamps}
            />
          ))}
          
          {isTyping && (
            <ChatbotMessage
              message={{
                id: 'typing',
                role: 'assistant',
                content: '',
                timestamp: new Date(),
                messageType: 'text',
                isLoading: true
              }}
              isTyping={true}
            />
          )}
          
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
}
