import React, { useState } from 'react';
import { MessageCircle, X, Minimize2, Maximize2, Settings } from 'lucide-react';
import { ChatbotInterface } from './ChatbotInterface';
import { cn } from '../../utils/cn';

interface FloatingChatbotProps {
  className?: string;
}

export function FloatingChatbot({ className }: FloatingChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const toggleChat = () => {
    if (isOpen && !isMinimized) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      setIsMinimized(false);
    }
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  const closeChat = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  return (
    <div className={cn("fixed bottom-4 right-4 z-50", className)}>
      {/* Chat Window */}
      {isOpen && (
        <div
          className={cn(
            "bg-white rounded-lg shadow-2xl border border-gray-200 transition-all duration-300 ease-in-out mb-4",
            isMinimized 
              ? "w-80 h-16" 
              : "w-96 h-[600px] max-h-[80vh]"
          )}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                {!isMinimized && (
                  <p className="text-xs text-gray-600">Ask me anything!</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              {!isMinimized ? (
                <>
                  <button
                    onClick={minimizeChat}
                    className="p-1.5 hover:bg-white/50 rounded transition-colors"
                    title="Minimize"
                  >
                    <Minimize2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={closeChat}
                    className="p-1.5 hover:bg-white/50 rounded transition-colors"
                    title="Close"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={maximizeChat}
                    className="p-1.5 hover:bg-white/50 rounded transition-colors"
                    title="Maximize"
                  >
                    <Maximize2 className="h-4 w-4 text-gray-500" />
                  </button>
                  <button
                    onClick={closeChat}
                    className="p-1.5 hover:bg-white/50 rounded transition-colors"
                    title="Close"
                  >
                    <X className="h-4 w-4 text-gray-500" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <div className="h-[calc(100%-65px)]">
              <ChatbotInterface showSidebar={false} className="h-full" />
            </div>
          )}
        </div>
      )}

      {/* Chat Bubble Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
          title="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
          
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
            <span className="text-xs text-white font-bold">!</span>
          </div>
        </button>
      )}

      {/* Minimized Chat Indicator */}
      {isOpen && isMinimized && (
        <button
          onClick={maximizeChat}
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center mb-4"
          title="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
