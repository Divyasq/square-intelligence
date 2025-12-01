import React, { useState } from 'react';
import { ColorSwatch } from '../ui/ColorSwatch';

export function ColorSwatchDemo() {
  const [selectedColor1, setSelectedColor1] = useState('#006AFF');
  const [selectedColor2, setSelectedColor2] = useState('');
  const [selectedColor3, setSelectedColor3] = useState('#FF9F40');

  const primaryColors = [
    '#BDBDBD', '#990838', '#CC0023', '#F25B3D', '#FF9F40', '#FFBF00',
    '#A67C53', '#664A2E', '#19802A', '#00B23B', '#12BF94', '#006AFF',
    '#2693FF', '#8716D9', '#D936B0'
  ];

  const secondaryColors = [
    '#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563',
    '#374151', '#1F2937', '#111827'
  ];

  const brandColors = [
    '#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6', '#8B5CF6',
    '#EC4899', '#F59E0B'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Color Swatch</h2>
        <p className="text-gray-600 mb-6">
          Interactive color selection component with customizable color palettes.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Primary Colors</h3>
          <ColorSwatch
            colors={primaryColors}
            selectedColor={selectedColor1}
            onColorSelect={setSelectedColor1}
          />
          {selectedColor1 && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Selected: <span className="font-medium">{selectedColor1}</span>
                <span 
                  className="inline-block w-4 h-4 rounded ml-2 border border-gray-300"
                  style={{ backgroundColor: selectedColor1 }}
                />
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Grayscale Colors</h3>
          <ColorSwatch
            colors={secondaryColors}
            selectedColor={selectedColor2}
            onColorSelect={setSelectedColor2}
          />
          {selectedColor2 && (
            <div className="mt-3 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Selected: <span className="font-medium">{selectedColor2}</span>
                <span 
                  className="inline-block w-4 h-4 rounded ml-2 border border-gray-300"
                  style={{ backgroundColor: selectedColor2 }}
                />
              </p>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Brand Colors (Pre-selected)</h3>
          <ColorSwatch
            colors={brandColors}
            selectedColor={selectedColor3}
            onColorSelect={setSelectedColor3}
          />
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Selected: <span className="font-medium">{selectedColor3}</span>
              <span 
                className="inline-block w-4 h-4 rounded ml-2 border border-gray-300"
                style={{ backgroundColor: selectedColor3 }}
              />
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Custom Styling</h3>
          <div className="p-4 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-sm text-gray-600 mb-3">Compact layout with smaller swatches:</p>
            <ColorSwatch
              colors={brandColors.slice(0, 5)}
              selectedColor={selectedColor3}
              onColorSelect={setSelectedColor3}
              className="gap-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Features</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Click to select colors</li>
          <li>• Visual feedback with border highlights</li>
          <li>• Customizable color arrays</li>
          <li>• Hover effects and transitions</li>
          <li>• Accessible with proper ARIA labels</li>
        </ul>
      </div>
    </div>
  );
}