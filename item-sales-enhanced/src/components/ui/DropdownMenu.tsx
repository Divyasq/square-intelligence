import React, { useState, useRef, useEffect } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DropdownMenuProps {
  trigger: React.ReactNode;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function DropdownMenu({ trigger, onEdit, onDelete }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleEdit = () => {
    onEdit?.();
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete?.();
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer"
      >
        {trigger}
      </div>
      
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          <button
            onClick={handleEdit}
            className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Edit className="h-4 w-4" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
