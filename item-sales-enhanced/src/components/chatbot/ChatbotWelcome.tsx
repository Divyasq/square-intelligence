import React from 'react';
import { conversationTemplates } from '../../data/chatbotData';
import { Button } from '../ui/Button';
import { 
  Sparkles, 
  Code, 
  FileText, 
  Search, 
  MessageSquare, 
  Lightbulb,
  Zap,
  BookOpen
} from 'lucide-react';

interface ChatbotWelcomeProps {
  onSuggestedQuestionClick?: (question: string) => void;
  className?: string;
}

const quickActions = [
  {
    icon: Code,
    title: 'Code Help',
    description: 'Get help with programming, debugging, and code review',
    question: 'I need help with my code. Can you review it and suggest improvements?'
  },
  {
    icon: FileText,
    title: 'Document Analysis',
    description: 'Upload and analyze documents, extract key information',
    question: 'I have a document I\'d like you to analyze. Can you help me understand its content?'
  },
  {
    icon: Search,
    title: 'Research Help',
    description: 'Get current information and detailed explanations',
    question: 'Can you help me research the latest information about this topic?'
  },
  {
    icon: Lightbulb,
    title: 'Problem Solving',
    description: 'Step-by-step guidance for complex problems',
    question: 'I have a complex problem I need to solve. Can you guide me through it step by step?'
  }
];

const exampleQuestions = [
  'Explain how React hooks work with examples',
  'Help me debug this JavaScript function',
  'What are the latest trends in web development?',
  'How do I optimize my code for better performance?',
  'Can you review my project structure?',
  'What\'s the best way to handle errors in my application?'
];

export function ChatbotWelcome({ onSuggestedQuestionClick, className }: ChatbotWelcomeProps) {
  return (
    <div className={`p-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI Assistant
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            I'm here to help you with coding, document analysis, research, and problem-solving. 
            What would you like to work on today?
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => onSuggestedQuestionClick?.(action.question)}
                className="h-auto p-4 text-left justify-start hover:bg-blue-50 hover:border-blue-200 transition-colors group"
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{action.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {action.description}
                    </p>
                  </div>
                </div>
              </Button>
            );
          })}
        </div>

        {/* Conversation Templates */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-blue-500" />
            Quick Start Templates
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {conversationTemplates.map((template) => (
              <Button
                key={template.id}
                variant="ghost"
                onClick={() => onSuggestedQuestionClick?.(template.initialMessage)}
                className="h-auto p-3 text-left justify-start hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 w-full">
                  <Zap className="h-4 w-4 text-gray-500" />
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{template.title}</h4>
                    <p className="text-xs text-gray-600 mt-1">{template.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Example Questions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-500" />
            Example Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {exampleQuestions.map((question, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => onSuggestedQuestionClick?.(question)}
                className="h-auto p-3 text-left justify-start hover:bg-gray-100 transition-colors text-sm"
              >
                <div className="flex items-start gap-2 w-full">
                  <span className="text-gray-400 mt-0.5">•</span>
                  <span className="text-gray-700">{question}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">What I can help you with:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4 text-blue-500" />
                <span className="text-gray-700">Code review and debugging</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-500" />
                <span className="text-gray-700">Document analysis and processing</span>
              </div>
              <div className="flex items-center gap-2">
                <Search className="h-4 w-4 text-purple-500" />
                <span className="text-gray-700">Research and information gathering</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <span className="text-gray-700">Problem-solving guidance</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-indigo-500" />
                <span className="text-gray-700">Natural conversations</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-pink-500" />
                <span className="text-gray-700">Creative assistance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">
            Ready to get started? Type your question below or choose from the suggestions above.
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>💡 Pro tip: Be specific for better results</span>
            <span>📎 You can also upload files</span>
          </div>
        </div>
      </div>
    </div>
  );
}
