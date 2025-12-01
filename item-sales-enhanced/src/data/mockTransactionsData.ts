import { Transaction, TransactionType } from '../types/transactions';

// Mock transaction data
export const mockTransactions: Transaction[] = [
  {
    id: 'txn_001',
    date: new Date('2025-06-26'),
    time: '1:37 pm',
    type: 'refund',
    description: 'Refund of Massage SL',
    items: ['Massage SL'],
    staff: 'System',
    amount: -865.00,
    status: 'complete',
    location: 'Main Location',
    refundReason: 'Customer request'
  },
  {
    id: 'txn_002',
    date: new Date('2025-06-26'),
    time: '1:34 pm',
    type: 'sale',
    description: 'Massage SL',
    items: ['Massage SL'],
    staff: 'Peng F SL',
    paymentMethod: 'card',
    amount: 100.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_003',
    date: new Date('2025-06-26'),
    time: '1:29 pm',
    type: 'refund',
    description: 'Refund of Online site item - Issued by Peng F SL',
    items: ['Online site item'],
    staff: 'Peng F SL',
    amount: -850.00,
    status: 'complete',
    location: 'Main Location',
    refundReason: 'Product issue'
  },
  {
    id: 'txn_004',
    date: new Date('2025-06-26'),
    time: '1:24 pm',
    type: 'sale',
    description: 'Online site item - Collected by Divya C SL',
    items: ['Online site item'],
    staff: 'Divya C SL',
    paymentMethod: 'cash',
    amount: 50.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_005',
    date: new Date('2025-06-26'),
    time: '1:19 pm',
    type: 'refund',
    description: 'Refund of Massage - Issued by Divya C SL',
    items: ['Massage'],
    staff: 'Divya C SL',
    amount: -100.00,
    status: 'complete',
    location: 'Main Location',
    refundReason: 'Service cancellation'
  },
  {
    id: 'txn_006',
    date: new Date('2025-06-26'),
    time: '1:10 pm',
    type: 'sale',
    description: 'Massage - Collected by Hank D SL',
    items: ['Massage'],
    staff: 'Hank D SL',
    paymentMethod: 'card',
    amount: 100.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_007',
    date: new Date('2025-06-26'),
    time: '12:47 pm',
    type: 'refund',
    description: 'Refund of Apple, Croissant - Issued by Peng F SL',
    items: ['Apple', 'Croissant'],
    staff: 'Peng F SL',
    amount: -5.20,
    status: 'complete',
    location: 'Main Location',
    refundReason: 'Wrong order'
  },
  {
    id: 'txn_008',
    date: new Date('2025-06-26'),
    time: '12:41 pm',
    type: 'sale',
    description: 'Chocolate Shake - Collected by Peng F SL',
    items: ['Chocolate Shake'],
    staff: 'Peng F SL',
    paymentMethod: 'cash',
    amount: 15.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_009',
    date: new Date('2025-06-26'),
    time: '12:35 pm',
    type: 'sale',
    description: 'Apple, Croissant SL',
    items: ['Apple', 'Croissant SL'],
    staff: 'System',
    paymentMethod: 'card',
    amount: 5.20,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_010',
    date: new Date('2025-06-26'),
    time: '12:18 pm',
    type: 'refund',
    description: 'Refund of Massage - Issued by Divya C SL',
    items: ['Massage'],
    staff: 'Divya C SL',
    amount: -100.00,
    status: 'complete',
    location: 'Main Location',
    refundReason: 'Customer dissatisfaction'
  },
  {
    id: 'txn_011',
    date: new Date('2025-06-26'),
    time: '12:13 pm',
    type: 'sale',
    description: 'Invoice #000031 - Collected by Hank D SL',
    items: ['Invoice #000031'],
    staff: 'Hank D SL',
    paymentMethod: 'card',
    amount: 100.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_012',
    date: new Date('2025-06-26'),
    time: '11:56 am',
    type: 'refund',
    description: 'Refund of Massage SL',
    items: ['Massage SL'],
    staff: 'System',
    amount: -100.00,
    status: 'complete',
    location: 'Main Location',
    refundReason: 'Service not provided'
  },
  {
    id: 'txn_013',
    date: new Date('2025-06-26'),
    time: '11:53 am',
    type: 'sale',
    description: 'Massage SL',
    items: ['Massage SL'],
    staff: 'System',
    paymentMethod: 'cash',
    amount: 100.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_014',
    date: new Date('2025-06-26'),
    time: '11:47 am',
    type: 'sale',
    description: 'Massage - Collected by Divya C SL',
    items: ['Massage'],
    staff: 'Divya C SL',
    paymentMethod: 'card',
    amount: 100.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_015',
    date: new Date('2025-06-26'),
    time: '11:41 am',
    type: 'sale',
    description: 'Massage - Collected by Ibrahim B SL',
    items: ['Massage'],
    staff: 'Ibrahim B SL',
    paymentMethod: 'cash',
    amount: 100.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_016',
    date: new Date('2025-06-26'),
    time: '11:04 am',
    type: 'sale',
    description: 'Online site item - Collected by Steven H SL',
    items: ['Online site item'],
    staff: 'Steven H SL',
    paymentMethod: 'card',
    amount: 50.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_017',
    date: new Date('2025-06-26'),
    time: '10:53 am',
    type: 'refund',
    description: 'Refund of Massage, Online site item - Issued by Divya C SL',
    items: ['Massage', 'Online site item'],
    staff: 'Divya C SL',
    amount: -150.00,
    status: 'complete',
    location: 'Main Location',
    refundReason: 'Billing error'
  },
  {
    id: 'txn_018',
    date: new Date('2025-06-26'),
    time: '10:50 am',
    type: 'sale',
    description: 'Massage, Online site item - Collected by Hank D SL',
    items: ['Massage', 'Online site item'],
    staff: 'Hank D SL',
    paymentMethod: 'cash',
    amount: 150.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_019',
    date: new Date('2025-06-26'),
    time: '10:49 am',
    type: 'refund',
    description: 'Refund of Massage, Online site item - Issued by Hank D SL',
    items: ['Massage', 'Online site item'],
    staff: 'Hank D SL',
    amount: -150.00,
    status: 'complete',
    location: 'Main Location',
    refundReason: 'Duplicate charge'
  },
  {
    id: 'txn_020',
    date: new Date('2025-06-26'),
    time: '10:44 am',
    type: 'sale',
    description: 'Massage, Online site item - Collected by Hank D SL',
    items: ['Massage', 'Online site item'],
    staff: 'Hank D SL',
    paymentMethod: 'card',
    amount: 150.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_021',
    date: new Date('2025-06-26'),
    time: '10:23 am',
    type: 'sale',
    description: 'Massage, Online site item, Massage SL',
    items: ['Massage', 'Online site item', 'Massage SL'],
    staff: 'System',
    paymentMethod: 'cash',
    amount: 250.00,
    status: 'complete',
    location: 'Main Location'
  },
  {
    id: 'txn_022',
    date: new Date('2025-06-26'),
    time: '9:54 am',
    type: 'sale',
    description: 'Online site item SL',
    items: ['Online site item SL'],
    staff: 'System',
    paymentMethod: 'card',
    amount: 50.00,
    status: 'complete',
    location: 'Main Location'
  }
];

// Filter transactions by type
export const getTransactionsByType = (type: TransactionType): Transaction[] => {
  return mockTransactions.filter(transaction => transaction.type === type);
};

// Get all refunds
export const getRefunds = (): Transaction[] => {
  return getTransactionsByType('refund');
};

// Get all sales
export const getSales = (): Transaction[] => {
  return getTransactionsByType('sale');
};

// Get all voids
export const getVoids = (): Transaction[] => {
  return getTransactionsByType('void');
};

// Get all comps
export const getComps = (): Transaction[] => {
  return getTransactionsByType('comp');
};

// Calculate totals
export const calculateTransactionTotals = (transactions: Transaction[]) => {
  const totalTransactions = transactions.length;
  const totalCollected = transactions.reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
  const netSales = transactions.reduce((sum, txn) => sum + txn.amount, 0);
  
  return {
    totalTransactions,
    totalCollected,
    netSales
  };
};
