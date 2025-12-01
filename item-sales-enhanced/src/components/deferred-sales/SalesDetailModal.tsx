import React from 'react';
import { X } from 'lucide-react';

interface SalesDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRowClick: (transactionId: string) => void;
}

interface TransactionRow {
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

const mockTransactions: TransactionRow[] = [
  {
    id: 'TXN001',
    date: '2025-08-06',
    time: '1:20 PM',
    timeZone: 'PST',
    grossSales: 125.50,
    items: 120.00,
    serviceCharges: 5.50,
    returns: 0,
    discounts: 0,
    comps: 0,
    netSales: 125.50,
    giftCardSales: 0,
    taxes: 8.75,
    tips: 15.00,
    partialRefunds: 0,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    staffName: 'John Smith'
  },
  {
    id: 'TXN002',
    date: '2025-08-06',
    time: '2:45 PM',
    timeZone: 'PST',
    grossSales: 89.25,
    items: 85.00,
    serviceCharges: 4.25,
    returns: 0,
    discounts: 5.00,
    comps: 0,
    netSales: 84.25,
    giftCardSales: 0,
    taxes: 6.25,
    tips: 12.00,
    partialRefunds: 0,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Online Store',
    source: 'Square Online',
    staffName: 'Sarah Johnson'
  },
  {
    id: 'TXN003',
    date: '2025-08-06',
    time: '3:15 PM',
    timeZone: 'PST',
    grossSales: 245.75,
    items: 230.00,
    serviceCharges: 15.75,
    returns: 0,
    discounts: 0,
    comps: 10.00,
    netSales: 235.75,
    giftCardSales: 0,
    taxes: 18.50,
    tips: 25.00,
    partialRefunds: 0,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Counter POS',
    source: 'Square Terminal',
    staffName: 'Mike Davis'
  },
  {
    id: 'TXN004',
    date: '2025-08-06',
    time: '4:30 PM',
    timeZone: 'PST',
    grossSales: 67.50,
    items: 65.00,
    serviceCharges: 2.50,
    returns: 15.00,
    discounts: 0,
    comps: 0,
    netSales: 52.50,
    giftCardSales: 0,
    taxes: 4.75,
    tips: 8.00,
    partialRefunds: 0,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    staffName: 'Emma Wilson'
  },
  {
    id: 'TXN005',
    date: '2025-08-06',
    time: '5:10 PM',
    timeZone: 'PST',
    grossSales: 156.00,
    items: 145.00,
    serviceCharges: 11.00,
    returns: 0,
    discounts: 8.00,
    comps: 0,
    netSales: 148.00,
    giftCardSales: 25.00,
    taxes: 11.25,
    tips: 20.00,
    partialRefunds: 0,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Mobile POS',
    source: 'Square Terminal',
    staffName: 'Alex Chen'
  },
  {
    id: 'TXN006',
    date: '2025-08-06',
    time: '6:25 PM',
    timeZone: 'PST',
    grossSales: 198.25,
    items: 185.00,
    serviceCharges: 13.25,
    returns: 0,
    discounts: 0,
    comps: 5.00,
    netSales: 193.25,
    giftCardSales: 0,
    taxes: 15.50,
    tips: 30.00,
    partialRefunds: 0,
    channel: 'Online',
    device: 'Mobile App',
    deviceNickname: 'Mobile Order',
    source: 'Square App',
    staffName: 'Lisa Brown'
  },
  {
    id: 'TXN007',
    date: '2025-08-06',
    time: '7:40 PM',
    timeZone: 'PST',
    grossSales: 78.90,
    items: 75.00,
    serviceCharges: 3.90,
    returns: 0,
    discounts: 2.50,
    comps: 0,
    netSales: 76.40,
    giftCardSales: 0,
    taxes: 5.85,
    tips: 10.00,
    partialRefunds: 0,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    staffName: 'David Kim'
  },
  {
    id: 'TXN008',
    date: '2025-08-06',
    time: '8:15 PM',
    timeZone: 'PST',
    grossSales: 312.75,
    items: 295.00,
    serviceCharges: 17.75,
    returns: 0,
    discounts: 15.00,
    comps: 0,
    netSales: 297.75,
    giftCardSales: 0,
    taxes: 24.50,
    tips: 45.00,
    partialRefunds: 0,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Counter POS',
    source: 'Square Terminal',
    staffName: 'Rachel Green'
  },
  {
    id: 'TXN009',
    date: '2025-08-06',
    time: '9:05 PM',
    timeZone: 'PST',
    grossSales: 45.25,
    items: 42.00,
    serviceCharges: 3.25,
    returns: 0,
    discounts: 0,
    comps: 0,
    netSales: 45.25,
    giftCardSales: 0,
    taxes: 3.50,
    tips: 5.00,
    partialRefunds: 0,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Online Store',
    source: 'Square Online',
    staffName: 'Tom Anderson'
  },
  {
    id: 'TXN010',
    date: '2025-08-06',
    time: '9:45 PM',
    timeZone: 'PST',
    grossSales: 167.80,
    items: 155.00,
    serviceCharges: 12.80,
    returns: 0,
    discounts: 0,
    comps: 8.00,
    netSales: 159.80,
    giftCardSales: 0,
    taxes: 12.75,
    tips: 22.00,
    partialRefunds: 0,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    staffName: 'Jennifer Lee'
  }
];

export function SalesDetailModal({ isOpen, onClose, onRowClick }: SalesDetailModalProps) {
  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const handleRowClick = (transactionId: string) => {
    onRowClick(transactionId);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sales Detail Breakdown</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-auto max-h-[calc(90vh-80px)]">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Zone</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Sales</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service Charges</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discounts</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comps</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Sales</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gift Card Sales</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Taxes</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tips</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Partial Refunds</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Channel</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device Nickname</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Staff Name</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  onClick={() => handleRowClick(transaction.id)}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.time}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.timeZone}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.grossSales)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.items)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.serviceCharges)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.returns)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.discounts)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.comps)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.netSales)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.giftCardSales)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.taxes)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.tips)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{formatCurrency(transaction.partialRefunds)}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.channel}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.device}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.deviceNickname}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.source}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900">{transaction.staffName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
