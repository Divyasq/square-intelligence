import React from 'react';
import { useChatbot } from '../../context/ChatbotContext';
import { ChatbotSidebar } from './ChatbotSidebar';
import { ChatbotMessages } from './ChatbotMessages';
import { ChatbotInput } from './ChatbotInput';
import { cn } from '../../utils/cn';

interface ChatbotInterfaceProps {
  className?: string;
  showSidebar?: boolean;
}

export function ChatbotInterface({ className, showSidebar = true }: ChatbotInterfaceProps) {
  const {
    state,
    sendMessage,
    regenerateMessage,
    createNewConversation,
    selectConversation,
    deleteConversation,
    exportConversation,
    rateMessage
  } = useChatbot();

  const currentMessages = state.currentConversation?.messages || [];

  const handleSendMessage = async (content: string, files?: File[]) => {
    await sendMessage(content, files);
  };

  const handleSuggestedQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  if (!showSidebar) {
    // Floating chat mode - no sidebar
    return (
      <div className={cn("flex flex-col h-full bg-white", className)}>
        {/* Messages */}
        <ChatbotMessages
          messages={currentMessages}
          isTyping={state.isTyping}
          onRegenerate={regenerateMessage}
          onRate={rateMessage}
          onSuggestedQuestionClick={handleSuggestedQuestionClick}
          showTimestamps={state.preferences.showTimestamps}
          className="flex-1"
        />

        {/* Input */}
        <ChatbotInput
          onSendMessage={handleSendMessage}
          isLoading={state.isLoading}
          isTyping={state.isTyping}
          disabled={false}
        />
      </div>
    );
  }

  // Full page mode - with sidebar
  return (
    <div className={cn("flex h-full bg-white", className)}>
      {/* Sidebar */}
      <ChatbotSidebar
        conversations={state.conversations}
        currentConversationId={state.currentConversation?.id || null}
        onSelectConversation={selectConversation}
        onNewConversation={createNewConversation}
        onDeleteConversation={deleteConversation}
        onExportConversation={exportConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Messages */}
        <ChatbotMessages
          messages={currentMessages}
          isTyping={state.isTyping}
          onRegenerate={regenerateMessage}
          onRate={rateMessage}
          onSuggestedQuestionClick={handleSuggestedQuestionClick}
          showTimestamps={state.preferences.showTimestamps}
        />

        {/* Input */}
        <ChatbotInput
          onSendMessage={handleSendMessage}
          isLoading={state.isLoading}
          isTyping={state.isTyping}
          disabled={false}
        />
      </div>
    </div>
  );
}
