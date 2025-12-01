import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { FAQ as FAQType } from '../../types/education';

interface FAQSectionProps {
  faqs: FAQType[];
  title?: string;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ 
  faqs, 
  title = "Frequently Asked Questions" 
}) => {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(faqs.map(faq => faq.category)))];
  
  const filteredFAQs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  const toggleFAQ = (faqId: string) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      general: 'bg-blue-100 text-blue-800',
      timing: 'bg-green-100 text-green-800',
      definitions: 'bg-purple-100 text-purple-800',
      'edge-cases': 'bg-orange-100 text-orange-800',
      calculations: 'bg-indigo-100 text-indigo-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600" />
          {title}
        </h3>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category === 'all' ? 'All' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </button>
        ))}
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFAQs.map((faq) => (
          <Card key={faq.id} className="overflow-hidden">
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getCategoryColor(faq.category)}>
                      {faq.category.replace('-', ' ')}
                    </Badge>
                  </div>
                  <h4 className="font-medium text-gray-900 pr-4">
                    {faq.question}
                  </h4>
                </div>
                {expandedFAQ === faq.id ? (
                  <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </div>
            </button>
            
            {expandedFAQ === faq.id && (
              <div className="px-4 pb-4 border-t border-gray-100">
                <div className="pt-4">
                  <p className="text-gray-700 mb-4">{faq.answer}</p>
                  
                  {faq.examples && faq.examples.length > 0 && (
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Examples:</h5>
                      <ul className="space-y-1">
                        {faq.examples.map((example, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredFAQs.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No FAQs found for the selected category.
        </div>
      )}
    </div>
  );
};
