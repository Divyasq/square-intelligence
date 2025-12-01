import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ItemsNavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

const navigationItems = [
  { id: 'items', label: 'Items' },
  { id: 'item-library', label: 'Item library' },
  { id: 'channel-listings', label: 'Channel listings' },
  { id: 'service-library', label: 'Service library' },
  { id: 'image-library', label: 'Image library' },
  { id: 'modifiers', label: 'Modifiers' },
  { id: 'categories', label: 'Categories' },
  { id: 'discounts', label: 'Discounts' },
  { id: 'options', label: 'Options' },
  { id: 'units', label: 'Units' },
  { id: 'custom-attributes', label: 'Custom attributes' },
  { id: 'settings', label: 'Settings', hasSubmenu: true },
  { id: 'inventory-management', label: 'Inventory management', hasSubmenu: true },
  { id: 'gift-cards', label: 'Gift Cards', hasSubmenu: true },
  { id: 'subscription-plans', label: 'Subscription plans' },
];

export function ItemsNavigation({ currentView, onViewChange }: ItemsNavigationProps) {
  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900">Items & services</h2>
      </div>
      
      <nav className="p-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              'w-full flex items-center justify-between px-3 py-2 text-left text-sm rounded-md transition-colors',
              currentView === item.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            )}
          >
            <span>{item.label}</span>
            {item.hasSubmenu && (
              <ChevronDown className="h-4 w-4 text-gray-400" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
}
