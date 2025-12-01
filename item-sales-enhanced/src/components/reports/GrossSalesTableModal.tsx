import React from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../../context/ReportsContext';

interface TransactionData {
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
  totalCollected: number;
}

interface GrossSalesTableModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockTransactionData: TransactionData[] = [
  {
    id: 'TXN-001',
    date: '2025-01-31',
    time: '09:15:23',
    timeZone: 'PST',
    grossSales: 125.50,
    items: 118.30,
    serviceCharges: 7.20,
    returns: 0,
    discounts: 5.00,
    comps: 0,
    netSales: 120.50,
    giftCardSales: 0,
    taxes: 9.64,
    tips: 15.00,
    partialRefunds: 0,
    channel: 'In-Store',
    device: 'Terminal A1',
    deviceNickname: 'Front Counter',
    source: 'Square POS',
    staffName: 'Sarah Johnson',
    totalCollected: 145.14
  },
  {
    id: 'TXN-002',
    date: '2025-01-31',
    time: '10:32:45',
    timeZone: 'PST',
    grossSales: 89.75,
    items: 82.50,
    serviceCharges: 7.25,
    returns: 0,
    discounts: 0,
    comps: 2.50,
    netSales: 87.25,
    giftCardSales: 25.00,
    taxes: 6.98,
    tips: 12.00,
    partialRefunds: 0,
    channel: 'Online',
    device: 'iPad Pro',
    deviceNickname: 'Mobile Station',
    source: 'Square Online',
    staffName: 'Mike Chen',
    totalCollected: 131.23
  },
  {
    id: 'TXN-003',
    date: '2025-01-31',
    time: '11:47:12',
    timeZone: 'PST',
    grossSales: 234.80,
    items: 220.00,
    serviceCharges: 14.80,
    returns: 15.00,
    discounts: 10.00,
    comps: 0,
    netSales: 209.80,
    giftCardSales: 0,
    taxes: 16.78,
    tips: 25.00,
    partialRefunds: 10.00,
    channel: 'In-Store',
    device: 'Terminal B2',
    deviceNickname: 'Back Counter',
    source: 'Square POS',
    staffName: 'Emma Rodriguez',
    totalCollected: 241.58
  },
  {
    id: 'TXN-004',
    date: '2025-01-31',
    time: '13:22:38',
    timeZone: 'PST',
    grossSales: 67.25,
    items: 62.00,
    serviceCharges: 5.25,
    returns: 0,
    discounts: 3.00,
    comps: 0,
    netSales: 64.25,
    giftCardSales: 0,
    taxes: 5.14,
    tips: 8.00,
    partialRefunds: 0,
    channel: 'In-Store',
    device: 'Terminal A1',
    deviceNickname: 'Front Counter',
    source: 'Square POS',
    staffName: 'David Kim',
    totalCollected: 77.39
  },
  {
    id: 'TXN-005',
    date: '2025-01-31',
    time: '14:55:17',
    timeZone: 'PST',
    grossSales: 156.90,
    items: 145.00,
    serviceCharges: 11.90,
    returns: 0,
    discounts: 8.00,
    comps: 5.00,
    netSales: 143.90,
    giftCardSales: 50.00,
    taxes: 11.51,
    tips: 20.00,
    partialRefunds: 0,
    channel: 'Online',
    device: 'Tablet',
    deviceNickname: 'Delivery Station',
    source: 'Square Online',
    staffName: 'Lisa Park',
    totalCollected: 225.41
  },
  {
    id: 'TXN-006',
    date: '2025-01-31',
    time: '16:18:44',
    timeZone: 'PST',
    grossSales: 98.40,
    items: 92.00,
    serviceCharges: 6.40,
    returns: 0,
    discounts: 0,
    comps: 0,
    netSales: 98.40,
    giftCardSales: 0,
    taxes: 7.87,
    tips: 15.00,
    partialRefunds: 0,
    channel: 'In-Store',
    device: 'Terminal B2',
    deviceNickname: 'Back Counter',
    source: 'Square POS',
    staffName: 'Alex Thompson',
    totalCollected: 121.27
  },
  {
    id: 'TXN-007',
    date: '2025-01-31',
    time: '17:43:29',
    timeZone: 'PST',
    grossSales: 312.75,
    items: 295.00,
    serviceCharges: 17.75,
    returns: 25.00,
    discounts: 15.00,
    comps: 0,
    netSales: 272.75,
    giftCardSales: 0,
    taxes: 21.82,
    tips: 35.00,
    partialRefunds: 10.00,
    channel: 'In-Store',
    device: 'Terminal A1',
    deviceNickname: 'Front Counter',
    source: 'Square POS',
    staffName: 'Rachel Green',
    totalCollected: 319.57
  },
  {
    id: 'TXN-008',
    date: '2025-01-31',
    time: '18:56:33',
    timeZone: 'PST',
    grossSales: 78.60,
    items: 72.50,
    serviceCharges: 6.10,
    returns: 0,
    discounts: 2.50,
    comps: 0,
    netSales: 76.10,
    giftCardSales: 0,
    taxes: 6.09,
    tips: 10.00,
    partialRefunds: 0,
    channel: 'Online',
    device: 'Mobile',
    deviceNickname: 'Mobile App',
    source: 'Square App',
    staffName: 'Tom Wilson',
    totalCollected: 92.19
  },
  {
    id: 'TXN-009',
    date: '2025-01-31',
    time: '19:34:51',
    timeZone: 'PST',
    grossSales: 189.25,
    items: 175.00,
    serviceCharges: 14.25,
    returns: 0,
    discounts: 12.00,
    comps: 3.00,
    netSales: 174.25,
    giftCardSales: 25.00,
    taxes: 13.94,
    tips: 22.00,
    partialRefunds: 0,
    channel: 'In-Store',
    device: 'Terminal B2',
    deviceNickname: 'Back Counter',
    source: 'Square POS',
    staffName: 'Jennifer Lee',
    totalCollected: 235.19
  },
  {
    id: 'TXN-010',
    date: '2025-01-31',
    time: '20:12:07',
    timeZone: 'PST',
    grossSales: 145.30,
    items: 135.00,
    serviceCharges: 10.30,
    returns: 0,
    discounts: 5.00,
    comps: 0,
    netSales: 140.30,
    giftCardSales: 0,
    taxes: 11.22,
    tips: 18.00,
    partialRefunds: 0,
    channel: 'In-Store',
    device: 'Terminal A1',
    deviceNickname: 'Front Counter',
    source: 'Square POS',
    staffName: 'Mark Davis',
    totalCollected: 169.52
  }
];

