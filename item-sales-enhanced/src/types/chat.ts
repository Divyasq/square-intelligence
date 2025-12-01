export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatState {
  conversations: ChatConversation[];
  currentConversationId: string | null;
  isLoading: boolean;
  isTyping: boolean;
}

export interface ProductRecommendation {
  id: string;
  name: string;
  reason: string;
  confidence: number;
  category: string;
  price?: number;
}

export interface ChatResponse {
  message: string;
  recommendations?: ProductRecommendation[];
  suggestedQuestions?: string[];
}
