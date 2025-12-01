import React from 'react';
import { ReportsNavigation } from '../components/reports/ReportsNavigation';
import { ReportsHeader } from '../components/reports/ReportsHeader';
import { ReportsFilters } from '../components/reports/ReportsFilters';
import { ReportsMigrationBanner } from '../components/reports/ReportsMigrationBanner';
import { SalesGauge } from '../components/reports/SalesGauge';
import { SalesBreakdown } from '../components/reports/SalesBreakdown';

export function ReportsPage() {
  return (
    <div className="h-full flex bg-gray-50">
      {/* Navigation Sidebar */}
      <ReportsNavigation />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <ReportsHeader />
        
        {/* Migration Banner */}
        <ReportsMigrationBanner />
        
        {/* Filters */}
        <ReportsFilters />
        
        {/* Content */}
        <div className="flex-1 flex">
          {/* Left Column - Sales Gauge */}
          <div className="w-80 border-r border-gray-200">
            <SalesGauge />
          </div>
          
          {/* Right Column - Sales Breakdown */}
          <div className="flex-1 p-6">
            <SalesBreakdown />
          </div>
        </div>
      </div>
    </div>
  );
}
