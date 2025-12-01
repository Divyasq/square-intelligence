import React from 'react';
import { mockSuggestedQuestions } from '../../data/mockChatData';
import { Button } from '../ui/Button';
import { Sparkles, ShoppingBag, TrendingUp, Star } from 'lucide-react';

interface SuggestedQuestionsProps {
  onQuestionClick: (question: string) => void;
  className?: string;
}

export function SuggestedQuestions({ onQuestionClick, className }: SuggestedQuestionsProps) {
  const questionIcons = [
    TrendingUp,
    ShoppingBag,
    Star,
    Sparkles,
    TrendingUp,
    ShoppingBag,
    Star,
    Sparkles
  ];

  return (
    <div className={`p-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Sparkles className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            How can I help you today?
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Ask me anything about our products, get recommendations, or find what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {mockSuggestedQuestions.map((question, index) => {
            const Icon = questionIcons[index % questionIcons.length];
            return (
              <Button
                key={index}
                variant="outline"
                onClick={() => onQuestionClick(question)}
                className="h-auto p-4 text-left justify-start hover:bg-blue-50 hover:border-blue-200 transition-colors group"
              >
                <div className="flex items-start gap-3 w-full">
                  <Icon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 leading-relaxed">
                    {question}
                  </span>
                </div>
              </Button>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Or type your own question in the chat box below
          </p>
        </div>
      </div>
    </div>
  );
}
