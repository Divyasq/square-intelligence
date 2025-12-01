import React from 'react';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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

interface GrossSalesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockTransactions: Transaction[] = [
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
    staffName: 'Sarah Johnson'
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
    staffName: 'Mike Chen'
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
    partialRefunds: 0,
    channel: 'In-Store',
    device: 'Terminal B2',
    deviceNickname: 'Back Counter',
    source: 'Square POS',
    staffName: 'Emma Rodriguez'
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
    staffName: 'David Kim'
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
    staffName: 'Lisa Park'
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
    staffName: 'Alex Thompson'
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
    staffName: 'Rachel Green'
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
    staffName: 'Tom Wilson'
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
    staffName: 'Jennifer Lee'
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
    staffName: 'Mark Davis'
  }
];

export function GrossSalesModal({ isOpen, onClose }: GrossSalesModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return amount < 0 ? `($${Math.abs(amount).toFixed(2)})` : `$${amount.toFixed(2)}`;
  };

  const handleRowClick = (transaction: Transaction) => {
    // Navigate to transactions page with specific transaction details
    navigate('/transactions', {
      state: {
        selectedTransaction: transaction,
        showTransactionBlade: true
      }
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[80vh] flex flex-col mx-4">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Gross Sales Transactions</h2>
            <p className="text-sm text-gray-600 mt-1">Detailed transaction breakdown</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Modal Content - Scrollable Table */}
        <div className="flex-1 overflow-auto">
          <div className="min-w-full">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Date</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Time</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Time Zone</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Gross Sales</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Items</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Service Charges</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Returns</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Discounts</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Comps</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Net Sales</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Gift Card Sales</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Taxes</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Tips</th>
                  <th className="text-right py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Partial Refunds</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Channel</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Device</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Device Nickname</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Source</th>
                  <th className="text-left py-3 px-3 font-medium text-gray-900 text-xs border-b border-gray-200">Staff Name</th>
                </tr>
              </thead>
              <tbody>
                {mockTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors border-b border-gray-100 ${
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
        </div>

        {/* Modal Footer */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-gray-600">
              Showing {mockTransactions.length} transactions • Click any row to view details
            </p>
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
  );
}
