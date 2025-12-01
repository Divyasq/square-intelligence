import React from 'react';
import { Component } from '../../types/component';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useLibrary } from '../../context/LibraryContext';

interface ComponentCardProps {
  component: Component;
}

export function ComponentCard({ component }: ComponentCardProps) {
  const { setSelectedComponent } = useLibrary();
  
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow group"
      onClick={() => setSelectedComponent(component)}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {component.name}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{component.description}</p>
          </div>
          <Badge variant="primary">{component.category}</Badge>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-center min-h-[80px]">
            <component.component />
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {component.tags.map((tag) => (
            <Badge key={tag} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </Card>
  );
}