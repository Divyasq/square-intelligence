import React, { useState } from 'react';
import { DeferredSalesNavigation } from '../components/deferred-sales/DeferredSalesNavigation';
import { DeferredSalesHeader } from '../components/deferred-sales/DeferredSalesHeader';
import { DeferredSalesFilters } from '../components/deferred-sales/DeferredSalesFilters';
import { SalesSummaryTable } from '../components/deferred-sales/SalesSummaryTable';
import { DailySalesTable } from '../components/deferred-sales/DailySalesTable';
import { useDeferredSales } from '../context/DeferredSalesContext';

export function DeferredSalesPage() {
  const { selectedScenario, dateRange, getScenarioDataForDate } = useDeferredSales();
  const [reportType, setReportType] = useState('Summary');

  // Get the scenario data adjusted for the selected date range
  const displayScenario = selectedScenario 
    ? getScenarioDataForDate(selectedScenario, dateRange)
    : null;

  const handleReportTypeChange = (newReportType: string) => {
    setReportType(newReportType);
  };

  return (
    <div className="h-full flex bg-gray-50">
      {/* Navigation Sidebar */}
      <DeferredSalesNavigation />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <DeferredSalesHeader />
        
        {/* Filters */}
        <DeferredSalesFilters onReportTypeChange={handleReportTypeChange} />
        
        {/* Content */}
        {displayScenario ? (
          <div className="flex-1 p-6">
            {reportType === 'Daily' ? (
              <DailySalesTable 
                scenario={displayScenario} 
                dateRange={dateRange} 
              />
            ) : (
              <SalesSummaryTable
                salesSections={displayScenario.salesSections}
                paymentSections={displayScenario.paymentSections}
              />
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Select a Scenario</h2>
              <p className="text-gray-600">Choose a deferred sales scenario from the navigation to view the sales summary.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
