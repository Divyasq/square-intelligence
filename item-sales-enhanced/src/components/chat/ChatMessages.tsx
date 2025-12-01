import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';
import { SuggestedQuestions } from './SuggestedQuestions';
import { ChatMessage as ChatMessageType } from '../../types/chat';
import { cn } from '../../utils/cn';

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isTyping?: boolean;
  onSuggestedQuestionClick: (question: string) => void;
  className?: string;
}

export function ChatMessages({ 
  messages, 
  isTyping = false, 
  onSuggestedQuestionClick,
  className 
}: ChatMessagesProps) {
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
        <SuggestedQuestions 
          onQuestionClick={onSuggestedQuestionClick}
          className="h-full flex items-center justify-center"
        />
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
            />
          ))}
          
          {isTyping && (
            <ChatMessage
              message={{
                id: 'typing',
                content: '',
                sender: 'assistant',
                timestamp: new Date(),
                isTyping: true
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
