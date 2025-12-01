import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { TransactionState, TransactionFilters, Transaction, TransactionType } from '../types/transactions';
import { mockTransactions, getTransactionsByType, calculateTransactionTotals } from '../data/mockTransactionsData';

interface TransactionsContextType {
  state: TransactionState;
  dispatch: React.Dispatch<TransactionsAction>;
  updateFilters: (filters: Partial<TransactionFilters>) => void;
  filterByType: (type: TransactionType) => void;
  clearFilters: () => void;
  searchTransactions: (query: string) => void;
}

type TransactionsAction =
  | { type: 'SET_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_FILTERED_TRANSACTIONS'; payload: Transaction[] }
  | { type: 'SET_FILTERS'; payload: Partial<TransactionFilters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SELECTED_TYPE'; payload: TransactionType | undefined };

const initialFilters: TransactionFilters = {
  dateRange: {
    start: new Date('2025-06-22'),
    end: new Date('2025-06-28')
  },
  timeRange: '9:00 pm - 9:00 pm',
  paymentMethods: [],
  types: [],
  status: [],
  locations: [],
  sources: [],
  teamMembers: [],
  fees: [],
  searchQuery: ''
};

const initialState: TransactionState = {
  transactions: mockTransactions,
  filteredTransactions: mockTransactions,
  summary: {
    totalTransactions: mockTransactions.length,
    totalCollected: 760.53,
    netSales: 758.94,
    dateRange: initialFilters.dateRange,
    timeRange: 'All day (12:00 am - 12:00 am EDT)'
  },
  filters: initialFilters,
  isLoading: false,
  error: null
};

const TransactionsContext = createContext<TransactionsContextType | undefined>(undefined);

function transactionsReducer(state: TransactionState, action: TransactionsAction): TransactionState {
  switch (action.type) {
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_FILTERED_TRANSACTIONS':
      const totals = calculateTransactionTotals(action.payload);
      return { 
        ...state, 
        filteredTransactions: action.payload,
        summary: {
          ...state.summary,
          totalTransactions: totals.totalTransactions,
          totalCollected: totals.totalCollected,
          netSales: totals.netSales
        }
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SELECTED_TYPE':
      return { ...state, selectedTransactionType: action.payload };
    default:
      return state;
  }
}

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(transactionsReducer, initialState);

  const applyFilters = (transactions: Transaction[], filters: TransactionFilters): Transaction[] => {
    let filtered = [...transactions];

    // Filter by type
    if (filters.types.length > 0) {
      filtered = filtered.filter(txn => filters.types.includes(txn.type));
    }

    // Filter by payment methods
    if (filters.paymentMethods.length > 0) {
      filtered = filtered.filter(txn => 
        txn.paymentMethod && filters.paymentMethods.includes(txn.paymentMethod)
      );
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(txn =>
        txn.description.toLowerCase().includes(query) ||
        txn.staff.toLowerCase().includes(query) ||
        txn.items.some(item => item.toLowerCase().includes(query))
      );
    }

    // Filter by date range
    filtered = filtered.filter(txn => {
      const txnDate = new Date(txn.date);
      return txnDate >= filters.dateRange.start && txnDate <= filters.dateRange.end;
    });

    return filtered;
  };

  const updateFilters = (newFilters: Partial<TransactionFilters>) => {
    const updatedFilters = { ...state.filters, ...newFilters };
    dispatch({ type: 'SET_FILTERS', payload: newFilters });
    
    const filteredTransactions = applyFilters(state.transactions, updatedFilters);
    dispatch({ type: 'SET_FILTERED_TRANSACTIONS', payload: filteredTransactions });
  };

  const filterByType = (type: TransactionType) => {
    dispatch({ type: 'SET_SELECTED_TYPE', payload: type });
    const filteredTransactions = getTransactionsByType(type);
    dispatch({ type: 'SET_FILTERED_TRANSACTIONS', payload: filteredTransactions });
    
    // Update filters to reflect the type filter
    updateFilters({ types: [type] });
  };

  const clearFilters = () => {
    dispatch({ type: 'SET_FILTERS', payload: initialFilters });
    dispatch({ type: 'SET_FILTERED_TRANSACTIONS', payload: state.transactions });
    dispatch({ type: 'SET_SELECTED_TYPE', payload: undefined });
  };

  const searchTransactions = (query: string) => {
    updateFilters({ searchQuery: query });
  };

  return (
    <TransactionsContext.Provider
      value={{
        state,
        dispatch,
        updateFilters,
        filterByType,
        clearFilters,
        searchTransactions
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
}
