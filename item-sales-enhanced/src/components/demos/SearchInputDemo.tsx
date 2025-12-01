import React, { useState } from 'react';
import { SearchInput } from '../ui/SearchInput';

export function SearchInputDemo() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Search Input</h2>
        <p className="text-gray-600 mb-6">
          A search input component with an integrated search icon and consistent styling.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Usage</h3>
          <SearchInput
            placeholder="Search items..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Custom Placeholder</h3>
          <SearchInput
            placeholder="Search for products, categories, or SKUs..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Different States</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Default</label>
              <SearchInput placeholder="Search..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">With Value</label>
              <SearchInput placeholder="Search..." value="Sample search" readOnly />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Disabled</label>
              <SearchInput placeholder="Search..." disabled />
            </div>
          </div>
        </div>

        {searchValue && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Current search value: <span className="font-medium">{searchValue}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}