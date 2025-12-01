import React, { useState } from 'react';
import { FilterButton } from '../ui/FilterButton';
import { Filter, Calendar, User, Package } from 'lucide-react';

export function FilterButtonDemo() {
  const [activeFilter, setActiveFilter] = useState('');

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Filter Button</h2>
        <p className="text-gray-600 mb-6">
          A versatile filter button component with optional chevron, badges, and icons.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Buttons</h3>
          <div className="flex flex-wrap gap-3">
            <FilterButton onClick={() => setActiveFilter('category')}>
              Category
            </FilterButton>
            <FilterButton showChevron={false} onClick={() => setActiveFilter('tags')}>
              Tags
            </FilterButton>
            <FilterButton badge="All" onClick={() => setActiveFilter('status')}>
              Status
            </FilterButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">With Icons</h3>
          <div className="flex flex-wrap gap-3">
            <FilterButton onClick={() => setActiveFilter('filters')}>
              <Filter className="h-4 w-4" />
              All filters
            </FilterButton>
            <FilterButton badge="Today" onClick={() => setActiveFilter('date')}>
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </FilterButton>
            <FilterButton showChevron={false} onClick={() => setActiveFilter('user')}>
              <User className="h-4 w-4 mr-2" />
              Assigned to
            </FilterButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Status Badges</h3>
          <div className="flex flex-wrap gap-3">
            <FilterButton badge="Active" onClick={() => setActiveFilter('active')}>
              Status
            </FilterButton>
            <FilterButton badge="3 selected" onClick={() => setActiveFilter('items')}>
              Items
            </FilterButton>
            <FilterButton badge="In Stock" onClick={() => setActiveFilter('inventory')}>
              <Package className="h-4 w-4 mr-2" />
              Inventory
            </FilterButton>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Interactive Example</h3>
          <div className="flex flex-wrap gap-3">
            {['Category', 'Price Range', 'Location', 'Date'].map((filter) => (
              <FilterButton
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={activeFilter === filter ? 'bg-blue-50 border-blue-300' : ''}
              >
                {filter}
              </FilterButton>
            ))}
          </div>
        </div>

        {activeFilter && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              Active filter: <span className="font-medium">{activeFilter}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}