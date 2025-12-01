import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';
import { useTransactions } from '../../context/TransactionsContext';

export function TransactionsHeader() {
  const { state } = useTransactions();
  
  const formatDateRange = () => {
    const start = state.filters.dateRange.start;
    const end = state.filters.dateRange.end;
    
    const startStr = start.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    const endStr = end.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    
    return `${startStr}–${endStr}`;
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Date Range */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-md">
              <span className="text-sm font-medium text-gray-700">
                {formatDateRange()}
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="text-sm text-gray-600">
            {state.summary.timeRange}
          </div>
        </div>

        {/* Right side - Export */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            Export
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
}
