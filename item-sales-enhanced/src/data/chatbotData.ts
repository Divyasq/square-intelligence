import { Message, Conversation, CodeBlock, SearchResult } from '../types/chatbot';

// Mock AI responses based on user input
export function generateChatbotResponse(userMessage: string, conversationHistory: Message[]): Promise<string> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const messageLower = userMessage.toLowerCase();
      
      // Code-related queries
      if (messageLower.includes('code') || messageLower.includes('function') || messageLower.includes('javascript') || messageLower.includes('react')) {
        resolve(`Here's a code example for your request:

\`\`\`javascript
function handleUserInput(input) {
  if (!input.trim()) {
    return 'Please enter a valid message';
  }
  
  return processMessage(input);
}

// Usage example
const result = handleUserInput('Hello, world!');
console.log(result);
\`\`\`

This function demonstrates basic input validation and processing. Would you like me to explain any part of this code or show you a different approach?`);
      }
      
      // Technical questions
      if (messageLower.includes('how to') || messageLower.includes('explain') || messageLower.includes('what is')) {
        resolve(`Great question! Let me break this down for you:

**Key Points:**
• This is a comprehensive explanation of your query
• I'll provide step-by-step guidance
• Include relevant examples and best practices

**Detailed Answer:**
Based on your question, here's what you need to know:

1. **First Step**: Start with understanding the fundamentals
2. **Second Step**: Apply the concepts with practical examples  
3. **Third Step**: Test and iterate on your implementation

Would you like me to dive deeper into any of these points or provide specific examples?`);
      }
      
      // File-related queries
      if (messageLower.includes('file') || messageLower.includes('upload') || messageLower.includes('document')) {
        resolve(`I can help you with file-related tasks! Here's what I can do:

**File Operations:**
• **Upload & Analysis**: Upload documents, images, or code files for analysis
• **Format Conversion**: Convert between different file formats
• **Content Extraction**: Extract text, data, or metadata from files
• **Code Review**: Analyze code files for improvements and suggestions

**Supported File Types:**
- Documents: PDF, DOC, TXT, MD
- Images: JPG, PNG, GIF, SVG
- Code: JS, TS, PY, HTML, CSS
- Data: JSON, CSV, XML

Would you like to upload a file or need help with a specific file operation?`);
      }
      
      // Search-related queries
      if (messageLower.includes('search') || messageLower.includes('find') || messageLower.includes('current') || messageLower.includes('latest')) {
        resolve(`I can help you find current information! Here are some recent results:

**Search Results:**
🔍 **Latest Updates on Your Topic**
- Recent developments and news
- Current best practices and trends
- Updated documentation and resources

**Key Findings:**
• **Current Status**: Based on the latest information available
• **Recent Changes**: What's new since the last update
• **Recommendations**: Best practices for your specific use case

Would you like me to search for more specific information or dive deeper into any of these results?`);
      }
      
      // Conversation context
      if (conversationHistory.length > 0) {
        const lastMessage = conversationHistory[conversationHistory.length - 1];
        if (lastMessage.role === 'assistant') {
          resolve(`I see you're following up on our previous discussion. Let me build on what we talked about:

**Context from our conversation:**
Based on your previous question, I can provide more specific guidance tailored to your needs.

**Additional insights:**
• This connects to what we discussed earlier
• Here are some advanced techniques you might find useful
• I can help you implement these concepts step by step

Is there a particular aspect you'd like to explore further?`);
        }
      }
      
      // Default helpful response
      resolve(`I'm here to help! I can assist you with:

**💬 Conversations**: Natural, contextual discussions on any topic
**💻 Code**: Programming help, debugging, and code examples
**📄 Documents**: File analysis, content extraction, and processing
**🔍 Research**: Current information and detailed explanations
**🎯 Problem Solving**: Step-by-step guidance for complex tasks

What would you like to work on today? Feel free to ask me anything or upload a file if you need help with a specific document!`);
    }, 1000 + Math.random() * 2000);
  });
}

