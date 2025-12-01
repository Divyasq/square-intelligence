import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { ChatbotState, Message, Conversation, UserPreferences, UploadedFile } from '../types/chatbot';
import { generateChatbotResponse, generateConversationTitle, processFile } from '../data/chatbotData';

interface ChatbotContextType {
  state: ChatbotState;
  dispatch: React.Dispatch<ChatbotAction>;
  sendMessage: (content: string, files?: File[]) => Promise<void>;
  regenerateMessage: (messageId: string) => Promise<void>;
  createNewConversation: () => void;
  selectConversation: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  exportConversation: (conversationId: string) => void;
  rateMessage: (messageId: string, rating: number) => void;
}

type ChatbotAction =
  | { type: 'SET_CURRENT_CONVERSATION'; payload: Conversation | null }
  | { type: 'ADD_MESSAGE'; payload: { conversationId: string; message: Message } }
  | { type: 'UPDATE_MESSAGE'; payload: { conversationId: string; messageId: string; updates: Partial<Message> } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_TYPING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'ADD_CONVERSATION'; payload: Conversation }
  | { type: 'DELETE_CONVERSATION'; payload: string }
  | { type: 'UPDATE_PREFERENCES'; payload: Partial<UserPreferences> }
  | { type: 'UPDATE_USAGE'; payload: { messagesCount?: number; tokensUsed?: number; filesUploaded?: number } };

const initialPreferences: UserPreferences = {
  theme: 'light',
  language: 'en',
  autoSave: true,
  showTimestamps: true,
  enableSounds: false,
};

const initialState: ChatbotState = {
  currentConversation: null,
  conversations: [],
  isLoading: false,
  isTyping: false,
  error: null,
  preferences: initialPreferences,
  usage: {
    messagesCount: 0,
    tokensUsed: 0,
    conversationsCount: 0,
    filesUploaded: 0,
  },
};

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

