import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Download, MoreHorizontal, HelpCircle, Clock } from 'lucide-react';
import { Button } from '../ui/Button';
import { useReports } from '../../context/ReportsContext';
import { useNavigate } from 'react-router-dom';

export function ReportsHeader() {
  const { state, updateFilters } = useReports();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  
  const formatDateRange = () => {
    const start = state.filters.dateRange.start;
    const end = state.filters.dateRange.end;
    
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
    const currentStart = state.filters.dateRange.start;
    const currentEnd = state.filters.dateRange.end;
    const daysDiff = Math.ceil((currentEnd.getTime() - currentStart.getTime()) / (1000 * 60 * 60 * 24));
    
    const newStart = new Date(currentStart);
    const newEnd = new Date(currentEnd);
    
    if (direction === 'prev') {
      newStart.setDate(newStart.getDate() - daysDiff);
      newEnd.setDate(newEnd.getDate() - daysDiff);
    } else {
      newStart.setDate(newStart.getDate() + daysDiff);
      newEnd.setDate(newEnd.getDate() + daysDiff);
    }
    
    updateFilters({
      dateRange: { start: newStart, end: newEnd }
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title and Date Navigation */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold text-gray-900">Sales summary</h1>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateDate('prev')}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-md">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {formatDateRange()}
              </span>
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
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/financial-suite/scheduled-exports')}
            className="flex items-center gap-1 h-8 px-3"
          >
            <Clock className="h-4 w-4" />
            <span className="text-sm">Schedule</span>
          </Button>
          
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
    </div>
  );
}