// Mock code execution
export function executeCode(code: string, language: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (language === 'javascript') {
        resolve(`// Code execution result:
console.log("Hello, World!");
// Output: Hello, World!

// Code executed successfully!`);
      } else {
        resolve(`Code execution completed for ${language}:
Output: [Mock execution result]
Status: Success`);
      }
    }, 1500);
  });
}

// Mock web search
export function performWebSearch(query: string): Promise<SearchResult[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        {
          title: `Latest information about ${query}`,
          snippet: `Recent developments and updates related to ${query}. This includes current best practices, new features, and community discussions.`,
          url: `https://example.com/search/${query.replace(/\s+/g, '-')}`,
          timestamp: new Date()
        },
        {
          title: `${query} - Documentation and Guides`,
          snippet: `Comprehensive documentation and step-by-step guides for ${query}. Includes tutorials, examples, and troubleshooting tips.`,
          url: `https://docs.example.com/${query.replace(/\s+/g, '-')}`,
          timestamp: new Date(Date.now() - 86400000)
        },
        {
          title: `Community Discussion: ${query}`,
          snippet: `Active community discussions and Q&A about ${query}. Real-world examples and solutions from experienced developers.`,
          url: `https://community.example.com/topics/${query.replace(/\s+/g, '-')}`,
          timestamp: new Date(Date.now() - 172800000)
        }
      ];
      resolve(mockResults);
    }, 800);
  });
}

// Mock file processing
export function processFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        reject(new Error('File size exceeds 50MB limit'));
        return;
      }
      
      const fileType = file.type;
      const fileName = file.name;
      
      if (fileType.startsWith('text/') || fileType === 'application/json') {
        resolve(`**File Analysis Complete**

**File:** ${fileName}
**Type:** ${fileType}
**Size:** ${(file.size / 1024).toFixed(2)} KB

**Content Summary:**
I've analyzed your file and found:
• Text-based content with structured data
• Key sections and important information identified
• No issues or errors detected

**Key Insights:**
• The file contains well-formatted content
• Structure appears to be valid and complete
• Ready for further processing or analysis

Would you like me to extract specific information or perform additional analysis on this file?`);
      } else if (fileType.startsWith('image/')) {
        resolve(`**Image Analysis Complete**

**File:** ${fileName}
**Type:** ${fileType}
**Size:** ${(file.size / 1024).toFixed(2)} KB

**Image Details:**
• Image format is supported and valid
• Quality appears to be good
• No corruption detected

**Analysis Results:**
• Image contains visual content suitable for analysis
• Text extraction capabilities available if needed
• Ready for further image processing tasks

What would you like me to do with this image?`);
      } else {
        resolve(`**File Processing Complete**

**File:** ${fileName}
**Type:** ${fileType}
**Size:** ${(file.size / 1024).toFixed(2)} KB

**Processing Results:**
• File format recognized and processed
• Content structure analyzed
• No critical issues found

**Available Actions:**
• Content extraction and analysis
• Format conversion options
• Detailed examination of file structure

How would you like to proceed with this file?`);
      }
    }, 2000);
  });
}

// Generate conversation title from first message
export function generateConversationTitle(firstMessage: string): string {
  const message = firstMessage.trim();
  if (message.length <= 50) {
    return message;
  }
  return message.substring(0, 50) + '...';
}

// Mock conversation templates
export const conversationTemplates = [
  {
    id: 'code-review',
    title: 'Code Review',
    description: 'Get feedback on your code',
    initialMessage: 'I have some code I\'d like you to review. Can you help me identify any issues and suggest improvements?'
  },
  {
    id: 'debug-help',
    title: 'Debug Help',
    description: 'Troubleshoot coding issues',
    initialMessage: 'I\'m having trouble with my code. It\'s not working as expected. Can you help me debug it?'
  },
  {
    id: 'explain-concept',
    title: 'Explain Concept',
    description: 'Learn about technical topics',
    initialMessage: 'Can you explain this technical concept to me in simple terms with examples?'
  },
  {
    id: 'document-analysis',
    title: 'Document Analysis',
    description: 'Analyze uploaded documents',
    initialMessage: 'I have a document I\'d like you to analyze. Can you help me understand its content and extract key information?'
  }
];
