import React from 'react';
import { ProductForm } from '../ui/ProductForm';

export function ProductFormDemo() {
  const handleSubmit = (formData: any) => {
    console.log('Form submitted:', formData);
    // In a real app, this would send the data to an API
    alert('Product form submitted! Check the console for details.');
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto">
        <ProductForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}