export type TransactionType = 'sale' | 'refund' | 'void' | 'comp' | 'discount' | 'invoice';
export type PaymentMethod = 'card' | 'cash' | 'gift_card' | 'other';
export type TransactionStatus = 'complete' | 'pending' | 'failed' | 'voided';

export interface Transaction {
  id: string;
  date: Date;
  time: string;
  type: TransactionType;
  description: string;
  items: string[];
  staff: string;
  paymentMethod?: PaymentMethod;
  amount: number;
  status: TransactionStatus;
  receiptNumber?: string;
  customerId?: string;
  location: string;
  deviceId?: string;
  refundReason?: string;
  originalTransactionId?: string;
}

export interface TransactionSummary {
  totalTransactions: number;
  totalCollected: number;
  netSales: number;
  dateRange: {
    start: Date;
    end: Date;
  };
  timeRange: string;
}

export interface TransactionFilters {
  dateRange: {
    start: Date;
    end: Date;
  };
  timeRange: string;
  paymentMethods: PaymentMethod[];
  types: TransactionType[];
  status: TransactionStatus[];
  locations: string[];
  sources: string[];
  teamMembers: string[];
  fees: string[];
  searchQuery: string;
}

export interface TransactionState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  summary: TransactionSummary;
  filters: TransactionFilters;
  isLoading: boolean;
  error: string | null;
  selectedTransactionType?: TransactionType;
}
