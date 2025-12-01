import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ReportState, ReportFilters, SalesBreakdown } from '../types/reports';
import { generateMockSalesData, calculateSalesData } from '../data/mockReportsData';

interface ReportsContextType {
  state: ReportState;
  dispatch: React.Dispatch<ReportsAction>;
  updateFilters: (filters: Partial<ReportFilters>) => void;
  refreshData: () => void;
}

type ReportsAction =
  | { type: 'SET_SALES_DATA'; payload: SalesBreakdown }
  | { type: 'SET_FILTERS'; payload: Partial<ReportFilters> }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const initialFilters: ReportFilters = {
  dateRange: {
    start: new Date('2025-06-22'),
    end: new Date('2025-06-28')
  },
  location: 'All',
  timeframe: 'All day',
  groupBy: 'All'
};

const initialState: ReportState = {
  salesData: calculateSalesData(generateMockSalesData(initialFilters.dateRange)),
  filters: initialFilters,
  isLoading: false,
  error: null
};

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

function reportsReducer(state: ReportState, action: ReportsAction): ReportState {
  switch (action.type) {
    case 'SET_SALES_DATA':
      return { ...state, salesData: action.payload };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function ReportsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reportsReducer, initialState);

  const updateFilters = (filters: Partial<ReportFilters>) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
    
    // Regenerate data based on new filters
    const newFilters = { ...state.filters, ...filters };
    const newData = calculateSalesData(generateMockSalesData(newFilters.dateRange));
    dispatch({ type: 'SET_SALES_DATA', payload: newData });
  };

  const refreshData = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    setTimeout(() => {
      const newData = calculateSalesData(generateMockSalesData(state.filters.dateRange));
      dispatch({ type: 'SET_SALES_DATA', payload: newData });
      dispatch({ type: 'SET_LOADING', payload: false });
    }, 1000);
  };

  return (
    <ReportsContext.Provider
      value={{
        state,
        dispatch,
        updateFilters,
        refreshData
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error('useReports must be used within a ReportsProvider');
  }
  return context;
}
