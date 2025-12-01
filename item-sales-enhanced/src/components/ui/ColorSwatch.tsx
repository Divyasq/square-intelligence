import React, { useState } from 'react';
import { cn } from '../../utils/cn';

interface ColorSwatchProps {
  colors: string[];
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
  className?: string;
}

export function ColorSwatch({ 
  colors, 
  selectedColor, 
  onColorSelect, 
  className 
}: ColorSwatchProps) {
  const [selected, setSelected] = useState(selectedColor || '');

  const handleColorSelect = (color: string) => {
    setSelected(color);
    onColorSelect?.(color);
  };

  return (
    <div className={cn('flex flex-wrap gap-3', className)}>
      {colors.map((color, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleColorSelect(color)}
          className={cn(
            'w-10 h-10 rounded-sm border-2 transition-all',
            selected === color 
              ? 'border-blue-500 scale-110' 
              : 'border-gray-300 hover:border-gray-400'
          )}
          style={{ backgroundColor: color }}
          aria-label={`Select color ${color}`}
        />
      ))}
    </div>
  );
}