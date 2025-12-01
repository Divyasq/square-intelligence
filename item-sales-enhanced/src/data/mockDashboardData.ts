import { DashboardData, DashboardMetric, CustomerStats, PaymentType, ActionCenterAlert } from '../types/dashboard';

export const mockDashboardMetrics: DashboardMetric[] = [
  {
    id: 'net-sales',
    label: 'Net Sales',
    value: '$12,487.50',
    change: '+23.5%',
    changeType: 'positive',
    href: '/dashboard/sales/reports/sales-summary'
  },
  {
    id: 'gross-sales',
    label: 'Gross Sales',
    value: '$13,125.75',
    change: '+18.2%',
    changeType: 'positive',
    href: '/dashboard/sales/reports/sales-summary'
  },
  {
    id: 'transactions',
    label: 'Transactions',
    value: '247',
    change: '+12.8%',
    changeType: 'positive',
    href: '/dashboard/sales/transactions'
  },
  {
    id: 'average-net-sale',
    label: 'Average Net Sale',
    value: '$50.56',
    change: '+8.4%',
    changeType: 'positive',
    href: '/dashboard/sales/reports/sales-summary'
  },
  {
    id: 'returns-refunds',
    label: 'Returns and Refunds',
    value: '$638.25',
    change: '-2.1%',
    changeType: 'positive', // Lower returns is good
    href: '/dashboard/sales/transactions'
  }
];

export const mockCustomerStats: CustomerStats = {
  totalCustomers: 156,
  returningCustomers: 89,
  avgVisitsPerCustomer: 2.3,
  avgSpentPerVisit: '$47.25',
  positiveFeedback: 94,
  negativeFeedback: 6
};

export const mockPaymentTypes: PaymentType[] = [
  {
    id: 'card',
    name: 'Card',
    amount: '$8,750.25',
    percentage: 67,
    color: 'rgb(0, 106, 255)'
  },
  {
    id: 'cash',
    name: 'Cash',
    amount: '$2,987.50',
    percentage: 23,
    color: 'rgb(204, 225, 255)'
  },
  {
    id: 'digital',
    name: 'Digital Wallet',
    amount: '$1,312.75',
    percentage: 10,
    color: 'rgb(102, 187, 106)'
  },
  {
    id: 'other',
    name: 'Other',
    amount: '$37.00',
    percentage: 0,
    color: 'rgb(229, 240, 255)'
  }
];

// Action Center Alerts - matching the deleted cards from your screenshot
export const mockActionCenterAlerts: ActionCenterAlert[] = [
  {
    id: 'churn-risk-sarah',
    type: 'churn-risk',
    title: 'High-Value Customer Churn Risk',
    description: "Sarah Johnson (CLV: $2,850) hasn't visited in 47 days, exceeding your configured 45-day threshold.",
    severity: 'high',
    metrics: [
      { label: 'Customer CLV', value: '$2,850' },
      { label: 'Days Since Visit', value: '47 days' },
      { label: 'Churn Probability', value: '78%' }
    ],
    actions: [
      { label: 'Send Offer', type: 'primary', action: 'send-offer' },
      { label: 'View Details', type: 'secondary', action: 'view-details' }
    ],
    timestamp: '2024-01-14 22:00',
    confidence: 78
  },
  {
    id: 'high-comps-alert',
    type: 'comps-alert', 
    title: 'High Comps Alert',
    description: "Today's comps reached $847, exceeding your configured $500 alert threshold.",
    severity: 'high',
    metrics: [
      { label: 'Comps Today', value: '$847' },
      { label: 'Threshold', value: '$500' },
      { label: 'Transactions', value: '12' }
    ],
    actions: [
      { label: 'Review Portions', type: 'primary', action: 'review-portions' },
      { label: 'View Details', type: 'secondary', action: 'view-details' }
    ],
    timestamp: '2024-01-14 16:45:00',
    confidence: 95
  }
];

export const mockDashboardData: DashboardData = {
  selectedDate: 'Jul 18',
  keyMetrics: mockDashboardMetrics,
  customerStats: mockCustomerStats,
  paymentTypes: mockPaymentTypes,
  hasItemsSales: true,
  actionCenterAlerts: mockActionCenterAlerts
};

// Additional mock data for potential future use
export const mockTopProducts = [
  {
    id: '1',
    name: 'Premium Coffee Blend',
    sales: '$2,487.50',
    quantity: 89,
    change: '+15.2%',
    changeType: 'positive'
  },
  {
    id: '2',
    name: 'Artisan Pastries',
    sales: '$1,925.75',
    quantity: 67,
    change: '+8.7%',
    changeType: 'positive'
  },
  {
    id: '3',
    name: 'Specialty Teas',
    sales: '$1,325.25',
    quantity: 45,
    change: '+12.4%',
    changeType: 'positive'
  },
  {
    id: '4',
    name: 'Coffee Equipment',
    sales: '$892.50',
    quantity: 12,
    change: '-3.2%',
    changeType: 'negative'
  },
  {
    id: '5',
    name: 'Gift Cards',
    sales: '$750.00',
    quantity: 25,
    change: '+22.1%',
    changeType: 'positive'
  }
];

export const mockRecentTransactions = [
  {
    id: 'txn_001',
    customer: 'Sarah Johnson',
    amount: '$47.25',
    items: ['Premium Coffee Blend', 'Croissant'],
    paymentMethod: 'Card',
    timestamp: '2024-07-19 14:32:15',
    status: 'completed'
  },
  {
    id: 'txn_002',
    customer: 'Mike Chen',
    amount: '$23.50',
    items: ['Specialty Tea', 'Muffin'],
    paymentMethod: 'Digital Wallet',
    timestamp: '2024-07-19 14:28:42',
    status: 'completed'
  },
  {
    id: 'txn_003',
    customer: 'Guest Customer',
    amount: '$15.75',
    items: ['Coffee', 'Cookie'],
    paymentMethod: 'Cash',
    timestamp: '2024-07-19 14:25:33',
    status: 'completed'
  },
  {
    id: 'txn_004',
    customer: 'Emma Wilson',
    amount: '$125.00',
    items: ['Coffee Equipment'],
    paymentMethod: 'Card',
    timestamp: '2024-07-19 14:18:17',
    status: 'completed'
  },
  {
    id: 'txn_005',
    customer: 'Robert Davis',
    amount: '$67.80',
    items: ['Premium Coffee Blend', 'Pastry Box', 'Tea'],
    paymentMethod: 'Card',
    timestamp: '2024-07-19 14:12:58',
    status: 'completed'
  }
];

export const mockBusinessHours = [
  { day: 'Monday', open: '7:00 AM', close: '8:00 PM', sales: '$1,842.50' },
  { day: 'Tuesday', open: '7:00 AM', close: '8:00 PM', sales: '$2,156.75' },
  { day: 'Wednesday', open: '7:00 AM', close: '8:00 PM', sales: '$1,923.25' },
  { day: 'Thursday', open: '7:00 AM', close: '8:00 PM', sales: '$2,387.50' },
  { day: 'Friday', open: '7:00 AM', close: '9:00 PM', sales: '$2,845.75' },
  { day: 'Saturday', open: '8:00 AM', close: '9:00 PM', sales: '$3,247.25' },
  { day: 'Sunday', open: '8:00 AM', close: '7:00 PM', sales: '$2,734.50' }
];
