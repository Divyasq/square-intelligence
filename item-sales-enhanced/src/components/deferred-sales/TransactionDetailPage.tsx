import React from 'react';
import { ArrowLeft, ChevronDown, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TransactionDetailPageProps {
  transactionId: string;
}

export function TransactionDetailPage({ transactionId }: TransactionDetailPageProps) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/deferred-sales');
  };

  return (
    <div className="h-full bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={handleBackClick}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                <span className="text-sm">Orders & payments</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-600">08/06/2025</span>
                <ChevronDown className="w-3 h-3 text-gray-400" />
              </div>
              
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
              
              <button className="text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
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
                  <div className="text-xl font-bold text-gray-900">$125.50</div>
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
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-5 bg-blue-100 border border-blue-300 rounded text-xs flex items-center justify-center text-blue-700 font-medium">
                      VISA
                    </div>
                    <span className="text-sm text-gray-600">1:20 pm</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      COMPLETE
                    </span>
                    <span className="text-sm text-gray-900">
                      Transaction {transactionId} - Collected by John Smith
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">$125.50</div>
                  <div className="text-sm text-gray-600">$125.50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Blade */}
      <div className="w-80 bg-white border-l border-gray-200 flex-shrink-0">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">Transaction Details</h3>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Information</h4>
            <div className="space-y-1 text-xs">
              <div>Transaction ID: <span className="font-medium">{transactionId}</span></div>
              <div>Date: <span className="font-medium">Aug 6, 2025 1:20 PM</span></div>
              <div>Staff: <span className="font-medium">John Smith</span></div>
              <div>Device: <span className="font-medium">Register 1 (iPad)</span></div>
              <div>Source: <span className="font-medium">Square POS</span></div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Sales Breakdown</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Items</span>
                <span>$120.00</span>
              </div>
              <div className="flex justify-between">
                <span>Service Charges</span>
                <span>$5.50</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-1">
                <span>Gross Sales</span>
                <span>$125.50</span>
              </div>
              <div className="flex justify-between">
                <span>Discounts</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Returns</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between font-medium border-t pt-1">
                <span>Net Sales</span>
                <span>$125.50</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Additional Charges</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$8.75</span>
              </div>
              <div className="flex justify-between">
                <span>Tip</span>
                <span>$15.00</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Payment Method</h4>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span>Visa ****1111</span>
                <span>$125.50</span>
              </div>
              <div className="text-xs text-gray-500">Aug 6, 2025 1:20 pm</div>
              <div className="text-xs text-blue-600">Receipt #ABC123</div>
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200">
            <div className="text-right">
              <div className="text-xs font-medium text-gray-900 mb-1">$122.85 Transferred</div>
              <div className="text-xs text-gray-500 mb-1">
                Fees: Square processing 2.9% + $0.30 ($2.65)
              </div>
              <div className="text-xs text-blue-600">Learn more about fees</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
