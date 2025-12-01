import { ChatMessage, ChatConversation, ProductRecommendation, ChatResponse } from '../types/chat';

// Mock product data for recommendations
const mockProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    category: 'Electronics',
    price: 299.99,
    rating: 4.8,
    features: ['noise-canceling', 'wireless', 'long-battery'],
    description: 'High-quality wireless headphones with active noise canceling'
  },
  {
    id: '2',
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 449.99,
    rating: 4.6,
    features: ['ergonomic', 'adjustable', 'lumbar-support'],
    description: 'Professional office chair with lumbar support'
  },
  {
    id: '3',
    name: 'Smart Fitness Tracker',
    category: 'Health',
    price: 199.99,
    rating: 4.7,
    features: ['heart-rate', 'gps', 'waterproof'],
    description: 'Advanced fitness tracker with health monitoring'
  },
  {
    id: '4',
    name: 'Organic Coffee Beans',
    category: 'Food',
    price: 24.99,
    rating: 4.9,
    features: ['organic', 'fair-trade', 'single-origin'],
    description: 'Premium organic coffee beans from single origin farms'
  },
  {
    id: '5',
    name: 'Portable Power Bank',
    category: 'Electronics',
    price: 79.99,
    rating: 4.5,
    features: ['fast-charging', 'portable', 'high-capacity'],
    description: 'High-capacity portable charger for all devices'
  }
];

// Mock conversation starters
export const mockSuggestedQuestions = [
  "What is the best product for productivity?",
  "Show me highly rated electronics under $300",
  "What's the most popular item in the health category?",
  "Recommend something for working from home",
  "What are your top 3 products this month?",
  "Find me eco-friendly products",
  "What's good for fitness enthusiasts?",
  "Show me products with the highest ratings"
];

// Mock chat responses based on user input
export function generateMockChatResponse(userMessage: string): ChatResponse {
  const messageLower = userMessage.toLowerCase();
  
  // Best product queries
  if (messageLower.includes('best product') || messageLower.includes('top product')) {
    return {
      message: "Based on customer reviews and ratings, here are our top recommended products:",
      recommendations: [
        {
          id: '4',
          name: 'Organic Coffee Beans',
          reason: 'Highest customer rating (4.9/5) and consistently positive reviews',
          confidence: 0.95,
          category: 'Food',
          price: 24.99
        },
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          reason: 'Excellent sound quality and noise-canceling features',
          confidence: 0.88,
          category: 'Electronics',
          price: 299.99
        }
      ],
      suggestedQuestions: [
        "Tell me more about the coffee beans",
        "What makes the headphones special?",
        "Show me more highly rated products"
      ]
    };
  }
  
  // Electronics queries
  if (messageLower.includes('electronics') || messageLower.includes('tech')) {
    return {
      message: "Here are our top electronics products:",
      recommendations: mockProducts
        .filter(p => p.category === 'Electronics')
        .map(p => ({
          id: p.id,
          name: p.name,
          reason: `${p.rating}/5 rating with ${p.features.join(', ')} features`,
          confidence: p.rating / 5,
          category: p.category,
          price: p.price
        })),
      suggestedQuestions: [
        "Compare these electronics",
        "What's the cheapest electronics option?",
        "Show me wireless products"
      ]
    };
  }
  
  // Price-based queries
  if (messageLower.includes('under') || messageLower.includes('cheap') || messageLower.includes('budget')) {
    const budget = extractBudget(messageLower);
    const affordableProducts = mockProducts.filter(p => p.price <= budget);
    
    return {
      message: `Here are great products under $${budget}:`,
      recommendations: affordableProducts.map(p => ({
        id: p.id,
        name: p.name,
        reason: `Great value at $${p.price} with ${p.rating}/5 rating`,
        confidence: p.rating / 5,
        category: p.category,
        price: p.price
      })),
      suggestedQuestions: [
        "What's the absolute cheapest option?",
        "Show me mid-range products",
        "Compare these budget options"
      ]
    };
  }
  
  // Health/fitness queries
  if (messageLower.includes('health') || messageLower.includes('fitness') || messageLower.includes('workout')) {
    return {
      message: "Perfect for your health and fitness goals:",
      recommendations: [
        {
          id: '3',
          name: 'Smart Fitness Tracker',
          reason: 'Comprehensive health monitoring with GPS and heart rate tracking',
          confidence: 0.87,
          category: 'Health',
          price: 199.99
        }
      ],
      suggestedQuestions: [
        "What health features does it have?",
        "Show me more fitness products",
        "Is it waterproof for swimming?"
      ]
    };
  }
  
  // Work from home queries
  if (messageLower.includes('work from home') || messageLower.includes('office') || messageLower.includes('productivity')) {
    return {
      message: "Great choices for your home office setup:",
      recommendations: [
        {
          id: '2',
          name: 'Ergonomic Office Chair',
          reason: 'Essential for comfortable long work sessions with lumbar support',
          confidence: 0.86,
          category: 'Furniture',
          price: 449.99
        },
        {
          id: '1',
          name: 'Premium Wireless Headphones',
          reason: 'Perfect for video calls and focused work with noise canceling',
          confidence: 0.88,
          category: 'Electronics',
          price: 299.99
        }
      ],
      suggestedQuestions: [
        "What other office furniture do you have?",
        "Show me desk accessories",
        "What about lighting for home office?"
      ]
    };
  }
  
  // Default response
  return {
    message: "I'd be happy to help you find the perfect product! I can recommend items based on your needs, budget, or preferences. What are you looking for?",
    recommendations: mockProducts.slice(0, 2).map(p => ({
      id: p.id,
      name: p.name,
      reason: `Popular choice with ${p.rating}/5 rating`,
      confidence: p.rating / 5,
      category: p.category,
      price: p.price
    })),
    suggestedQuestions: mockSuggestedQuestions.slice(0, 4)
  };
}

function extractBudget(message: string): number {
  const match = message.match(/\$?(\d+)/);
  return match ? parseInt(match[1]) : 500; // Default budget
}

// Generate mock conversation history
export function generateMockConversations(): ChatConversation[] {
  return [
    {
      id: '1',
      title: 'Best Products Inquiry',
      createdAt: new Date(Date.now() - 86400000), // 1 day ago
      updatedAt: new Date(Date.now() - 86400000),
      messages: [
        {
          id: '1',
          content: 'What is the best product you have?',
          sender: 'user',
          timestamp: new Date(Date.now() - 86400000)
        },
        {
          id: '2',
          content: 'Based on customer reviews and ratings, our Organic Coffee Beans are our highest-rated product with a 4.9/5 rating!',
          sender: 'assistant',
          timestamp: new Date(Date.now() - 86400000 + 30000)
        }
      ]
    },
    {
      id: '2',
      title: 'Electronics Search',
      createdAt: new Date(Date.now() - 3600000), // 1 hour ago
      updatedAt: new Date(Date.now() - 3600000),
      messages: [
        {
          id: '3',
          content: 'Show me electronics under $300',
          sender: 'user',
          timestamp: new Date(Date.now() - 3600000)
        },
        {
          id: '4',
          content: 'Here are our top electronics under $300: Premium Wireless Headphones ($299.99) and Portable Power Bank ($79.99).',
          sender: 'assistant',
          timestamp: new Date(Date.now() - 3600000 + 45000)
        }
      ]
    }
  ];
}
