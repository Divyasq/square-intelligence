import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { ComponentCard } from './ComponentCard';

export function ComponentList() {
  const { getFilteredComponents, state } = useLibrary();
  const components = getFilteredComponents();

  if (components.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2M4 13h2m-2 0v-2a2 2 0 012-2h2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No components found</h3>
        <p className="text-gray-500 text-center max-w-md">
          {state.searchTerm 
            ? `No components match "${state.searchTerm}". Try adjusting your search term.`
            : 'No components available in this category.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {components.map((component) => (
        <ComponentCard key={component.id} component={component} />
      ))}
    </div>
  );
}