// Filter to only show completed transactions (exclude partially paid)
const completedTransactions = mockTransactionData;

export function GrossSalesTableModal({ isOpen, onClose }: GrossSalesTableModalProps) {
  const navigate = useNavigate();
  const { state } = useReports();
  
  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return amount < 0 ? `($${Math.abs(amount).toFixed(2)})` : `$${amount.toFixed(2)}`;
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleViewAllTransactions = () => {
    // Close modal first
    onClose();
    
    // Navigate to transactions page with proper filters for Gross Sales
    const navigationState = {
      // Apply the same Reporting Hour filter
      dateRange: state.filters.dateRange,
      // Apply the same top level filters including locations
      location: state.filters.location,
      timeframe: state.filters.timeframe,
      // Filter by 'Payments' and exchanges
      filterType: 'payments',
      transactionTypes: ['payments', 'exchanges'],
      // Ensure transaction page status filter is set to "Completed"
      status: 'Completed'
    };

    navigate('/transactions', { state: navigationState });
  };

  const handleExport = () => {
    // Create CSV content
    const headers = [
      'Date', 'Time', 'Time Zone', 'Gross Sales', 'Items', 'Service Charges',
      'Returns', 'Discounts', 'Comps', 'Net Sales', 'Gift Card Sales',
      'Taxes', 'Tips', 'Partial Refunds', 'Channel', 'Device', 'Device Nickname',
      'Source', 'Staff Name'
    ];

    const csvContent = [
      headers.join(','),
      ...mockTransactionData.map(transaction => [
        transaction.date,
        transaction.time,
        transaction.timeZone,
        transaction.grossSales,
        transaction.items,
        transaction.serviceCharges,
        transaction.returns,
        transaction.discounts,
        transaction.comps,
        transaction.netSales,
        transaction.giftCardSales,
        transaction.taxes,
        transaction.tips,
        transaction.partialRefunds,
        transaction.channel,
        transaction.device,
        transaction.deviceNickname,
        transaction.source,
        transaction.staffName
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `gross-sales-transactions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRowClick = (transaction: TransactionData) => {
    // Navigate to transactions page with selected transaction data
    navigate('/transactions', {
      state: {
        selectedTransaction: transaction,
        showTransactionBlade: true
      }
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[85vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Gross Sales Transaction Details</h2>
            <p className="text-sm text-gray-600">Click any row to view transaction details</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 overflow-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[90px]">Date</th>
                <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[80px]">Time</th>
                <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[80px]">Time Zone</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[90px]">Gross Sales</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[80px]">Items</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[100px]">Service Charges</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[80px]">Returns</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[80px]">Discounts</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[70px]">Comps</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[80px]">Net Sales</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[100px]">Gift Card Sales</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[70px]">Taxes</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[70px]">Tips</th>
                <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[100px]">Partial Refunds</th>
                <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[80px]">Channel</th>
                <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[90px]">Device</th>
                <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[110px]">Device Nickname</th>
                <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[100px]">Source</th>
                <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200 min-w-[110px]">Staff Name</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactionData.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={`hover:bg-blue-50 cursor-pointer transition-colors border-b border-gray-100 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                  }`}
                  onClick={() => handleRowClick(transaction)}
                >
                  <td className="py-2 px-3 text-xs text-gray-900">{transaction.date}</td>
                  <td className="py-2 px-3 text-xs text-gray-900">{transaction.time}</td>
                  <td className="py-2 px-3 text-xs text-gray-900">{transaction.timeZone}</td>
                  <td className="py-2 px-3 text-xs text-gray-900 text-right font-medium">
                    {formatCurrency(transaction.grossSales)}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-900 text-right">
                    {formatCurrency(transaction.items)}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-900 text-right">
                    {formatCurrency(transaction.serviceCharges)}
                  </td>
                  <td className="py-2 px-3 text-xs text-red-600 text-right">
                    {transaction.returns > 0 ? formatCurrency(-transaction.returns) : '$0.00'}
                  </td>
                  <td className="py-2 px-3 text-xs text-red-600 text-right">
                    {transaction.discounts > 0 ? formatCurrency(-transaction.discounts) : '$0.00'}
                  </td>
                  <td className="py-2 px-3 text-xs text-red-600 text-right">
                    {transaction.comps > 0 ? formatCurrency(-transaction.comps) : '$0.00'}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-900 text-right font-medium">
                    {formatCurrency(transaction.netSales)}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-900 text-right">
                    {formatCurrency(transaction.giftCardSales)}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-900 text-right">
                    {formatCurrency(transaction.taxes)}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-900 text-right">
                    {formatCurrency(transaction.tips)}
                  </td>
                  <td className="py-2 px-3 text-xs text-red-600 text-right">
                    {transaction.partialRefunds > 0 ? formatCurrency(-transaction.partialRefunds) : '$0.00'}
                  </td>
                  <td className="py-2 px-3 text-xs text-gray-900">{transaction.channel}</td>
                  <td className="py-2 px-3 text-xs text-gray-900">{transaction.device}</td>
                  <td className="py-2 px-3 text-xs text-gray-900">{transaction.deviceNickname}</td>
                  <td className="py-2 px-3 text-xs text-gray-900">{transaction.source}</td>
                  <td className="py-2 px-3 text-xs text-gray-900">{transaction.staffName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600">
              Showing {mockTransactionData.length} transactions
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleViewAllTransactions}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                View All Transactions
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
