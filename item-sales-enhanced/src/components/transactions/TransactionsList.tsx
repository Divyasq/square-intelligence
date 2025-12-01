import React from 'react';
import { useTransactions } from '../../context/TransactionsContext';
import { TransactionRow } from './TransactionRow';

export function TransactionsList() {
  const { state } = useTransactions();
  const { filteredTransactions } = state;

  // Group transactions by date
  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const dateKey = transaction.date.toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(transaction);
    return groups;
  }, {} as Record<string, typeof filteredTransactions>);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white">
      {Object.entries(groupedTransactions).map(([dateKey, transactions]) => (
        <div key={dateKey}>
          {/* Date Header */}
          <div className="bg-gray-50 px-6 py-2 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-700">
              {formatDate(dateKey)}
            </h3>
          </div>

          {/* Transactions for this date */}
          <div>
            {transactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        </div>
      ))}

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">
            No transactions found for the selected filters.
          </div>
        </div>
      )}
    </div>
  );
}
