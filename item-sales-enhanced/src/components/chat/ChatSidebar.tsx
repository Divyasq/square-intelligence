import React from 'react';
import { MessageSquare, Plus, Trash2, Clock } from 'lucide-react';
import { ChatConversation } from '../../types/chat';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface ChatSidebarProps {
  conversations: ChatConversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  className?: string;
}

export function ChatSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  className
}: ChatSidebarProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  };

  const getPreviewText = (conversation: ChatConversation) => {
    const lastMessage = conversation.messages[conversation.messages.length - 1];
    if (!lastMessage) return 'New conversation';
    
    const content = lastMessage.content;
    return content.length > 60 ? content.substring(0, 60) + '...' : content;
  };

  return (
    <div className={cn("w-80 bg-gray-50 border-r border-gray-200 flex flex-col", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Product Assistant
          </h2>
        </div>
        <Button
          onClick={onNewConversation}
          className="w-full justify-start gap-2"
          variant="outline"
        >
          <Plus className="h-4 w-4" />
          New Conversation
        </Button>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {conversations.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm">No conversations yet</p>
            <p className="text-xs text-gray-400 mt-1">Start by asking about our products!</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-colors group",
                  "hover:bg-white hover:shadow-sm",
                  currentConversationId === conversation.id
                    ? "bg-white shadow-sm border border-blue-200"
                    : "hover:bg-gray-100"
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      "font-medium text-sm truncate",
                      currentConversationId === conversation.id
                        ? "text-blue-900"
                        : "text-gray-900"
                    )}>
                      {conversation.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {getPreviewText(conversation)}
                    </p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      <span>{formatDate(conversation.updatedAt)}</span>
                      <span className="ml-auto">
                        {conversation.messages.length} messages
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="text-xs text-gray-500 text-center">
          Ask me anything about our products!
        </div>
      </div>
    </div>
  );
}
