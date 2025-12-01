import React from 'react';
import { X, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

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
  totalCollected: number;
  status: 'Completed' | 'Partially Paid';
}

interface TransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  transactions: Transaction[];
  filterType: 'gross-sales' | 'sales' | 'exchanges' | 'net-sales' | 'returns' | 'deferred-sales';
}

const mockTransactions: Transaction[] = [
  // Payment Transactions (Sales) - Completed
  {
    id: 'PAY-001',
    date: '2025-06-25',
    time: '10:30 AM',
    timeZone: 'PST',
    grossSales: 150.00,
    items: 140.00,
    serviceCharges: 10.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 150.00,
    giftCardSales: 0.00,
    taxes: 12.00,
    tips: 15.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 177.00,
    status: 'Completed'
  },
  {
    id: 'PAY-002',
    date: '2025-06-25',
    time: '11:45 AM',
    timeZone: 'PST',
    grossSales: 85.50,
    items: 85.50,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 5.00,
    comps: 0.00,
    netSales: 80.50,
    giftCardSales: 0.00,
    taxes: 6.44,
    tips: 10.00,
    partialRefunds: 0.00,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Online Store',
    source: 'Square Online',
    totalCollected: 96.94,
    status: 'Completed'
  },
  {
    id: 'PAY-003',
    date: '2025-06-25',
    time: '1:15 PM',
    timeZone: 'PST',
    grossSales: 220.75,
    items: 200.00,
    serviceCharges: 20.75,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 220.75,
    giftCardSales: 0.00,
    taxes: 17.66,
    tips: 25.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 263.41,
    status: 'Completed'
  },
  {
    id: 'PAY-004',
    date: '2025-06-25',
    time: '9:20 AM',
    timeZone: 'PST',
    grossSales: 67.25,
    items: 67.25,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 2.50,
    comps: 0.00,
    netSales: 64.75,
    giftCardSales: 0.00,
    taxes: 5.18,
    tips: 8.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 77.93,
    status: 'Completed'
  },
  {
    id: 'PAY-005',
    date: '2025-06-25',
    time: '12:30 PM',
    timeZone: 'PST',
    grossSales: 134.80,
    items: 120.00,
    serviceCharges: 14.80,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 134.80,
    giftCardSales: 0.00,
    taxes: 10.78,
    tips: 18.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 163.58,
    status: 'Completed'
  },
  {
    id: 'PAY-006',
    date: '2025-06-25',
    time: '2:45 PM',
    timeZone: 'PST',
    grossSales: 98.60,
    items: 98.60,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 8.00,
    comps: 0.00,
    netSales: 90.60,
    giftCardSales: 0.00,
    taxes: 7.25,
    tips: 12.00,
    partialRefunds: 0.00,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Online Store',
    source: 'Square Online',
    totalCollected: 109.85,
    status: 'Completed'
  },
  {
    id: 'PAY-007',
    date: '2025-06-25',
    time: '3:15 PM',
    timeZone: 'PST',
    grossSales: 189.25,
    items: 175.00,
    serviceCharges: 14.25,
    returns: 0.00,
    discounts: 0.00,
    comps: 3.00,
    netSales: 186.25,
    giftCardSales: 0.00,
    taxes: 14.90,
    tips: 22.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 223.15,
    status: 'Completed'
  },
  {
    id: 'PAY-008',
    date: '2025-06-25',
    time: '4:50 PM',
    timeZone: 'PST',
    grossSales: 76.40,
    items: 76.40,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 4.00,
    comps: 0.00,
    netSales: 72.40,
    giftCardSales: 0.00,
    taxes: 5.79,
    tips: 9.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 87.19,
    status: 'Completed'
  },
  {
    id: 'PAY-009',
    date: '2025-06-25',
    time: '5:25 PM',
    timeZone: 'PST',
    grossSales: 156.90,
    items: 145.00,
    serviceCharges: 11.90,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 156.90,
    giftCardSales: 0.00,
    taxes: 12.55,
    tips: 20.00,
    partialRefunds: 0.00,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Online Store',
    source: 'Square Online',
    totalCollected: 189.45,
    status: 'Completed'
  },
  {
    id: 'PAY-010',
    date: '2025-06-25',
    time: '6:10 PM',
    timeZone: 'PST',
    grossSales: 245.75,
    items: 230.00,
    serviceCharges: 15.75,
    returns: 0.00,
    discounts: 12.00,
    comps: 0.00,
    netSales: 233.75,
    giftCardSales: 0.00,
    taxes: 18.70,
    tips: 28.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 280.45,
    status: 'Completed'
  },
  {
    id: 'PAY-011',
    date: '2025-06-25',
    time: '7:35 PM',
    timeZone: 'PST',
    grossSales: 112.30,
    items: 112.30,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 6.50,
    comps: 0.00,
    netSales: 105.80,
    giftCardSales: 0.00,
    taxes: 8.46,
    tips: 15.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 129.26,
    status: 'Completed'
  },
  {
    id: 'PAY-012',
    date: '2025-06-25',
    time: '8:20 PM',
    timeZone: 'PST',
    grossSales: 87.65,
    items: 80.00,
    serviceCharges: 7.65,
    returns: 0.00,
    discounts: 0.00,
    comps: 2.00,
    netSales: 85.65,
    giftCardSales: 0.00,
    taxes: 6.85,
    tips: 11.00,
    partialRefunds: 0.00,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Online Store',
    source: 'Square Online',
    totalCollected: 103.50,
    status: 'Completed'
  },
  {
    id: 'PAY-013',
    date: '2025-06-25',
    time: '9:05 AM',
    timeZone: 'PST',
    grossSales: 198.40,
    items: 185.00,
    serviceCharges: 13.40,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 198.40,
    giftCardSales: 0.00,
    taxes: 15.87,
    tips: 24.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 238.27,
    status: 'Completed'
  },
  {
    id: 'PAY-014',
    date: '2025-06-25',
    time: '10:15 AM',
    timeZone: 'PST',
    grossSales: 64.85,
    items: 64.85,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 3.25,
    comps: 0.00,
    netSales: 61.60,
    giftCardSales: 0.00,
    taxes: 4.93,
    tips: 7.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 73.53,
    status: 'Completed'
  },
  {
    id: 'PAY-015',
    date: '2025-06-25',
    time: '11:20 AM',
    timeZone: 'PST',
    grossSales: 143.70,
    items: 135.00,
    serviceCharges: 8.70,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 143.70,
    giftCardSales: 0.00,
    taxes: 11.50,
    tips: 18.00,
    partialRefunds: 0.00,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Online Store',
    source: 'Square Online',
    totalCollected: 173.20,
    status: 'Completed'
  },
  {
    id: 'PAY-016',
    date: '2025-06-25',
    time: '1:40 PM',
    timeZone: 'PST',
    grossSales: 276.50,
    items: 260.00,
    serviceCharges: 16.50,
    returns: 0.00,
    discounts: 15.00,
    comps: 0.00,
    netSales: 261.50,
    giftCardSales: 0.00,
    taxes: 20.92,
    tips: 32.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 314.42,
    status: 'Completed'
  },
  {
    id: 'PAY-017',
    date: '2025-06-25',
    time: '3:55 PM',
    timeZone: 'PST',
    grossSales: 91.20,
    items: 91.20,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 5.50,
    comps: 0.00,
    netSales: 85.70,
    giftCardSales: 0.00,
    taxes: 6.86,
    tips: 12.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 104.56,
    status: 'Completed'
  },
  {
    id: 'PAY-018',
    date: '2025-06-25',
    time: '6:45 PM',
    timeZone: 'PST',
    grossSales: 167.80,
    items: 155.00,
    serviceCharges: 12.80,
    returns: 0.00,
    discounts: 0.00,
    comps: 4.00,
    netSales: 163.80,
    giftCardSales: 0.00,
    taxes: 13.10,
    tips: 21.00,
    partialRefunds: 0.00,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Online Store',
    source: 'Square Online',
    totalCollected: 197.90,
    status: 'Completed'
  },
  {
    id: 'PAY-019',
    date: '2025-06-25',
    time: '8:15 PM',
    timeZone: 'PST',
    grossSales: 124.95,
    items: 124.95,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 7.25,
    comps: 0.00,
    netSales: 117.70,
    giftCardSales: 0.00,
    taxes: 9.42,
    tips: 16.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 143.12,
    status: 'Completed'
  },
  {
    id: 'PAY-020',
    date: '2025-06-25',
    time: '9:30 PM',
    timeZone: 'PST',
    grossSales: 203.45,
    items: 190.00,
    serviceCharges: 13.45,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 203.45,
    giftCardSales: 0.00,
    taxes: 16.28,
    tips: 26.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 245.73,
    status: 'Completed'
  },
  // Exchange Transactions - Completed
  {
    id: 'EXC-001',
    date: '2025-06-25',
    time: '2:30 PM',
    timeZone: 'PST',
    grossSales: 45.00,
    items: 45.00,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 45.00,
    giftCardSales: 0.00,
    taxes: 3.60,
    tips: 0.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 48.60,
    status: 'Completed'
  },
  {
    id: 'EXC-002',
    date: '2025-06-25',
    time: '3:45 PM',
    timeZone: 'PST',
    grossSales: 32.50,
    items: 32.50,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 32.50,
    giftCardSales: 0.00,
    taxes: 2.60,
    tips: 5.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 40.10,
    status: 'Completed'
  },
  {
    id: 'EXC-003',
    date: '2025-06-25',
    time: '4:15 PM',
    timeZone: 'PST',
    grossSales: 67.25,
    items: 67.25,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 67.25,
    giftCardSales: 0.00,
    taxes: 5.38,
    tips: 0.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 72.63,
    status: 'Completed'
  },
  {
    id: 'EXC-004',
    date: '2025-06-25',
    time: '5:30 PM',
    timeZone: 'PST',
    grossSales: 89.75,
    items: 89.75,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 89.75,
    giftCardSales: 0.00,
    taxes: 7.18,
    tips: 10.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 106.93,
    status: 'Completed'
  },
  {
    id: 'EXC-005',
    date: '2025-06-25',
    time: '6:45 PM',
    timeZone: 'PST',
    grossSales: 125.00,
    items: 125.00,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 125.00,
    giftCardSales: 0.00,
    taxes: 10.00,
    tips: 15.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 150.00,
    status: 'Completed'
  },
  {
    id: 'EXC-006',
    date: '2025-06-25',
    time: '7:20 PM',
    timeZone: 'PST',
    grossSales: 54.30,
    items: 54.30,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 54.30,
    giftCardSales: 0.00,
    taxes: 4.34,
    tips: 8.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 66.64,
    status: 'Completed'
  },
  {
    id: 'EXC-007',
    date: '2025-06-25',
    time: '8:10 PM',
    timeZone: 'PST',
    grossSales: 78.90,
    items: 78.90,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 78.90,
    giftCardSales: 0.00,
    taxes: 6.31,
    tips: 12.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: 97.21,
    status: 'Completed'
  },
  {
    id: 'EXC-008',
    date: '2025-06-25',
    time: '8:55 PM',
    timeZone: 'PST',
    grossSales: 43.75,
    items: 43.75,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 43.75,
    giftCardSales: 0.00,
    taxes: 3.50,
    tips: 5.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'Terminal',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: 52.25,
    status: 'Completed'
  },
  // Returns Transactions (Completed)
  {
    id: 'RET-001',
    date: '2025-06-25',
    time: '2:15 PM',
    timeZone: 'PST',
    grossSales: -45.00,
    items: -45.00,
    serviceCharges: 0.00,
    returns: 45.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: -45.00,
    giftCardSales: 0.00,
    taxes: -3.60,
    tips: 0.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square POS',
    totalCollected: -48.60,
    status: 'Completed'
  },
  {
    id: 'RET-002',
    date: '2025-06-25',
    time: '3:30 PM',
    timeZone: 'PST',
    grossSales: -25.50,
    items: -25.50,
    serviceCharges: 0.00,
    returns: 25.50,
    discounts: 0.00,
    comps: 0.00,
    netSales: -25.50,
    giftCardSales: 0.00,
    taxes: -2.04,
    tips: 0.00,
    partialRefunds: 0.00,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Online Store',
    source: 'Square Online',
    totalCollected: -27.54,
    status: 'Completed'
  },
  {
    id: 'RET-003',
    date: '2025-06-25',
    time: '4:45 PM',
    timeZone: 'PST',
    grossSales: -75.25,
    items: -70.00,
    serviceCharges: -5.25,
    returns: 75.25,
    discounts: 0.00,
    comps: 0.00,
    netSales: -75.25,
    giftCardSales: 0.00,
    taxes: -6.02,
    tips: 0.00,
    partialRefunds: 0.00,
    channel: 'In-Person',
    device: 'iPad',
    deviceNickname: 'Register 2',
    source: 'Square POS',
    totalCollected: -81.27,
    status: 'Completed'
  },
  // Deferred Sales Transactions (Partially Paid)
  {
    id: 'INV-001',
    date: '2025-06-25',
    time: '2:15 PM',
    timeZone: 'PST',
    grossSales: 100.00,
    items: 100.00,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 100.00,
    giftCardSales: 0.00,
    taxes: 8.00,
    tips: 0.00,
    partialRefunds: 0.00,
    channel: 'Invoice',
    device: 'iPad',
    deviceNickname: 'Register 1',
    source: 'Square Invoices',
    totalCollected: 50.00, // Partially paid
    status: 'Partially Paid'
  },
  {
    id: 'APT-001',
    date: '2025-06-25',
    time: '3:30 PM',
    timeZone: 'PST',
    grossSales: 200.00,
    items: 180.00,
    serviceCharges: 20.00,
    returns: 0.00,
    discounts: 10.00,
    comps: 0.00,
    netSales: 190.00,
    giftCardSales: 0.00,
    taxes: 15.20,
    tips: 25.00,
    partialRefunds: 0.00,
    channel: 'Appointment',
    device: 'Tablet',
    deviceNickname: 'Booking System',
    source: 'Square Appointments',
    totalCollected: 0.00, // Not yet paid
    status: 'Partially Paid'
  },
  {
    id: 'GC-001',
    date: '2025-06-25',
    time: '4:00 PM',
    timeZone: 'PST',
    grossSales: 50.00,
    items: 0.00,
    serviceCharges: 0.00,
    returns: 0.00,
    discounts: 0.00,
    comps: 0.00,
    netSales: 50.00,
    giftCardSales: 50.00,
    taxes: 0.00,
    tips: 0.00,
    partialRefunds: 0.00,
    channel: 'Online',
    device: 'Web',
    deviceNickname: 'Gift Card Portal',
    source: 'Square Gift Cards',
    totalCollected: 25.00, // Partially paid
    status: 'Partially Paid'
  }
];

