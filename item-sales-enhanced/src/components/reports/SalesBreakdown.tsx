import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useReports } from '../../context/ReportsContext';
import { cn } from '../../utils/cn';
import { GrossSalesTableModal } from './GrossSalesTableModal';
import { TransactionsModal } from './TransactionsModal';

interface SalesLineItemProps {
  label: string;
  amount: number;
  isExpandable?: boolean;
  isExpanded?: boolean;
  onToggle?: () => void;
  onClick?: () => void;
  children?: React.ReactNode;
  level?: number;
  hasRedDot?: boolean;
  isClickable?: boolean;
  transactionCount?: string;
  onTransactionCountClick?: () => void;
  onSalesClick?: () => void;
  onExchangesClick?: () => void;
}

function SalesLineItem({ 
  label, 
  amount, 
  isExpandable = false, 
  isExpanded = false, 
  onToggle, 
  onClick,
  children, 
  level = 0,
  hasRedDot = false,
  isClickable = false,
  transactionCount,
  onTransactionCountClick,
  onSalesClick,
  onExchangesClick
}: SalesLineItemProps) {
  const formatAmount = (value: number) => {
    const formatted = Math.abs(value).toFixed(2);
    return value < 0 ? `($${formatted})` : `$${formatted}`;
  };

  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle();
    }
  };

  const handleAmountClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isClickable && onClick) {
      onClick();
    }
  };

  const handleTransactionCountClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onTransactionCountClick) {
      onTransactionCountClick();
    }
  };

  const handleSalesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onSalesClick) {
      onSalesClick();
    }
  };

  const handleExchangesClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onExchangesClick) {
      onExchangesClick();
    }
  };

  // Check if this is the special "X sales + Y exchanges" format
  const isSalesAndExchanges = transactionCount?.includes('sales + ') && transactionCount?.includes('exchanges');
  
  // Parse the sales and exchanges counts if it's the special format
  const parseSalesAndExchanges = (text: string) => {
    const match = text.match(/(\d+)\s+sales\s+\+\s+(\d+)\s+exchanges/);
    if (match) {
      return {
        salesCount: match[1],
        exchangesCount: match[2]
      };
    }
    return null;
  };

  const salesAndExchangesData = isSalesAndExchanges && transactionCount 
    ? parseSalesAndExchanges(transactionCount) 
    : null;

  return (
    <div>
      <div className={cn(
        "flex items-center justify-between py-2 transition-colors",
        level > 0 && "pl-6"
      )}>
        <div className="flex items-center gap-2">
          {isExpandable && (
            <button 
              className="p-0.5 hover:bg-gray-100 rounded"
              onClick={handleToggleClick}
            >
              {isExpanded ? (
                <ChevronDown className="h-3 w-3 text-gray-400" />
              ) : (
                <ChevronRight className="h-3 w-3 text-gray-400" />
              )}
            </button>
          )}
          {!isExpandable && level > 0 && <div className="w-4" />}
          
          <div className="flex items-center gap-2">
            {hasRedDot && (
              <div className="w-2 h-2 bg-red-500 rounded-full" />
            )}
            <div className="flex flex-col">
              <span className={cn(
                "text-sm",
                level === 0 ? "font-medium text-gray-900" : "text-gray-700"
              )}>
                {label}
              </span>
              {transactionCount && (
                <span className="text-xs text-gray-500">
                  {isSalesAndExchanges && salesAndExchangesData ? (
                    <span>
                      <span 
                        className="cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={handleSalesClick}
                      >
                        {salesAndExchangesData.salesCount} sales
                      </span>
                      <span> + </span>
                      <span 
                        className="cursor-pointer hover:text-blue-600 hover:underline"
                        onClick={handleExchangesClick}
                      >
                        {salesAndExchangesData.exchangesCount} exchanges
                      </span>
                    </span>
                  ) : (
                    <span 
                      className={cn(
                        onTransactionCountClick && "cursor-pointer hover:text-blue-600 hover:underline"
                      )}
                      onClick={handleTransactionCountClick}
                    >
                      {transactionCount}
                    </span>
                  )}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <span 
          className={cn(
            "text-sm font-medium cursor-pointer hover:bg-blue-50 px-2 py-1 rounded",
            amount < 0 ? "text-red-600" : "text-gray-900",
            isClickable && "hover:text-blue-600"
          )}
          onClick={handleAmountClick}
        >
          {formatAmount(amount)}
        </span>
      </div>
      
      {isExpanded && children && (
        <div className="border-l border-gray-200 ml-3">
          {children}
        </div>
      )}
    </div>
  );
}

export function SalesBreakdown() {
  const { state } = useReports();
  const { salesData } = state;
  const navigate = useNavigate();
  
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    grossSales: true,
    serviceCharges: false,
    discountsAndComps: false,
    netSales: false,
    giftCardSales: false,
    deferredSales: false,
    taxes: false,
    tips: false,
    totalSales: false,
    totalPayments: true,
    fees: true
  });

  const [isGrossSalesModalOpen, setIsGrossSalesModalOpen] = useState(false);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [isExchangesModalOpen, setIsExchangesModalOpen] = useState(false);
  const [isNetSalesModalOpen, setIsNetSalesModalOpen] = useState(false);
  const [isReturnsModalOpen, setIsReturnsModalOpen] = useState(false);
  const [isDeferredSalesModalOpen, setIsDeferredSalesModalOpen] = useState(false);
  const [deferredSalesType, setDeferredSalesType] = useState<'gift-card' | 'invoice' | 'square-online'>('gift-card');

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNavigateToTransactions = (transactionType?: string) => {
    // Navigate to transactions page with appropriate filters
    navigate('/transactions', { 
      state: { 
        filterType: transactionType,
        dateRange: state.filters.dateRange 
      } 
    });
  };

  const handleNavigateToSalesTransactions = () => {
    // Open sales modal instead of navigating
    setIsSalesModalOpen(true);
  };

  const handleNavigateToExchangeTransactions = () => {
    // Open exchanges modal instead of navigating
    setIsExchangesModalOpen(true);
  };

  return (
    <div className="bg-white">
      <div className="divide-y divide-gray-100">
        {/* Gross Sales */}
        <SalesLineItem
          label="Gross sales"
          amount={salesData.items + salesData.serviceCharges.covidServiceCharge + salesData.serviceCharges.setupCost + salesData.serviceCharges.autoGratuity}
          transactionCount="28 transactions"
          onTransactionCountClick={() => setIsGrossSalesModalOpen(true)}
          isExpandable={true}
          isExpanded={expandedSections.grossSales}
          onToggle={() => toggleSection('grossSales')}
          isClickable={true}
          onClick={() => setIsGrossSalesModalOpen(true)}
        >
          <SalesLineItem 
            label="Items" 
            amount={salesData.items} 
            transactionCount="20 sales + 8 exchanges"
            onTransactionCountClick={() => setIsGrossSalesModalOpen(true)}
            onSalesClick={handleNavigateToSalesTransactions}
            onExchangesClick={handleNavigateToExchangeTransactions}
            level={1}
            isClickable={true}
            onClick={() => handleNavigateToTransactions('sale')}
          />
          <SalesLineItem 
            label="Service charges" 
            amount={salesData.serviceCharges.covidServiceCharge + salesData.serviceCharges.setupCost + salesData.serviceCharges.autoGratuity}
            transactionCount="3 transactions"
            onTransactionCountClick={() => setIsGrossSalesModalOpen(true)}
            level={1}
            isClickable={true}
            onClick={() => handleNavigateToTransactions('service')}
          />
        </SalesLineItem>

        {/* Returns */}
        <SalesLineItem
          label="Returns"
          amount={salesData.returns}
          transactionCount="3 transactions"
          onTransactionCountClick={() => setIsReturnsModalOpen(true)}
          hasRedDot={true}
          isClickable={true}
          onClick={() => setIsReturnsModalOpen(true)}
        />

        {/* Discounts & Comps */}
        <SalesLineItem
          label="Discounts & comps"
          amount={salesData.discountsAndComps}
          transactionCount="2 transactions"
          isExpandable={true}
          isExpanded={expandedSections.discountsAndComps}
          onToggle={() => toggleSection('discountsAndComps')}
          hasRedDot={true}
          isClickable={true}
          onClick={() => handleNavigateToTransactions('comp')}
        />

        {/* Net Sales */}
        <SalesLineItem
          label="Net sales"
          amount={salesData.netSales}
          transactionCount="30 transactions"
          onTransactionCountClick={() => setIsNetSalesModalOpen(true)}
          isExpandable={true}
          isExpanded={expandedSections.netSales}
          onToggle={() => toggleSection('netSales')}
          hasRedDot={true}
          isClickable={true}
          onClick={() => setIsNetSalesModalOpen(true)}
        />

        {/* Deferred Sales */}
        <SalesLineItem
          label="Deferred Sales"
          amount={salesData.deferredSales.giftCardSales + salesData.deferredSales.invoices + salesData.deferredSales.invoiceDepositRedeemed}
          isExpandable={true}
          isExpanded={expandedSections.deferredSales}
          onToggle={() => toggleSection('deferredSales')}
          hasRedDot={true}
        >
          <SalesLineItem 
            label="Gift Card Sales" 
            amount={salesData.deferredSales.giftCardSales} 
            transactionCount="0 transactions"
            onTransactionCountClick={() => {
              setDeferredSalesType('gift-card');
              setIsDeferredSalesModalOpen(true);
            }}
            level={1}
            isClickable={true}
            onClick={() => {
              setDeferredSalesType('gift-card');
              setIsDeferredSalesModalOpen(true);
            }}
          />
          <SalesLineItem 
            label="Partial Payments" 
            amount={salesData.deferredSales.invoices}
            transactionCount="1 transaction"
            onTransactionCountClick={() => {
              setDeferredSalesType('invoice');
              setIsDeferredSalesModalOpen(true);
            }}
            level={1}
            isClickable={true}
            onClick={() => {
              setDeferredSalesType('invoice');
              setIsDeferredSalesModalOpen(true);
            }}
          />
        </SalesLineItem>

        {/* Gift Card Sales */}
        <SalesLineItem
          label="Gift card sales"
          amount={salesData.giftCardSales}
          transactionCount="5 transactions"
          isExpandable={true}
          isExpanded={expandedSections.giftCardSales}
          onToggle={() => toggleSection('giftCardSales')}
          hasRedDot={true}
          isClickable={true}
          onClick={() => handleNavigateToTransactions('gift-card')}
        />

        {/* Taxes */}
        <SalesLineItem
          label="Taxes"
          amount={salesData.taxes}
          transactionCount="28 transactions"
          isExpandable={true}
          isExpanded={expandedSections.taxes}
          onToggle={() => toggleSection('taxes')}
          hasRedDot={true}
          isClickable={true}
          onClick={() => handleNavigateToTransactions('tax')}
        />

        {/* Tips */}
        <SalesLineItem
          label="Tips"
          amount={salesData.tips}
          transactionCount="15 transactions"
          isExpandable={true}
          isExpanded={expandedSections.tips}
          onToggle={() => toggleSection('tips')}
          hasRedDot={true}
          isClickable={true}
          onClick={() => handleNavigateToTransactions('tip')}
        />

        {/* Total Sales */}
        <SalesLineItem
          label="Total sales"
          amount={salesData.totalSales}
          transactionCount="32 transactions"
          isExpandable={true}
          isExpanded={expandedSections.totalSales}
          onToggle={() => toggleSection('totalSales')}
          isClickable={true}
          onClick={() => handleNavigateToTransactions()}
        />

        {/* Total Payments Collected */}
        <SalesLineItem
          label="Total payments collected"
          amount={salesData.totalPaymentsCollected}
          transactionCount="32 transactions"
          isExpandable={true}
          isExpanded={expandedSections.totalPayments}
          onToggle={() => toggleSection('totalPayments')}
          isClickable={true}
          onClick={() => handleNavigateToTransactions()}
        >
          {salesData.paymentMethods.map((method, index) => (
            <SalesLineItem
              key={index}
              label={method.method}
              amount={method.amount}
              level={1}
            />
          ))}
        </SalesLineItem>

        {/* Fees */}
        <SalesLineItem
          label="Fees"
          amount={salesData.fees.squarePaymentProcessingFees}
          isExpandable={true}
          isExpanded={expandedSections.fees}
          onToggle={() => toggleSection('fees')}
        >
          <SalesLineItem
            label="Square payment processing fees"
            amount={salesData.fees.squarePaymentProcessingFees}
            level={1}
          />
        </SalesLineItem>

        {/* Net Total */}
        <div className="pt-4 border-t-2 border-gray-200">
          <SalesLineItem
            label="Net total"
            amount={salesData.netTotal}
          />
        </div>
      </div>

      {/* Gross Sales Table Modal */}
      <GrossSalesTableModal
        isOpen={isGrossSalesModalOpen}
        onClose={() => setIsGrossSalesModalOpen(false)}
      />

      {/* Sales Modal - Shows only payment transactions */}
      <TransactionsModal
        isOpen={isSalesModalOpen}
        onClose={() => setIsSalesModalOpen(false)}
        title="Sales Transactions"
        transactions={[]}
        filterType="sales"
      />

      {/* Exchanges Modal - Shows only exchange transactions */}
      <TransactionsModal
        isOpen={isExchangesModalOpen}
        onClose={() => setIsExchangesModalOpen(false)}
        title="Exchange Transactions"
        transactions={[]}
        filterType="exchanges"
      />

      {/* Net Sales Modal - Shows net sales transactions */}
      <TransactionsModal
        isOpen={isNetSalesModalOpen}
        onClose={() => setIsNetSalesModalOpen(false)}
        title="Net Sales Transactions"
        transactions={[]}
        filterType="net-sales"
      />

      {/* Returns Modal */}
      <TransactionsModal
        isOpen={isReturnsModalOpen}
        onClose={() => setIsReturnsModalOpen(false)}
        title="Returns Transactions"
        transactions={[]}
        filterType="returns"
      />

      {/* Deferred Sales Modal */}
      <TransactionsModal
        isOpen={isDeferredSalesModalOpen}
        onClose={() => setIsDeferredSalesModalOpen(false)}
        title={`${deferredSalesType === 'gift-card' ? 'Gift Card' : deferredSalesType === 'invoice' ? 'Partial Payments' : 'Square Online'} Transactions`}
        transactions={[]}
        filterType="deferred-sales"
      />
    </div>
  );
}
