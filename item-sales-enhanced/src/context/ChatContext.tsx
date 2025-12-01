import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ChatState, ChatMessage, ChatConversation } from '../types/chat';
import { generateMockChatResponse, generateMockConversations } from '../data/mockChatData';

interface ChatContextType {
  state: ChatState;
  dispatch: React.Dispatch<ChatAction>;
  sendMessage: (content: string) => Promise<void>;
  startNewConversation: () => void;
  selectConversation: (conversationId: string) => void;
  getCurrentConversation: () => ChatConversation | null;
}

type ChatAction =
  | { type: 'SET_CONVERSATIONS'; payload: ChatConversation[] }
  | { type: 'SET_CURRENT_CONVERSATION'; payload: string | null }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: ChatMessage } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'ADD_CONVERSATION'; payload: ChatConversation }
  | { type: 'UPDATE_CONVERSATION'; payload: ChatConversation };

const initialState: ChatState = {
  conversations: generateMockConversations(),
  currentConversationId: null,
  isLoading: false,
  isTyping: false,
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_CONVERSATIONS':
      return { ...state, conversations: action.payload };
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversationId: action.payload };
    case 'ADD_MESSAGE':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.conversationId
            ? {
                ...conv,
                messages: [...conv.messages, action.payload.message],
                updatedAt: new Date()
              }
            : conv
        )
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversationId: action.payload.id
      };
    case 'UPDATE_CONVERSATION':
      return {
        ...state,
        conversations: state.conversations.map(conv =>
          conv.id === action.payload.id ? action.payload : conv
        )
      };
    default:
      return state;
  }
}

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const generateConversationId = () => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    let conversationId = state.currentConversationId;

    // Create new conversation if none exists
    if (!conversationId) {
      const newConversation: ChatConversation = {
        id: generateConversationId(),
        title: content.length > 50 ? content.substring(0, 50) + '...' : content,
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      dispatch({ type: 'ADD_CONVERSATION', payload: newConversation });
      conversationId = newConversation.id;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: generateMessageId(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    dispatch({ 
      type: 'ADD_MESSAGE', 
      payload: { conversationId, message: userMessage } 
    });

    // Simulate typing delay
    dispatch({ type: 'SET_TYPING', payload: true });
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Generate mock response
      const response = generateMockChatResponse(content);
      
      const assistantMessage: ChatMessage = {
        id: generateMessageId(),
        content: response.message,
        sender: 'assistant',
        timestamp: new Date()
      };

      dispatch({ 
        type: 'ADD_MESSAGE', 
        payload: { conversationId, message: assistantMessage } 
      });

      // Add recommendations as separate messages if they exist
      if (response.recommendations && response.recommendations.length > 0) {
        const recommendationsMessage: ChatMessage = {
          id: generateMessageId(),
          content: `**Recommendations:**\n\n${response.recommendations.map(rec => 
            `• **${rec.name}** (${rec.category}) - $${rec.price}\n  ${rec.reason}\n  Confidence: ${Math.round(rec.confidence * 100)}%`
          ).join('\n\n')}`,
          sender: 'assistant',
          timestamp: new Date()
        };

        // Add slight delay for recommendations
        setTimeout(() => {
          dispatch({ 
            type: 'ADD_MESSAGE', 
            payload: { conversationId, message: recommendationsMessage } 
          });
        }, 500);
      }

      // Add suggested questions if they exist
      if (response.suggestedQuestions && response.suggestedQuestions.length > 0) {
        const suggestionsMessage: ChatMessage = {
          id: generateMessageId(),
          content: `**You might also ask:**\n${response.suggestedQuestions.map(q => `• ${q}`).join('\n')}`,
          sender: 'assistant',
          timestamp: new Date()
        };

        setTimeout(() => {
          dispatch({ 
            type: 'ADD_MESSAGE', 
            payload: { conversationId, message: suggestionsMessage } 
          });
        }, 1000);
      }

    } catch (error) {
      const errorMessage: ChatMessage = {
        id: generateMessageId(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'assistant',
        timestamp: new Date()
      };

      dispatch({ 
        type: 'ADD_MESSAGE', 
        payload: { conversationId, message: errorMessage } 
      });
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
    }
  };

  const startNewConversation = () => {
    dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: null });
  };

  const selectConversation = (conversationId: string) => {
    dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversationId });
  };

  const getCurrentConversation = (): ChatConversation | null => {
    if (!state.currentConversationId) return null;
    return state.conversations.find(conv => conv.id === state.currentConversationId) || null;
  };

  return (
    <ChatContext.Provider
      value={{
        state,
        dispatch,
        sendMessage,
        startNewConversation,
        selectConversation,
        getCurrentConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
