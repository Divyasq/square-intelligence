import React, { useEffect } from 'react';
import { useDashboard } from '../context/DashboardContext';
import { PerformanceDashboard } from '../components/ui/PerformanceDashboard';
import { mockDashboardData } from '../data/mockDashboardData';

export function DashboardPage() {
  const { state, setData } = useDashboard();

  useEffect(() => {
    // Load mock dashboard data
    setData(mockDashboardData);
  }, [setData]);

  return (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Dashboard
        </h2>
        <p className="text-gray-600">
          Overview of your Square business performance
        </p>
      </div>
      
      {/* Performance Dashboard Component - reusing existing component with data */}
      <PerformanceDashboard data={state.data} />
    </div>
  );
}
