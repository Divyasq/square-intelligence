import React from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function FullCycleTransactionPage() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/deferred-sales');
  };

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleBackClick}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <span className="text-sm font-medium text-gray-700">Orders & payments</span>
            
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-600">08/06/2025</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>All day</option>
            </select>
            
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>All Payment Methods</option>
            </select>
            
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>All Types</option>
            </select>
            
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>Complete</option>
            </select>
            
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>All locations</option>
            </select>
            
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>All Sources</option>
            </select>
            
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>All Team Members</option>
            </select>
            
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>All Fees</option>
            </select>
            
            <select className="text-xs border border-gray-300 rounded px-2 py-1">
              <option>Card #</option>
            </select>
            
            <input 
              type="text" 
              placeholder="Filter by card (last 4)"
              className="text-xs border border-gray-300 rounded px-2 py-1 w-32"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="bg-white rounded-lg shadow h-full flex flex-col">
            {/* Date Header */}
            <div className="px-4 py-3 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Aug 6, 2025</h2>
            </div>

            {/* Summary Stats */}
            <div className="px-4 py-3 border-b border-gray-200">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="text-xl font-bold text-gray-900">1</div>
                  <div className="flex items-center text-xs text-gray-600 mt-1">
                    <span>COMPLETE TRANSACTION</span>
                    <HelpCircle className="w-3 h-3 ml-1 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <div className="text-xl font-bold text-gray-900">$1,000.00</div>
                  <div className="flex items-center text-xs text-gray-600 mt-1">
                    <span>TOTAL COLLECTED</span>
                    <HelpCircle className="w-3 h-3 ml-1 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction List */}
            <div className="px-4 py-3 flex-1">
              <div className="text-xs text-gray-600 mb-3">Wednesday, August 6, 2025</div>
              
              <div className="bg-blue-600 text-white rounded px-3 py-2">
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-3 bg-white bg-opacity-20 rounded text-xs flex items-center justify-center">
                    📄
                  </div>
                  <span className="text-xs font-medium">
                    Invoice #000033: Invoice with deposit - Collected by Approve Test SL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-72 bg-white border-l border-gray-200 p-4 flex-shrink-0">
          <div className="mb-4">
            <h3 className="text-base font-semibold text-gray-900 mb-1">$1,000.00 Payment</h3>
            <div className="text-xs text-gray-600 mb-3">Aug 6, 2025 1:20 pm</div>
            
            <div className="space-y-1 text-xs">
              <div>Collected by: <span className="font-medium">Approve Test at SL</span></div>
              <div>Source: <span className="font-medium">Invoices</span></div>
              <div>Sale attributed to: <span className="font-medium text-blue-600">Approve Test</span></div>
              <div>Paid by: <span className="font-medium">Claire Tester</span></div>
              <div>Channel: <span className="font-medium">Invoice Sales</span></div>
            </div>
          </div>

          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2 text-sm">Message</h4>
            <div className="text-right">
              <div className="text-base font-semibold">$1,000.00</div>
              <div className="text-xs text-gray-600">$100.00 × 10</div>
              <div className="text-xs text-gray-600">Regular</div>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center py-2 border-t border-gray-200">
              <span className="font-medium text-sm">TOTAL</span>
              <span className="font-semibold text-sm">$1,000.00</span>
            </div>
          </div>

          <div className="space-y-3 mb-4">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">Visa 1111</span>
                <span className="text-xs font-medium">$900.00</span>
              </div>
              <div className="text-xs text-gray-500">Aug 6, 2025 1:20 pm</div>
              <div className="text-xs text-blue-600">Receipt #BMIL</div>
            </div>
            
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">Visa 1111</span>
                <span className="text-xs font-medium">$100.00</span>
              </div>
              <div className="text-xs text-gray-500">Aug 6, 2025 1:17 pm</div>
              <div className="text-xs text-blue-600">Receipt #PogP</div>
            </div>
          </div>

          <div className="mb-4 pt-3 border-t border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                📄
              </div>
              <div>
                <div className="font-medium text-xs">Invoice payment</div>
                <div className="text-xs text-gray-600">#000033 to Claire Tester</div>
                <div className="text-xs text-blue-600">View Invoice</div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="text-right">
              <div className="text-xs font-medium text-gray-900 mb-1">$996.35 Transferred</div>
              <div className="text-xs text-gray-500 mb-1">
                Fees: Square Invoice 3.50% + $0.15 ($3.65)
              </div>
              <div className="text-xs text-blue-600">Learn more about fees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
