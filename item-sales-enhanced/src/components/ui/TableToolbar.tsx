import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { SearchInput } from './SearchInput';
import { FilterButton } from './FilterButton';
import { Button } from './Button';

interface TableToolbarProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onCreateClick?: () => void;
  createButtonLabel?: string;
  showFilters?: boolean;
  className?: string;
}

export function TableToolbar({
  searchValue,
  onSearchChange,
  onCreateClick,
  createButtonLabel = 'Create item',
  showFilters = true,
  className
}: TableToolbarProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className}`}>
      <div className="flex items-center gap-2">
        <SearchInput
          placeholder="Search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        
        {showFilters && (
          <>
            <FilterButton showChevron={false}>
              Category
            </FilterButton>
            
            <FilterButton badge="Active">
              Status
            </FilterButton>
            
            <FilterButton>
              <Filter className="h-4 w-4" />
              All filters
            </FilterButton>
          </>
        )}
      </div>

      <div className="flex items-center gap-2">
        <FilterButton>
          Actions
        </FilterButton>
        
        <Button onClick={onCreateClick}>
          {createButtonLabel}
        </Button>
      </div>
    </div>
  );
}