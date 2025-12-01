import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { DashboardData } from '../types/dashboard';

interface DashboardState {
  data: DashboardData | null;
  loading: boolean;
  error: string | null;
}

type DashboardAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_DATA'; payload: DashboardData }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'CLEAR_ERROR' };

const initialState: DashboardState = {
  data: null,
  loading: false,
  error: null,
};

function dashboardReducer(state: DashboardState, action: DashboardAction): DashboardState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload, loading: false, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

interface DashboardContextType {
  state: DashboardState;
  dispatch: React.Dispatch<DashboardAction>;
  setData: (data: DashboardData) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string) => void;
  clearError: () => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

interface DashboardProviderProps {
  children: ReactNode;
}

export function DashboardProvider({ children }: DashboardProviderProps) {
  const [state, dispatch] = useReducer(dashboardReducer, initialState);

  const setData = useCallback((data: DashboardData) => {
    dispatch({ type: 'SET_DATA', payload: data });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  }, []);

  const setError = useCallback((error: string) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const contextValue: DashboardContextType = {
    state,
    dispatch,
    setData,
    setLoading,
    setError,
    clearError,
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}
