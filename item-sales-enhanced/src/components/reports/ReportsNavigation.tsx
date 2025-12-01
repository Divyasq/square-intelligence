import React from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function ReportsNavigation() {
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'sales', label: 'Sales', active: true, subitems: [
      { id: 'sales-summary', label: 'Sales summary', active: true },
      { id: 'item-sales', label: 'Item sales', active: false },
      { id: 'sales-trends', label: 'Sales trends', active: false },
      { id: 'category-sales', label: 'Category sales', active: false },
      { id: 'team-sales', label: 'Team sales', active: false },
      { id: 'modifier-sales', label: 'Modifier sales', active: false },
      { id: 'gift-cards', label: 'Gift Cards', active: false },
      { id: 'future-bookings', label: 'Future bookings', active: false },
      { id: 'section-sales', label: 'Section sales', active: false },
      { id: 'vendor-sales', label: 'Vendor sales', active: false }
    ]},
    { id: 'accounting', label: 'Accounting', active: false, expandable: true },
    { id: 'payments', label: 'Payments', active: false, expandable: true },
    { id: 'operations', label: 'Operations', active: false, expandable: true },
    { id: 'online', label: 'Online', active: false, expandable: true },
    { id: 'inventory', label: 'Inventory', active: false, expandable: true },
    { id: 'custom-reports', label: 'Custom reports', active: false },
    { id: 'settings', label: 'Settings', active: false, expandable: true }
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold text-gray-900">Reports</h2>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-2">
        {navigationItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                item.active 
                  ? 'bg-blue-100 text-blue-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{item.label}</span>
                {item.expandable && (
                  <ChevronDown className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </button>
            
            {/* Subitems for Sales */}
            {item.id === 'sales' && item.subitems && (
              <div className="ml-4 mt-1 space-y-1">
                {item.subitems.map((subitem) => (
                  <button
                    key={subitem.id}
                    className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                      subitem.active 
                        ? 'bg-blue-100 text-blue-700 font-medium' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {subitem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
