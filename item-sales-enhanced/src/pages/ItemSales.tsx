import React, { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, ChevronRight, ChevronDown } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  category: string;
  locations: string;
  stockOnHand: number | string;
  availableToSell: number | string;
  price: string;
  image?: string;
}

const ItemSales: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Shoes');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Items']);

  const sampleItems: Item[] = [
    {
      id: '1',
      name: 'Dearfoam Slippers',
      category: 'Shoes',
      locations: 'All locations',
      stockOnHand: '-',
      availableToSell: '-',
      price: '$10.00/ea'
    },
    {
      id: '2',
      name: "Men's Shoes",
      category: 'Shoes',
      locations: 'All locations',
      stockOnHand: '-',
      availableToSell: '-',
      price: '$10.00 - $25.00/ea'
    },
    {
      id: '3',
      name: "Women's Shoes",
      category: 'Shoes',
      locations: 'All locations',
      stockOnHand: '-',
      availableToSell: '-',
      price: '$10.00 - $25.00/ea'
    }
  ];

  const categories = [
    'Item library',
    'Channel listings',
    'Service library',
    'Image library',
    'Modifiers',
    'Categories',
    'Discounts',
    'Options',
    'Units',
    'Custom attributes'
  ];

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200">
        <div className="p-4">
          <div className="flex items-center mb-6">
            <button className="mr-3 p-1">
              <ChevronRight className="w-4 h-4" />
            </button>
            <h2 className="text-lg font-semibold">Items & services</h2>
          </div>
          
          <nav className="space-y-1">
            <div className="mb-4">
              <button 
                onClick={() => toggleCategory('Items')}
                className="flex items-center w-full text-left px-2 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-md"
              >
                {expandedCategories.includes('Items') ? (
                  <ChevronDown className="w-4 h-4 mr-2" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2" />
                )}
                Items
              </button>
              
              {expandedCategories.includes('Items') && (
                <div className="ml-6 space-y-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={`block w-full text-left px-2 py-2 text-sm rounded-md ${
                        category === 'Item library' 
                          ? 'bg-blue-50 text-blue-700 font-medium' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
        
        {/* Bottom sections */}
        <div className="absolute bottom-0 w-64 p-4 space-y-2">
          <div className="space-y-1">
            <button className="flex items-center w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <ChevronRight className="w-4 h-4 mr-2" />
              Settings
            </button>
            <button className="flex items-center w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <ChevronRight className="w-4 h-4 mr-2" />
              Inventory management
            </button>
            <button className="flex items-center w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <ChevronRight className="w-4 h-4 mr-2" />
              Gift Cards
            </button>
            <button className="block w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              Subscription plans
            </button>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <button className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md">
              <div className="w-6 h-6 bg-blue-600 rounded mr-2 flex items-center justify-center">
                <span className="text-white text-xs">💳</span>
              </div>
              Take payment
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Category</span>
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>Shoes</option>
                  <option>Clothing</option>
                  <option>Accessories</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Locations</span>
                <select 
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>All</option>
                  <option>Store 1</option>
                  <option>Store 2</option>
                </select>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Status</span>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>All</option>
                </select>
              </div>
              
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                All filters
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                Actions
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Create Item
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300" />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reporting category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Locations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock on hand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available to sell
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <Plus className="w-4 h-4" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sampleItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded mr-3 flex items-center justify-center">
                        <span className="text-gray-500 text-xs">👟</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer">
                          {item.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.locations}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.stockOnHand}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.availableToSell}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{item.price}</td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ItemSales;