function chatbotReducer(state: ChatbotState, action: ChatbotAction): ChatbotState {
  switch (action.type) {
    case 'SET_CURRENT_CONVERSATION':
      return { ...state, currentConversation: action.payload };
    
    case 'ADD_MESSAGE':
      const updatedConversations = state.conversations.map(conv =>
        conv.id === action.payload.conversationId
          ? {
              ...conv,
              messages: [...conv.messages, action.payload.message],
              updatedAt: new Date()
            }
          : conv
      );
      
      return {
        ...state,
        conversations: updatedConversations,
        currentConversation: state.currentConversation?.id === action.payload.conversationId
          ? {
              ...state.currentConversation,
              messages: [...state.currentConversation.messages, action.payload.message],
              updatedAt: new Date()
            }
          : state.currentConversation
      };
    
    case 'UPDATE_MESSAGE':
      const conversationsWithUpdatedMessage = state.conversations.map(conv =>
        conv.id === action.payload.conversationId
          ? {
              ...conv,
              messages: conv.messages.map(msg =>
                msg.id === action.payload.messageId
                  ? { ...msg, ...action.payload.updates }
                  : msg
              )
            }
          : conv
      );
      
      return {
        ...state,
        conversations: conversationsWithUpdatedMessage,
        currentConversation: state.currentConversation?.id === action.payload.conversationId
          ? {
              ...state.currentConversation,
              messages: state.currentConversation.messages.map(msg =>
                msg.id === action.payload.messageId
                  ? { ...msg, ...action.payload.updates }
                  : msg
              )
            }
          : state.currentConversation
      };
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_TYPING':
      return { ...state, isTyping: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    
    case 'ADD_CONVERSATION':
      return {
        ...state,
        conversations: [action.payload, ...state.conversations],
        currentConversation: action.payload,
        usage: {
          ...state.usage,
          conversationsCount: state.usage.conversationsCount + 1
        }
      };
    
    case 'DELETE_CONVERSATION':
      const filteredConversations = state.conversations.filter(conv => conv.id !== action.payload);
      return {
        ...state,
        conversations: filteredConversations,
        currentConversation: state.currentConversation?.id === action.payload 
          ? (filteredConversations[0] || null)
          : state.currentConversation
      };
    
    case 'UPDATE_PREFERENCES':
      return {
        ...state,
        preferences: { ...state.preferences, ...action.payload }
      };
    
    case 'UPDATE_USAGE':
      return {
        ...state,
        usage: { ...state.usage, ...action.payload }
      };
    
    default:
      return state;
  }
}

export function ChatbotProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatbotReducer, initialState);

  const generateMessageId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const generateConversationId = () => `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = useCallback(async (content: string, files?: File[]) => {
    if (!content.trim() && !files?.length) return;

    let conversationId = state.currentConversation?.id;

    // Create new conversation if none exists
    if (!conversationId) {
      const newConversation: Conversation = {
        id: generateConversationId(),
        title: generateConversationTitle(content),
        messages: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        settings: {
          model: 'gpt-4',
          temperature: 0.7,
          maxTokens: 2048
        }
      };
      
      dispatch({ type: 'ADD_CONVERSATION', payload: newConversation });
      conversationId = newConversation.id;
    }

    // Process uploaded files
    let processedFiles: UploadedFile[] = [];
    if (files?.length) {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        
        for (const file of files) {
          const processedContent = await processFile(file);
          const uploadedFile: UploadedFile = {
            id: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: file.name,
            size: file.size,
            type: file.type,
            content: processedContent,
            uploadedAt: new Date()
          };
          processedFiles.push(uploadedFile);
        }
        
        dispatch({ type: 'UPDATE_USAGE', payload: { filesUploaded: state.usage.filesUploaded + files.length } });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'File processing failed' });
        dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }
    }

    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      role: 'user',
      content,
      timestamp: new Date(),
      messageType: files?.length ? 'file' : 'text',
      metadata: processedFiles.length ? { files: processedFiles } : undefined
    };

    dispatch({ 
      type: 'ADD_MESSAGE', 
      payload: { conversationId, message: userMessage } 
    });

    // Update usage stats
    dispatch({ type: 'UPDATE_USAGE', payload: { messagesCount: state.usage.messagesCount + 1 } });

    // Generate AI response
    dispatch({ type: 'SET_TYPING', payload: true });
    dispatch({ type: 'SET_LOADING', payload: false });
    
    try {
      const conversationHistory = state.currentConversation?.messages || [];
      const responseContent = await generateChatbotResponse(content, conversationHistory);
      
      const assistantMessage: Message = {
        id: generateMessageId(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date(),
        messageType: 'text'
      };

      dispatch({ 
        type: 'ADD_MESSAGE', 
        payload: { conversationId, message: assistantMessage } 
      });

      dispatch({ type: 'UPDATE_USAGE', payload: { messagesCount: state.usage.messagesCount + 1 } });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to generate response' });
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
    }
  }, [state.currentConversation, state.usage]);

  const regenerateMessage = useCallback(async (messageId: string) => {
    if (!state.currentConversation) return;

    const messageIndex = state.currentConversation.messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1 || messageIndex === 0) return;

    const previousMessage = state.currentConversation.messages[messageIndex - 1];
    if (previousMessage.role !== 'user') return;

    dispatch({ type: 'SET_TYPING', payload: true });
    
    try {
      const conversationHistory = state.currentConversation.messages.slice(0, messageIndex);
      const responseContent = await generateChatbotResponse(previousMessage.content, conversationHistory);
      
      dispatch({
        type: 'UPDATE_MESSAGE',
        payload: {
          conversationId: state.currentConversation.id,
          messageId,
          updates: {
            content: responseContent,
            timestamp: new Date(),
            metadata: { ...state.currentConversation.messages[messageIndex].metadata, regenerated: true }
          }
        }
      });

    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error instanceof Error ? error.message : 'Failed to regenerate response' });
    } finally {
      dispatch({ type: 'SET_TYPING', payload: false });
    }
  }, [state.currentConversation]);

  const createNewConversation = useCallback(() => {
    dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: null });
  }, []);

  const selectConversation = useCallback((conversationId: string) => {
    const conversation = state.conversations.find(conv => conv.id === conversationId);
    if (conversation) {
      dispatch({ type: 'SET_CURRENT_CONVERSATION', payload: conversation });
    }
  }, [state.conversations]);

  const deleteConversation = useCallback((conversationId: string) => {
    dispatch({ type: 'DELETE_CONVERSATION', payload: conversationId });
  }, []);

  const updatePreferences = useCallback((preferences: Partial<UserPreferences>) => {
    dispatch({ type: 'UPDATE_PREFERENCES', payload: preferences });
  }, []);

  const exportConversation = useCallback((conversationId: string) => {
    const conversation = state.conversations.find(conv => conv.id === conversationId);
    if (!conversation) return;

    const exportData = {
      title: conversation.title,
      createdAt: conversation.createdAt,
      messages: conversation.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp
      }))
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `conversation-${conversation.title.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [state.conversations]);

  const rateMessage = useCallback((messageId: string, rating: number) => {
    if (!state.currentConversation) return;

    dispatch({
      type: 'UPDATE_MESSAGE',
      payload: {
        conversationId: state.currentConversation.id,
        messageId,
        updates: {
          metadata: {
            ...state.currentConversation.messages.find(msg => msg.id === messageId)?.metadata,
            rating
          }
        }
      }
    });
  }, [state.currentConversation]);

  return (
    <ChatbotContext.Provider
      value={{
        state,
        dispatch,
        sendMessage,
        regenerateMessage,
        createNewConversation,
        selectConversation,
        deleteConversation,
        updatePreferences,
        exportConversation,
        rateMessage,
      }}
    >
      {children}
    </ChatbotContext.Provider>
  );
}

export function useChatbot() {
  const context = useContext(ChatbotContext);
  if (context === undefined) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
}
