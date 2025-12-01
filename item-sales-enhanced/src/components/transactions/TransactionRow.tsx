import React from 'react';
import { Transaction } from '../../types/transactions';
import { Receipt, RefreshCw, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TransactionRowProps {
  transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
  const getTransactionIcon = () => {
    switch (transaction.type) {
      case 'refund':
        return <RefreshCw className="h-4 w-4 text-orange-500" />;
      case 'void':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'sale':
      default:
        return <Receipt className="h-4 w-4 text-gray-400" />;
    }
  };

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount < 0 ? `($${formatted})` : `$${formatted}`;
  };

  const formatTime = (time: string) => {
    return time;
  };

  const getAmountColor = (amount: number) => {
    if (amount < 0) return 'text-red-600';
    return 'text-gray-900';
  };

  return (
    <div className="flex items-center py-3 px-6 hover:bg-gray-50 border-b border-gray-100">
      {/* Icon */}
      <div className="w-8 flex justify-center">
        {getTransactionIcon()}
      </div>

      {/* Time */}
      <div className="w-20 text-sm text-gray-600">
        {formatTime(transaction.time)}
      </div>

      {/* Description */}
      <div className="flex-1 px-4">
        <div className="text-sm text-gray-900">
          {transaction.description}
        </div>
      </div>

      {/* Amount */}
      <div className={cn(
        "w-24 text-right text-sm font-medium",
        getAmountColor(transaction.amount)
      )}>
        {formatAmount(transaction.amount)}
      </div>
    </div>
  );
}
