import React from 'react';
import { useReports } from '../../context/ReportsContext';
import { MetricTooltip } from '../education/ContextualTooltip';

export function SalesGauge() {
  const { state } = useReports();
  const { salesData } = state;

  // Calculate the percentage for the gauge
  const netSalesPercentage = Math.abs(salesData.netSales) / Math.abs(salesData.totalSales) * 100;
  const returnsPercentage = Math.abs(salesData.returns) / Math.abs(salesData.totalSales) * 100;

  return (
    <div className="bg-white p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm text-gray-600">Total sales</span>
          <MetricTooltip
            metric="Total Sales"
            explanation="Total sales represents the sum of all successful transactions, including items, taxes, and tips, minus any refunds or voids."
            formula="Total Sales = Gross Sales + Taxes + Tips - Refunds - Voids"
            example="If you sold $1000 in items, collected $80 in taxes, $50 in tips, and had $30 in refunds, your total sales would be $1100."
          />
        </div>
        <div className="text-3xl font-bold text-gray-900">
          ${Math.abs(salesData.totalSales).toFixed(2)}
        </div>
      </div>

      {/* Gauge Bar */}
      <div className="mb-6">
        <div className="flex h-4 rounded-full overflow-hidden bg-gray-200">
          <div 
            className="bg-blue-500 transition-all duration-500"
            style={{ width: `${netSalesPercentage}%` }}
          />
          <div 
            className="bg-red-500 transition-all duration-500"
            style={{ width: `${returnsPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <span>Net sales</span>
            <MetricTooltip
              metric="Net Sales"
              explanation="Net sales is your gross sales minus refunds, voids, and discounts. This represents your actual revenue after deductions."
              formula="Net Sales = Gross Sales - Refunds - Voids - Discounts"
              example="If you had $1000 in gross sales and $50 in refunds, your net sales would be $950."
            />
          </div>
          <div className="flex items-center gap-1">
            <span>Returns</span>
            <MetricTooltip
              metric="Returns"
              explanation="Returns represent money refunded to customers for returned items or cancelled services."
              formula="Returns = Sum of all refund transactions"
              example="If you processed 3 refunds of $20, $15, and $10, your total returns would be $45."
            />
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-700">Summary</div>
        <div className="text-xs text-gray-500">
          All day (12:00 AM-12:00 AM ET)
        </div>
      </div>
    </div>
  );
}
