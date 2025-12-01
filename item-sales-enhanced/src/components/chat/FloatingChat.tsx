import React from 'react';
import { FloatingChatbot } from '../chatbot/FloatingChatbot';

interface FloatingChatProps {
  className?: string;
}

export function FloatingChat({ className }: FloatingChatProps) {
  return <FloatingChatbot className={className} />;
}
