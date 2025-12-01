import React from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

export function TransactionsNavigation() {
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'orders-payments', label: 'Orders & payments', active: true },
    { id: 'transactions', label: 'Transactions', active: true, isSubItem: true },
    { id: 'orders', label: 'Orders', active: false, expandable: true },
    { id: 'invoices', label: 'Invoices', active: false, expandable: true },
    { id: 'virtual-terminal', label: 'Virtual Terminal', active: false, expandable: true },
    { id: 'payment-links', label: 'Payment links', active: false, expandable: true },
    { id: 'subscriptions', label: 'Subscriptions', active: false },
    { id: 'disputes', label: 'Disputes', active: false },
    { id: 'risk-manager', label: 'Risk Manager', active: false, expandable: true }
  ];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full overflow-y-auto">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/reports')}
            className="h-8 w-8 p-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="font-semibold text-gray-900">Orders & payments</h2>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="p-2">
        {navigationItems.map((item) => (
          <div key={item.id} className="mb-1">
            <button
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                item.active 
                  ? item.isSubItem
                    ? 'bg-blue-100 text-blue-700 font-medium ml-4'
                    : 'bg-blue-100 text-blue-700 font-medium'
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
          </div>
        ))}
      </div>
    </div>
  );
}
