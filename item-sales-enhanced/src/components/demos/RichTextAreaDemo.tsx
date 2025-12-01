import React, { useState } from 'react';
import { RichTextArea } from '../ui/RichTextArea';

export function RichTextAreaDemo() {
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('Sample text with some content to demonstrate the rich text editor.');
  const [content3, setContent3] = useState('');

  const handleGenerate = () => {
    const sampleTexts = [
      'This is a generated description showcasing the AI-powered text generation feature.',
      'A professionally crafted description that demonstrates the automatic content creation capabilities.',
      'Generated content that helps users quickly create compelling descriptions for their items.'
    ];
    setContent3(sampleTexts[Math.floor(Math.random() * sampleTexts.length)]);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Rich Text Area</h2>
        <p className="text-gray-600 mb-6">
          An enhanced textarea with formatting toolbar and AI generation capabilities.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Rich Text Area</h3>
          <RichTextArea
            label="Description"
            value={content1}
            onChange={(e) => setContent1(e.target.value)}
            placeholder="Start typing to see the formatting toolbar appear..."
            className="min-h-[120px]"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">With Existing Content</h3>
          <RichTextArea
            label="Product Description"
            value={content2}
            onChange={(e) => setContent2(e.target.value)}
            placeholder="Enter product description..."
            className="min-h-[120px]"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">With AI Generation</h3>
          <RichTextArea
            label="Marketing Copy"
            value={content3}
            onChange={(e) => setContent3(e.target.value)}
            placeholder="Write marketing copy or use AI to generate it..."
            showGenerateButton={true}
            onGenerate={handleGenerate}
            className="min-h-[120px]"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Smaller Size</h3>
          <RichTextArea
            label="Quick Note"
            value=""
            onChange={() => {}}
            placeholder="Add a quick note..."
            className="min-h-[80px]"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">With Error State</h3>
          <RichTextArea
            label="Required Field"
            value=""
            onChange={() => {}}
            placeholder="This field is required..."
            error="Please enter a description"
            className="min-h-[100px]"
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Formatting Features</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>Bold</strong>, <em>Italic</em>, and <u>Underline</u> formatting</li>
          <li>• List creation and management</li>
          <li>• Toolbar appears on focus for better UX</li>
          <li>• AI-powered content generation</li>
          <li>• Consistent styling with form components</li>
        </ul>
      </div>
    </div>
  );
}