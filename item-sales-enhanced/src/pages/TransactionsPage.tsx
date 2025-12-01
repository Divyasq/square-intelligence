import React, { useState, useEffect } from 'react';
import { ArrowLeft, HelpCircle, ChevronDown, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface Transaction {
  id: string;
  date: string;
  time: string;
  timeZone: string;
  grossSales: number;
  items: number;
  serviceCharges: number;
  returns: number;
  discounts: number;
  comps: number;
  netSales: number;
  giftCardSales: number;
  taxes: number;
  tips: number;
  partialRefunds: number;
  channel: string;
  device: string;
  deviceNickname: string;
  source: string;
  staffName: string;
}

interface TransactionBladeProps {
  transaction: Transaction;
  isOpen: boolean;
  onClose: () => void;
}

function TransactionBlade({ transaction, isOpen, onClose }: TransactionBladeProps) {
  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return amount < 0 ? `($${Math.abs(amount).toFixed(2)})` : `$${amount.toFixed(2)}`;
  };

  const formatDateTime = (date: string, time: string) => {
    const dateObj = new Date(`${date}T${time}`);
    return dateObj.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    }) + ' ' + dateObj.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl z-50 overflow-y-auto border-l border-gray-200">
      {/* Blade Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">{formatCurrency(transaction.grossSales)} Payment</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      {/* Blade Content */}
      <div className="p-4 space-y-6">
        {/* Transaction Summary */}
        <div>
          <p className="text-sm text-gray-600 mb-2">{formatDateTime(transaction.date, transaction.time)}</p>
          
          <div className="space-y-2 text-sm">
            <div>
              <span className="text-gray-600">Collected by: </span>
              <span className="text-gray-900">{transaction.staffName}</span>
            </div>
            <div>
              <span className="text-gray-600">Order Source: </span>
              <span className="text-blue-600 underline cursor-pointer">{transaction.source}</span>
            </div>
            <div>
              <span className="text-gray-600">Sale attributed to: </span>
              <span className="text-gray-900">{transaction.staffName}</span>
            </div>
            <div>
              <span className="text-gray-600">Paid by: </span>
              <span className="text-gray-900">Customer</span>
            </div>
            <div>
              <span className="text-gray-600">Channel: </span>
              <span className="text-gray-900">{transaction.channel}</span>
            </div>
          </div>
        </div>

        {/* Message Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Message</h4>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">{formatCurrency(transaction.grossSales)} × 1</span>
              <span className="text-sm font-medium text-gray-900">{formatCurrency(transaction.grossSales)}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">Regular</p>
          </div>
        </div>

        {/* Total Section */}
        <div>
          <div className="flex justify-between items-center py-2 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-900">TOTAL</span>
            <span className="text-sm font-medium text-gray-900">{formatCurrency(transaction.grossSales)}</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-3">
          {/* Primary Payment */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-900">Visa 1111</span>
              <span className="text-sm font-medium text-gray-900">{formatCurrency(transaction.grossSales * 0.8)}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{formatDateTime(transaction.date, transaction.time)}</p>
            <p className="text-xs text-gray-600">Receipt #BMIL</p>
          </div>

          {/* Secondary Payment if applicable */}
          {transaction.grossSales > 100 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-900">Visa 1111</span>
                <span className="text-sm font-medium text-gray-900">{formatCurrency(transaction.grossSales * 0.2)}</span>
              </div>
              <p className="text-xs text-gray-600 mt-1">{formatDateTime(transaction.date, transaction.time)}</p>
              <p className="text-xs text-gray-600">Receipt #PbgP</p>
            </div>
          )}
        </div>

        {/* Invoice Payment Section */}
        <div className="border border-gray-200 rounded-lg p-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
            </div>
            <div className="flex-1">
              <h5 className="text-sm font-medium text-gray-900">Invoice payment</h5>
              <p className="text-sm text-gray-600">{transaction.id} to {transaction.staffName}</p>
              <button className="text-sm text-blue-600 hover:text-blue-800 underline mt-1">
                View invoice
              </button>
            </div>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Transaction Breakdown</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Items</span>
              <span className="text-gray-900">{formatCurrency(transaction.items)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Charges</span>
              <span className="text-gray-900">{formatCurrency(transaction.serviceCharges)}</span>
            </div>
            {transaction.returns > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Returns</span>
                <span className="text-red-600">{formatCurrency(-transaction.returns)}</span>
              </div>
            )}
            {transaction.discounts > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Discounts</span>
                <span className="text-red-600">{formatCurrency(-transaction.discounts)}</span>
              </div>
            )}
            {transaction.comps > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Comps</span>
                <span className="text-red-600">{formatCurrency(-transaction.comps)}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2">
              <span className="text-gray-600">Net Sales</span>
              <span className="text-gray-900 font-medium">{formatCurrency(transaction.netSales)}</span>
            </div>
            {transaction.giftCardSales > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Gift Card Sales</span>
                <span className="text-gray-900">{formatCurrency(transaction.giftCardSales)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes</span>
              <span className="text-gray-900">{formatCurrency(transaction.taxes)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tips</span>
              <span className="text-gray-900">{formatCurrency(transaction.tips)}</span>
            </div>
            {transaction.partialRefunds > 0 && (
              <div className="flex justify-between">
                <span className="text-gray-600">Partial Refunds</span>
                <span className="text-red-600">{formatCurrency(-transaction.partialRefunds)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Fees Section */}
        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-600 mb-2">{formatCurrency(transaction.grossSales * 0.85)} Transferred</p>
          <div className="text-xs text-gray-500 space-y-1">
            <p>Fees: Square Invoice 3.50% + $0.15 ($31.05) / Fees: Square Invoice 3.50% + $0.15 ($3.65)</p>
            <button className="text-blue-600 hover:text-blue-800 underline">
              Learn more about fees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TransactionsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [isBladeOpen, setIsBladeOpen] = useState(false);
  
  // Extract filters from navigation state
  const navigationState = location.state || {};
  const {
    filterType,
    status,
    transactionTypes,
    dateRange,
    location: filterLocation,
    timeframe
  } = navigationState;

  // Set initial filter values based on navigation state
  const [filters, setFilters] = useState({
    date: dateRange ? `${dateRange.start.toLocaleDateString()} - ${dateRange.end.toLocaleDateString()}` : '08/06/2025',
    timeframe: timeframe || 'All day',
    paymentMethods: 'All Payment Methods',
    types: getTypesFilter(filterType, transactionTypes),
    statuses: status || 'All Statuses',
    locations: filterLocation || 'All locations',
    sources: 'All Sources',
    teamMembers: 'All Team Members',
    fees: 'All Fees'
  });

  // Helper function to set the correct types filter based on navigation
  function getTypesFilter(filterType: string, transactionTypes: string[]) {
    switch (filterType) {
      case 'payments':
        return 'Payments';
      case 'exchanges':
        return 'Exchanges';
      case 'refunds':
        return 'Refunds';
      case 'deferred':
        return 'Deferred Sales';
      default:
        return 'All Types';
    }
  }

  // Check if we have a selected transaction from navigation state
  useEffect(() => {
    if (location.state?.selectedTransaction && location.state?.showTransactionBlade) {
      setSelectedTransaction(location.state.selectedTransaction);
      setIsBladeOpen(true);
    }
  }, [location.state]);

  const handleBackClick = () => {
    navigate('/reports');
  };

  const handleCloseBlade = () => {
    setIsBladeOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBackClick}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              <span className="text-sm">Orders & payments</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">{filters.date}</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            
            <div className="flex items-center space-x-2">
              <select 
                className="text-sm border border-gray-300 rounded px-3 py-1"
                value={filters.timeframe}
                onChange={(e) => setFilters(prev => ({ ...prev, timeframe: e.target.value }))}
              >
                <option>All day</option>
                <option>Morning</option>
                <option>Afternoon</option>
                <option>Evening</option>
              </select>
              
              <select 
                className="text-sm border border-gray-300 rounded px-3 py-1"
                value={filters.paymentMethods}
                onChange={(e) => setFilters(prev => ({ ...prev, paymentMethods: e.target.value }))}
              >
                <option>All Payment Methods</option>
                <option>Card</option>
                <option>Cash</option>
                <option>Gift Card</option>
              </select>
              
              <select 
                className="text-sm border border-gray-300 rounded px-3 py-1"
                value={filters.types}
                onChange={(e) => setFilters(prev => ({ ...prev, types: e.target.value }))}
              >
                <option>All Types</option>
                <option>Payments & Exchanges</option>
                <option>Refunds</option>
                <option>Deferred Sales</option>
              </select>
              
              <select 
                className="text-sm border border-gray-300 rounded px-3 py-1"
                value={filters.statuses}
                onChange={(e) => setFilters(prev => ({ ...prev, statuses: e.target.value }))}
              >
                <option>All Statuses</option>
                <option>Completed</option>
                <option>Partially Paid</option>
                <option>Awaiting Capture</option>
              </select>
              
              <select 
                className="text-sm border border-gray-300 rounded px-3 py-1"
                value={filters.locations}
                onChange={(e) => setFilters(prev => ({ ...prev, locations: e.target.value }))}
              >
                <option>All locations</option>
                <option>Main Store</option>
                <option>Online</option>
              </select>
              
              <select 
                className="text-sm border border-gray-300 rounded px-3 py-1"
                value={filters.sources}
                onChange={(e) => setFilters(prev => ({ ...prev, sources: e.target.value }))}
              >
                <option>All Sources</option>
                <option>Square POS</option>
                <option>Square Online</option>
                <option>Square Invoices</option>
              </select>
              
              <select 
                className="text-sm border border-gray-300 rounded px-3 py-1"
                value={filters.teamMembers}
                onChange={(e) => setFilters(prev => ({ ...prev, teamMembers: e.target.value }))}
              >
                <option>All Team Members</option>
                <option>Sarah Johnson</option>
                <option>Mike Smith</option>
              </select>
              
              <select 
                className="text-sm border border-gray-300 rounded px-3 py-1"
                value={filters.fees}
                onChange={(e) => setFilters(prev => ({ ...prev, fees: e.target.value }))}
              >
                <option>All Fees</option>
                <option>Processing Fees</option>
                <option>No Fees</option>
              </select>
              
              <select className="text-sm border border-gray-300 rounded px-3 py-1">
                <option>Card #</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input 
                type="text" 
                placeholder="Filter by card (last 4)"
                className="text-sm border border-gray-300 rounded px-3 py-1 w-48"
              />
            </div>
            
            <button className="text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-50">
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow">
          {/* Filter Applied Indicator */}
          {(filterType || status) && (
            <div className="px-6 py-3 bg-blue-50 border-b border-blue-200">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-blue-800 font-medium">Active Filters:</span>
                {filterType && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {filterType === 'payments' ? 'Payments & Exchanges' : 
                     filterType === 'refunds' ? 'Refunds' : 
                     filterType === 'deferred' ? 'Deferred Sales' : filterType}
                  </span>
                )}
                {status && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Status: {status}
                  </span>
                )}
                {dateRange && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                    Date: {dateRange.start.toLocaleDateString()} - {dateRange.end.toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Date Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Aug 6, 2025</h2>
          </div>

          {/* Summary Stats */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">0</div>
                <div className="flex items-center justify-center text-sm text-gray-600 mt-1">
                  <span>COMPLETE TRANSACTIONS</span>
                  <HelpCircle className="w-4 h-4 ml-1 text-gray-400" />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$100.00</div>
                <div className="flex items-center justify-center text-sm text-gray-600 mt-1">
                  <span>TOTAL COLLECTED</span>
                  <HelpCircle className="w-4 h-4 ml-1 text-gray-400" />
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">$0.00</div>
                <div className="flex items-center justify-center text-sm text-gray-600 mt-1">
                  <span>NET SALES</span>
                  <HelpCircle className="w-4 h-4 ml-1 text-gray-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Transaction List */}
          <div className="px-6 py-4">
            <div className="text-sm text-gray-600 mb-4">Wednesday, August 6, 2025</div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-5 bg-blue-100 border border-blue-300 rounded text-xs flex items-center justify-center text-blue-700 font-medium">
                    VISA
                  </div>
                  <span className="text-sm text-gray-600">1:17 pm</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                    PARTIALLY PAID
                  </span>
                  <span className="text-sm text-gray-900">
                    No description - Collected by Approve Test SL
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">$100.00</div>
                <div className="text-sm text-gray-600">$100.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Blade */}
      {selectedTransaction && (
        <TransactionBlade
          transaction={selectedTransaction}
          isOpen={isBladeOpen}
          onClose={handleCloseBlade}
        />
      )}
    </div>
  );
}
