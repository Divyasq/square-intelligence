import React from 'react';
import { ChevronDown, X, Search } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTransactions } from '../../context/TransactionsContext';

export function TransactionsFilters() {
  const { state, updateFilters, clearFilters, searchTransactions } = useTransactions();

  const filterOptions = [
    {
      label: 'All Payment Methods',
      value: 'All Payment Methods',
      options: ['All Payment Methods', 'Card', 'Cash', 'Gift Card']
    },
    {
      label: 'All Types',
      value: 'All Types',
      options: ['All Types', 'Sale', 'Refund', 'Void', 'Comp']
    },
    {
      label: 'Complete',
      value: 'Complete',
      options: ['Complete', 'Pending', 'Failed', 'Voided']
    },
    {
      label: 'All locations',
      value: 'All locations',
      options: ['All locations', 'Main Location', 'Secondary Location']
    },
    {
      label: 'All Sources',
      value: 'All Sources',
      options: ['All Sources', 'POS', 'Online', 'Mobile']
    },
    {
      label: 'All Team Members',
      value: 'All Team Members',
      options: ['All Team Members', 'Peng F SL', 'Divya C SL', 'Hank D SL']
    },
    {
      label: 'All Fees',
      value: 'All Fees',
      options: ['All Fees', 'Processing Fees', 'Service Fees']
    },
    {
      label: 'Card #',
      value: 'Card #',
      options: ['Card #', 'Last 4 digits']
    }
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchTransactions(e.target.value);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-2 flex-wrap">
        {filterOptions.map((filter, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs bg-gray-100 hover:bg-gray-200 gap-1"
          >
            {filter.value}
            <ChevronDown className="h-3 w-3" />
          </Button>
        ))}
        
        {/* Search Input */}
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Filter by cost (text #)"
            onChange={handleSearch}
            className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 w-64"
          />
        </div>
      </div>
    </div>
  );
}
