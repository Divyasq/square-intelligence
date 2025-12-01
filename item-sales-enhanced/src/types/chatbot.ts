export type MessageRole = 'user' | 'assistant';
export type MessageType = 'text' | 'code' | 'file' | 'image';
export type Theme = 'light' | 'dark';

export interface MessageMetadata {
  files?: UploadedFile[];
  codeLanguage?: string;
  searchQuery?: string;
  regenerated?: boolean;
  rating?: number;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  messageType: MessageType;
  metadata?: MessageMetadata;
  isLoading?: boolean;
  error?: string;
}

export interface ConversationSettings {
  model: string;
  temperature: number;
  maxTokens: number;
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  settings: ConversationSettings;
}

export interface UserPreferences {
  theme: Theme;
  language: string;
  autoSave: boolean;
  showTimestamps: boolean;
  enableSounds: boolean;
}

export interface UsageStats {
  messagesCount: number;
  tokensUsed: number;
  conversationsCount: number;
  filesUploaded: number;
}

export interface UserSession {
  sessionId: string;
  conversations: Conversation[];
  preferences: UserPreferences;
  usage: UsageStats;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  content: string | ArrayBuffer;
  uploadedAt: Date;
}

export interface ChatbotState {
  currentConversation: Conversation | null;
  conversations: Conversation[];
  isLoading: boolean;
  isTyping: boolean;
  error: string | null;
  preferences: UserPreferences;
  usage: UsageStats;
}

export interface SuggestedAction {
  id: string;
  label: string;
  icon: string;
  action: () => void;
}

export interface CodeBlock {
  language: string;
  code: string;
  filename?: string;
}

export interface SearchResult {
  title: string;
  snippet: string;
  url: string;
  timestamp: Date;
}