export function TransactionsModal({ isOpen, onClose, title, transactions, filterType }: TransactionsModalProps) {
  const navigate = useNavigate();
  
  if (!isOpen) return null;

  const formatAmount = (value: number) => {
    const formatted = Math.abs(value).toFixed(2);
    return value < 0 ? `($${formatted})` : `$${formatted}`;
  };

  // Filter transactions based on type
  const filteredTransactions = mockTransactions.filter(transaction => {
    switch (filterType) {
      case 'gross-sales':
        // Gross sales should only include completed transactions with positive gross sales
        return transaction.status === 'Completed' && transaction.grossSales > 0;
      case 'sales':
        // Sales should only include payment transactions (not exchanges)
        return transaction.status === 'Completed' && transaction.id.startsWith('PAY-');
      case 'exchanges':
        // Exchanges should only include exchange transactions
        return transaction.status === 'Completed' && transaction.id.startsWith('EXC-');
      case 'net-sales':
        // Net sales should include all completed transactions (sales, exchanges, returns)
        return transaction.status === 'Completed';
      case 'returns':
        // Returns should only include completed transactions with returns > 0
        return transaction.status === 'Completed' && transaction.returns > 0;
      case 'deferred-sales':
        // Deferred sales should include partially paid transactions
        return transaction.status === 'Partially Paid';
      default:
        return true;
    }
  });

  const handleRowClick = (transaction: Transaction) => {
    // Navigate to transactions page with selected transaction highlighted
    navigate('/transactions', {
      state: {
        selectedTransaction: transaction,
        showTransactionBlade: true,
        // Apply appropriate filters based on modal type
        ...getNavigationStateForType()
      }
    });
    onClose();
  };

  const getNavigationStateForType = () => {
    const baseState = {
      dateRange: { start: new Date('2025-06-22'), end: new Date('2025-06-28') },
      location: 'All',
      timeframe: 'All day'
    };

    switch (filterType) {
      case 'gross-sales':
        return {
          ...baseState,
          filterType: 'payments',
          status: 'Completed',
          transactionTypes: ['payments', 'exchanges']
        };
      case 'sales':
        return {
          ...baseState,
          filterType: 'payments',
          status: 'Completed',
          transactionTypes: ['payments']
        };
      case 'exchanges':
        return {
          ...baseState,
          filterType: 'exchanges', 
          status: 'Completed',
          transactionTypes: ['exchanges']
        };
      case 'net-sales':
        return {
          ...baseState,
          filterType: 'all',
          status: 'Completed',
          transactionTypes: ['payments', 'exchanges', 'refunds']
        };
      case 'returns':
        return {
          ...baseState,
          filterType: 'refunds',
          status: 'Completed',
          transactionTypes: ['refunds']
        };
      case 'deferred-sales':
        return {
          ...baseState,
          filterType: 'all',
          status: 'All Status',
          transactionTypes: ['invoices', 'appointments', 'gift-cards']
        };
      default:
        return baseState;
    }
  };

  const handleViewAllTransactions = () => {
    // Close modal first
    onClose();
    
    // Navigate to transactions page with proper filters
    navigate('/transactions', { state: getNavigationStateForType() });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-7xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto max-h-[calc(90vh-120px)]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Gross Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service Charges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Returns
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discounts
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Net Sales
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Taxes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tips
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Collected
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr 
                    key={transaction.id} 
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(transaction)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>{transaction.date}</div>
                        <div className="text-gray-500">{transaction.time} {transaction.timeZone}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(transaction.grossSales)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(transaction.items)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(transaction.serviceCharges)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {formatAmount(transaction.returns)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                      {formatAmount(transaction.discounts)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(transaction.netSales)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(transaction.taxes)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(transaction.tips)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.channel}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>
                        <div>{transaction.device}</div>
                        <div className="text-gray-500">{transaction.deviceNickname}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatAmount(transaction.totalCollected)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "inline-flex px-2 py-1 text-xs font-semibold rounded-full",
                        transaction.status === 'Completed' 
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      )}>
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transactions found for this filter.
            </div>
          )}

          {/* View All Transactions Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleViewAllTransactions}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
