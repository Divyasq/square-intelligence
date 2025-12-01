import React from 'react';
import { useChat } from '../../context/ChatContext';
import { ChatSidebar } from './ChatSidebar';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { cn } from '../../utils/cn';

interface ChatInterfaceProps {
  className?: string;
  showSidebar?: boolean;
}

export function ChatInterface({ className, showSidebar = true }: ChatInterfaceProps) {
  const {
    state,
    sendMessage,
    startNewConversation,
    selectConversation,
    getCurrentConversation
  } = useChat();

  const currentConversation = getCurrentConversation();
  const messages = currentConversation?.messages || [];

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleSuggestedQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  if (!showSidebar) {
    // Floating chat mode - no sidebar
    return (
      <div className={cn("flex flex-col h-full bg-white", className)}>
        {/* Messages */}
        <ChatMessages
          messages={messages}
          isTyping={state.isTyping}
          onSuggestedQuestionClick={handleSuggestedQuestionClick}
          className="flex-1"
        />

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={state.isLoading}
          disabled={state.isTyping}
        />
      </div>
    );
  }

  // Full page mode - with sidebar
  return (
    <div className={cn("flex h-full bg-white", className)}>
      {/* Sidebar */}
      <ChatSidebar
        conversations={state.conversations}
        currentConversationId={state.currentConversationId}
        onSelectConversation={selectConversation}
        onNewConversation={startNewConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <ChatMessages
          messages={messages}
          isTyping={state.isTyping}
          onSuggestedQuestionClick={handleSuggestedQuestionClick}
        />

        {/* Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          isLoading={state.isLoading}
          disabled={state.isTyping}
        />
      </div>
    </div>
  );
}
