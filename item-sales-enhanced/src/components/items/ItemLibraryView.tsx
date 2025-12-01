import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Plus, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import { Modal } from '../ui/Modal';

interface LibraryItem {
  id: string;
  name: string;
  category: string;
  image?: string;
  variations?: number;
  selected?: boolean;
}

const mockLibraryItems: LibraryItem[] = [
  { id: '1', name: 'Air Filters', category: 'General Merchandise', selected: true },
  { id: '2', name: 'Apparel (Tactical)', category: 'Other' },
  { id: '3', name: 'Appliances', category: 'Other', selected: true },
  { id: '4', name: 'Bedding / Bath', category: 'Other', variations: 7 },
  { id: '5', name: 'Bottoms', category: 'Other', variations: 5 },
  { id: '6', name: 'Christmas', category: 'Other', selected: true },
  { id: '7', name: 'Coffee', category: 'Coffee', variations: 4, selected: true },
  { id: '8', name: 'Dearfoam Slippers', category: 'Other' },
  { id: '9', name: 'Electronics', category: 'Electronics', selected: true },
  { id: '10', name: 'Element TV', category: 'Other' },
  { id: '11', name: 'Freight', category: 'Other' },
  { id: '12', name: 'Furniture', category: 'Furniture', variations: 3, selected: true },
];

export function ItemLibraryView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredItems = mockLibraryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const openAddRemoveModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Item library</h1>
            <p className="text-gray-600 mt-1">Browse and manage your item library</p>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 w-64"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Category</span>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Other</option>
                <option>All</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Locations</span>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>All</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Status</span>
              <select className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>Active</option>
              </select>
            </div>

            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              All filters
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={openAddRemoveModal}>
              Actions
            </Button>
            <Button>Create item</Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="border-b border-gray-200 p-4">
            <div className="grid grid-cols-12 gap-4 items-center text-sm font-medium text-gray-900">
              <div className="col-span-4 flex items-center gap-3">
                <Checkbox
                  checked={selectedItems.length === filteredItems.length}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                />
                <span>Item</span>
              </div>
              <div className="col-span-2">Reporting category</div>
              <div className="col-span-2">Locations</div>
              <div className="col-span-1 text-center">Stock on hand</div>
              <div className="col-span-1 text-center">Available to sell</div>
              <div className="col-span-1 text-right">Price</div>
              <div className="col-span-1 text-center">
                <MoreHorizontal className="h-4 w-4 mx-auto text-gray-400" />
              </div>
            </div>
          </div>
          
          {filteredItems.map((item) => (
            <div key={item.id} className="border-b border-gray-200 last:border-b-0 p-4 hover:bg-gray-50">
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 flex items-center gap-3">
                  <Checkbox
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => handleSelectItem(item.id, e.target.checked)}
                  />
                  <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                    <span className="text-xs text-gray-600">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium text-blue-600">{item.name}</div>
                    {item.variations && (
                      <div className="text-sm text-gray-500">{item.variations} variations</div>
                    )}
                  </div>
                </div>
                <div className="col-span-2 text-gray-600">{item.category}</div>
                <div className="col-span-2 text-gray-600">All locations</div>
                <div className="col-span-1 text-center text-gray-600">-</div>
                <div className="col-span-1 text-center text-gray-600">-</div>
                <div className="col-span-1 text-right">
                  {item.name === 'Air Filters' ? '$5.00/ea' : 
                   item.name === 'Coffee' ? '$20.00 - $29.50/ea' :
                   item.name === 'Rugs' ? '$50.00/ea' : 'Variable'}
                </div>
                <div className="col-span-1 text-center">
                  <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add or remove items"
        size="lg"
      >
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {mockLibraryItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs text-gray-600">{item.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="font-medium">{item.name}</div>
                  {item.variations && (
                    <div className="text-sm text-gray-500">{item.variations} variations</div>
                  )}
                </div>
              </div>
              <Checkbox
                checked={item.selected || false}
                onChange={() => {}}
              />
            </div>
          ))}
        </div>
        
        <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>
            Done
          </Button>
        </div>
      </Modal>
    </div>
  );
}
