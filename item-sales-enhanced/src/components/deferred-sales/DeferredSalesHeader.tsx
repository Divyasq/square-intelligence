import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Download, MoreHorizontal, HelpCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { useDeferredSales } from '../../context/DeferredSalesContext';

export function DeferredSalesHeader() {
  const { selectedScenario, dateRange, setDateRange } = useDeferredSales();
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const formatDateRange = () => {
    const start = dateRange.start;
    const end = dateRange.end;
    
    const startStr = start.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
    const endStr = end.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
    
    return `${startStr} – ${endStr}`;
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const currentStart = dateRange.start;
    const currentEnd = dateRange.end;
    const daysDiff = Math.ceil((currentEnd.getTime() - currentStart.getTime()) / (1000 * 60 * 60 * 24));
    
    const newStart = new Date(currentStart);
    const newEnd = new Date(currentEnd);
    
    if (direction === 'prev') {
      newStart.setDate(newStart.getDate() - daysDiff - 1);
      newEnd.setDate(newEnd.getDate() - daysDiff - 1);
    } else {
      newStart.setDate(newStart.getDate() + daysDiff + 1);
      newEnd.setDate(newEnd.getDate() + daysDiff + 1);
    }
    
    setDateRange({ start: newStart, end: newEnd });
  };

  const handleDatePreset = (preset: string) => {
    const today = new Date();
    let newStart: Date;
    let newEnd: Date;

    switch (preset) {
      case 'july5':
        newStart = new Date(2025, 6, 5); // July 5, 2025
        newEnd = new Date(2025, 6, 5);
        break;
      case 'july10':
        newStart = new Date(2025, 6, 10); // July 10, 2025
        newEnd = new Date(2025, 6, 10);
        break;
      case 'july5-15':
        newStart = new Date(2025, 6, 5); // July 5, 2025
        newEnd = new Date(2025, 6, 15); // July 15, 2025
        break;
      default:
        newStart = new Date(2025, 6, 29); // July 29, 2025
        newEnd = new Date(2025, 6, 30); // July 30, 2025
    }

    setDateRange({ start: newStart, end: newEnd });
    setShowDatePicker(false);
  };

  const title = selectedScenario ? selectedScenario.title : 'Deferred Sales';

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title and Date Navigation */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateDate('prev')}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="relative">
              <div 
                className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-md cursor-pointer hover:bg-gray-100"
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  {formatDateRange()}
                </span>
              </div>
              
              {/* Date Picker Dropdown */}
              {showDatePicker && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-48">
                  <div className="p-2">
                    <div className="text-xs font-medium text-gray-500 mb-2">Quick Select</div>
                    <div className="space-y-1">
                      <button
                        onClick={() => handleDatePreset('july5')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        July 5, 2025 (Deposit Day)
                      </button>
                      <button
                        onClick={() => handleDatePreset('july10')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        July 10, 2025 (Remaining Payment)
                      </button>
                      <button
                        onClick={() => handleDatePreset('july5-15')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        July 5-15, 2025 (Full Cycle)
                      </button>
                      <button
                        onClick={() => handleDatePreset('default')}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        July 29-30, 2025 (Default)
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateDate('next')}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
            Beta
          </span>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Download className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <HelpCircle className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Click outside to close date picker */}
      {showDatePicker && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setShowDatePicker(false)}
        />
      )}
    </div>
  );
}
