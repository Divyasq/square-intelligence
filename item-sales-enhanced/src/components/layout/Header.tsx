import React from 'react';
import { Search } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';
import { Input } from '../ui/Input';

export function Header() {
  const { state, setSearchTerm } = useLibrary();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Square Components</h1>
              <p className="text-sm text-gray-500">Design System Library</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search components..."
                value={state.searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}