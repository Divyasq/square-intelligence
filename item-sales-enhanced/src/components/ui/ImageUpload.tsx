import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void;
  maxFiles?: number;
  className?: string;
}

export function ImageUpload({ onImagesChange, maxFiles = 5, className }: ImageUploadProps) {
  const [images, setImages] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    const newImages = [...images, ...files].slice(0, maxFiles);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = [...images, ...files].slice(0, maxFiles);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div
        className={cn(
          'border-2 border-dashed border-gray-300 rounded-lg p-6 text-center transition-colors',
          dragActive && 'border-blue-500 bg-blue-50',
          'hover:border-gray-400'
        )}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={() => setDragActive(true)}
        onDragLeave={() => setDragActive(false)}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">
          Drag and drop images here, or{' '}
          <label className="text-blue-600 hover:text-blue-500 cursor-pointer font-medium">
            browse
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-xs text-gray-500">
          Upload up to {maxFiles} images
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(image)}
                alt={`Upload ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}