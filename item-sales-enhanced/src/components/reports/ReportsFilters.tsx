import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { useReports } from '../../context/ReportsContext';

interface FilterOption {
  label: string;
  value: string;
  options: string[];
}

export function ReportsFilters() {
  const { state, updateFilters } = useReports();
  
  const [filterValues, setFilterValues] = useState({
    'Report type': 'Summary',
    'Locations': state.filters.location,
    'View': 'Gauge',
    'Group metric by': state.filters.groupBy,
    'Filter by': state.filters.timeframe
  });
  
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const filterOptions: FilterOption[] = [
    {
      label: 'Report type',
      value: filterValues['Report type'],
      options: ['Summary', 'Hourly', 'Daily', 'Weekly', 'Monthly']
    },
    {
      label: 'Locations',
      value: filterValues['Locations'],
      options: ['All', 'Location 1', 'Location 2', 'Location 3']
    },
    {
      label: 'View',
      value: filterValues['View'],
      options: ['Gauge', 'Table', 'Chart']
    },
    {
      label: 'Group metric by',
      value: filterValues['Group metric by'],
      options: ['All', 'Category', 'Item', 'Staff']
    },
    {
      label: 'Filter by',
      value: filterValues['Filter by'],
      options: ['All day', 'Morning', 'Afternoon', 'Evening']
    }
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (openDropdown) {
        const dropdownRef = dropdownRefs.current[openDropdown];
        if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
          setOpenDropdown(null);
        }
      }
    }

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const handleFilterChange = (filterLabel: string, newValue: string) => {
    setFilterValues(prev => ({
      ...prev,
      [filterLabel]: newValue
    }));
    setOpenDropdown(null);
    
    // Update context if needed
    if (filterLabel === 'Locations') {
      updateFilters({ location: newValue });
    } else if (filterLabel === 'Group metric by') {
      updateFilters({ groupBy: newValue });
    } else if (filterLabel === 'Filter by') {
      updateFilters({ timeframe: newValue });
    }
  };

  const toggleDropdown = (filterLabel: string) => {
    setOpenDropdown(openDropdown === filterLabel ? null : filterLabel);
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-700">Metrics</span>
          <span className="text-gray-500">Gross sales & 25 others</span>
          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400">
            <MoreHorizontal className="h-3 w-3" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          {filterOptions.map((filter, index) => (
            <div 
              key={index} 
              className="flex items-center gap-1 relative"
              ref={el => dropdownRefs.current[filter.label] = el}
            >
              <span className="text-xs text-gray-500">{filter.label}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 text-xs bg-gray-100 hover:bg-gray-200"
                onClick={() => toggleDropdown(filter.label)}
              >
                {filter.value}
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
              
              {/* Dropdown Menu */}
              {openDropdown === filter.label && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 min-w-[120px]">
                  {filter.options.map((option) => (
                    <button
                      key={option}
                      className="w-full px-3 py-2 text-left text-xs hover:bg-gray-50 first:rounded-t-md last:rounded-b-md"
                      onClick={() => handleFilterChange(filter.label, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Active filter indicator */}
          <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            <span className="text-xs">Timeframe: All day</span>
            <Button variant="ghost" size="sm" className="h-4 w-4 p-0 text-blue-600 hover:bg-blue-200">
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="text-xs text-gray-500">
            Filter by
          </Button>
        </div>
      </div>
    </div>
  );
}
