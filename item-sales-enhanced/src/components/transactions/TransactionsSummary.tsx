import React from 'react';
import { useTransactions } from '../../context/TransactionsContext';

export function TransactionsSummary() {
  const { state } = useTransactions();
  const { summary } = state;

  return (
    <div className="bg-white px-6 py-4 border-b border-gray-200">
      <div className="flex items-center justify-between">
        {/* Left side - Transaction count */}
        <div>
          <div className="text-2xl font-bold text-gray-900">
            {summary.totalTransactions}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            COMPLETE TRANSACTIONS
            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-600">i</span>
            </div>
          </div>
        </div>

        {/* Center - Total collected */}
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            ${Math.abs(summary.totalCollected).toFixed(2)}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            TOTAL COLLECTED
            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-600">i</span>
            </div>
          </div>
        </div>

        {/* Right side - Net sales */}
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            ${summary.netSales.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600 flex items-center gap-1">
            NET SALES
            <div className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-xs text-gray-600">i</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
