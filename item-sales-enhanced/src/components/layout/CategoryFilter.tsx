import React from 'react';
import { useLibrary } from '../../context/LibraryContext';
import { Badge } from '../ui/Badge';
import * as Icons from 'lucide-react';

export function CategoryFilter() {
  const { state, setSelectedCategory } = useLibrary();
  
  return (
    <div className="bg-white border-r border-gray-200 w-64 min-h-screen p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Categories</h2>
      <div className="space-y-2">
        {state.categories.map((category) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons] as any;
          const isSelected = state.selectedCategory === category.id;
          
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isSelected 
                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {IconComponent && <IconComponent className="h-5 w-5" />}
              <div className="flex-1">
                <div className="font-medium">{category.name}</div>
                <div className="text-xs text-gray-500">{category.description}</div>
              </div>
              <Badge variant={isSelected ? 'primary' : 'default'}>
                {category.components.length}
              </Badge>
            </button>
          );
        })}
      </div>
    </div>
  );
}