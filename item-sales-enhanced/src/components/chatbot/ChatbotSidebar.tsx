import React from 'react';
import { MessageSquare, Plus, Trash2, Clock, Download, Star } from 'lucide-react';
import { Conversation } from '../../types/chatbot';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

interface ChatbotSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onExportConversation: (id: string) => void;
  className?: string;
}

export function ChatbotSidebar({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onExportConversation,
  className
}: ChatbotSidebarProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric'
      }).format(date);
    }
  };

  const getPreviewText = (conversation: Conversation) => {
    const lastUserMessage = conversation.messages
      .filter(msg => msg.role === 'user')
      .pop();
    
    if (!lastUserMessage) return 'New conversation';
    
    const content = lastUserMessage.content;
    return content.length > 60 ? content.substring(0, 60) + '...' : content;
  };

  const getMessageCount = (conversation: Conversation) => {
    return conversation.messages.length;
  };

  const hasHighRatedMessages = (conversation: Conversation) => {
    return conversation.messages.some(msg => msg.metadata?.rating === 1);
  };

  return (
    <div className={cn("w-80 bg-gray-50 border-r border-gray-200 flex flex-col h-full", className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            AI Assistant
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
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p className="text-sm font-medium">No conversations yet</p>
            <p className="text-xs text-gray-400 mt-1">
              Start a new conversation to get help with anything!
            </p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={cn(
                  "group relative rounded-lg transition-colors",
                  currentConversationId === conversation.id
                    ? "bg-white shadow-sm border border-blue-200"
                    : "hover:bg-white hover:shadow-sm"
                )}
              >
                <button
                  onClick={() => onSelectConversation(conversation.id)}
                  className="w-full text-left p-3 rounded-lg"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={cn(
                          "font-medium text-sm truncate",
                          currentConversationId === conversation.id
                            ? "text-blue-900"
                            : "text-gray-900"
                        )}>
                          {conversation.title}
                        </h3>
                        {hasHighRatedMessages(conversation) && (
                          <Star className="h-3 w-3 text-yellow-500 fill-current flex-shrink-0" />
                        )}
                      </div>
                      
                      <p className="text-xs text-gray-500 mb-2 line-clamp-2">
                        {getPreviewText(conversation)}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatDate(conversation.updatedAt)}</span>
                        </div>
                        <span>{getMessageCount(conversation)} messages</span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Action buttons */}
                <div className={cn(
                  "absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
                  currentConversationId === conversation.id && "opacity-100"
                )}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onExportConversation(conversation.id);
                    }}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-blue-600"
                    title="Export conversation"
                  >
                    <Download className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm('Are you sure you want to delete this conversation?')) {
                        onDeleteConversation(conversation.id);
                      }
                    }}
                    className="h-6 w-6 p-0 text-gray-400 hover:text-red-600"
                    title="Delete conversation"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="text-xs text-gray-500 text-center space-y-1">
          <div>💡 Pro tip: Use Shift+Enter for new lines</div>
          <div>📎 Drag & drop files to attach them</div>
        </div>
      </div>
    </div>
  );
}
