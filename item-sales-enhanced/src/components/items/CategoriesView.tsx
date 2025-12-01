import React, { useState } from 'react';
import { Search, Grid, List, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';

interface Category {
  id: string;
  name: string;
  items: number;
}

const mockCategories: Category[] = [
  { id: '1', name: 'Bedding / Bath', items: 1 },
  { id: '2', name: 'General Merchandise', items: 4 },
  { id: '3', name: 'Halloween', items: 1 },
  { id: '4', name: "Men's Clothing", items: 1 },
  { id: '5', name: "Men's Clothing", items: 4 },
  { id: '6', name: 'Other', items: 10 },
  { id: '7', name: 'Pantry', items: 1 },
  { id: '8', name: 'Shoes', items: 3 },
  { id: '9', name: 'Sundries', items: 1 },
  { id: '10', name: 'Tactical', items: 2 },
  { id: '11', name: 'TVs', items: 12 },
  { id: '12', name: "Women's Clothing", items: 5 },
];

export function CategoriesView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectCategory = (categoryId: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, categoryId]);
    } else {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCategories(filteredCategories.map(cat => cat.id));
    } else {
      setSelectedCategories([]);
    }
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline">Rearrange</Button>
            <Button>Create category</Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {viewMode === 'list' ? (
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={selectedCategories.length === filteredCategories.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <span className="font-medium text-gray-900">Name</span>
                <div className="ml-auto">
                  <span className="font-medium text-gray-900">Items</span>
                </div>
              </div>
            </div>
            
            {filteredCategories.map((category) => (
              <div key={category.id} className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => handleSelectCategory(category.id, e.target.checked)}
                  />
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600">{category.name.charAt(0)}</span>
                  </div>
                  <span className="text-gray-900">{category.name}</span>
                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-gray-600">{category.items}</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredCategories.map((category) => (
              <div key={category.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3 mb-2">
                  <Checkbox
                    checked={selectedCategories.includes(category.id)}
                    onChange={(e) => handleSelectCategory(category.id, e.target.checked)}
                  />
                  <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600">{category.name.charAt(0)}</span>
                  </div>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.items} items</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
