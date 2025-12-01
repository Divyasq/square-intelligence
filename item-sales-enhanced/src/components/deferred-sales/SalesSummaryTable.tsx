import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SalesSection, PaymentSection } from '../../types/deferredSales';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useDeferredSales } from '../../context/DeferredSalesContext';
import { SalesDetailModal } from './SalesDetailModal';
import { TransactionDetailPage } from './TransactionDetailPage';

interface SalesSummaryTableProps {
  salesSections: SalesSection[];
  paymentSections: PaymentSection[];
}

interface SalesLineItemProps {
  label: string;
  amount: number;
  level?: number;
  isTotal?: boolean;
  isClickable?: boolean;
  onClick?: () => void;
}

function SalesLineItem({ label, amount, level = 0, isTotal = false, isClickable = false, onClick }: SalesLineItemProps) {
  const formatAmount = (value: number) => {
    if (value === 0) return '';
    const formatted = Math.abs(value).toFixed(2);
    return value < 0 ? `($${formatted})` : `$${formatted}`;
  };

  // Determine indentation based on label content and level
  const getIndentation = () => {
    // Check for explicit indentation markers
    if (label.startsWith('          ')) return 'pl-20'; // 10 spaces
    if (label.startsWith('        ')) return 'pl-16';   // 8 spaces
    if (label.startsWith('      ')) return 'pl-12';     // 6 spaces
    if (label.startsWith('    ')) return 'pl-8';        // 4 spaces
    if (label.startsWith('  ')) return 'pl-4';          // 2 spaces
    
    // Default indentation based on level
    if (level > 0) return 'pl-8';
    return '';
  };

  const cleanLabel = label.replace(/^\s+/, ''); // Remove leading spaces for display

  const itemContent = (
    <div className={`flex items-center justify-between py-2 ${
      isTotal ? 'border-t-2 border-gray-200 pt-4' : ''
    } ${isClickable ? 'cursor-pointer hover:bg-gray-50' : ''}`}>
      <div className={`flex items-center ${getIndentation()}`}>
        <span className={`text-sm ${
          isTotal 
            ? 'font-semibold text-gray-900' 
            : level === 0 && !label.startsWith(' ')
              ? 'font-medium text-gray-900' 
              : 'text-gray-700'
        } ${isClickable ? 'text-blue-600 hover:text-blue-800' : ''}`}>
          {cleanLabel}
        </span>
      </div>
      
      <span className={`text-sm font-medium ${
        amount < 0 ? 'text-red-600' : 'text-gray-900'
      }`}>
        {formatAmount(amount)}
      </span>
    </div>
  );

  return isClickable ? (
    <div onClick={onClick}>
      {itemContent}
    </div>
  ) : (
    itemContent
  );
}

export function SalesSummaryTable({ salesSections, paymentSections }: SalesSummaryTableProps) {
  const navigate = useNavigate();
  const { selectedScenario } = useDeferredSales();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<string | null>(null);

  const handleInvoicesClick = () => {
    navigate('/deferred-sales/transactions');
  };

  const handleInvoiceDetailClick = () => {
    navigate('/deferred-sales/invoice-detail');
  };

  const handleFullCycleClick = () => {
    navigate('/deferred-sales/full-cycle');
  };

  const handleGrossSalesClick = () => {
    // Check if this is the Full Cycle scenario
    if (selectedScenario?.id === 'full-cycle-option-b') {
      handleFullCycleClick();
    } else {
      // Open modal for other scenarios
      setIsModalOpen(true);
    }
  };

  const handleModalRowClick = (transactionId: string) => {
    setSelectedTransactionId(transactionId);
    // Navigate to transaction detail page - for now we'll just close modal
    // In a real app, this would navigate to a transaction detail route
    setIsModalOpen(false);
  };

  if (selectedTransactionId) {
    return <TransactionDetailPage transactionId={selectedTransactionId} />;
  }

  return (
    <>
      <div className="bg-white">
        <div className="grid grid-cols-2 divide-x divide-gray-100">
          {/* Sales Column */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales</h3>
            
            {salesSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-3">
                  {section.title}
                </div>
                
                <div className="space-y-0">
                  {section.lines.map((line, lineIndex) => {
                    // Check if this is a "Partial Payments" line item with a non-zero amount
                    const isPartialPaymentsClickable = line.label.trim() === 'Partial Payments' && line.amount !== 0;
                    
                    // Check if this is a "Gross Sales" line item with a non-zero amount
                    const isGrossSalesClickable = line.label.trim() === 'Gross Sales' && line.amount !== 0;
                    
                    // Check if this is a "Partial Payments Redeemed" line item with a non-zero amount
                    const isPartialPaymentsRedeemedClickable = line.label.trim() === 'Partial Payments Redeemed' && line.amount !== 0;
                    
                    const isClickable = isPartialPaymentsClickable || isGrossSalesClickable || isPartialPaymentsRedeemedClickable;
                    
                    const handleClick = () => {
                      if (isPartialPaymentsClickable) {
                        handleInvoicesClick();
                      } else if (isGrossSalesClickable) {
                        handleGrossSalesClick();
                      } else if (isPartialPaymentsRedeemedClickable) {
                        handleInvoiceDetailClick();
                      }
                    };
                    
                    return (
                      <SalesLineItem
                        key={lineIndex}
                        label={line.label}
                        amount={line.amount}
                        level={0}
                        isClickable={isClickable}
                        onClick={isClickable ? handleClick : undefined}
                      />
                    );
                  })}
                  
                  {section.total !== undefined && (
                    <SalesLineItem
                      label="Total"
                      amount={section.total}
                      isTotal={true}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Payments Column */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payments</h3>
            
            {paymentSections.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-3">
                  {section.title}
                </div>
                
                <div className="space-y-0">
                  {section.lines.map((line, lineIndex) => (
                    <SalesLineItem
                      key={lineIndex}
                      label={line.label}
                      amount={line.amount}
                      level={0}
                    />
                  ))}
                  
                  {section.total !== undefined && (
                    <SalesLineItem
                      label="Net Total"
                      amount={section.total}
                      isTotal={true}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SalesDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onRowClick={handleModalRowClick}
      />
    </>
  );
}
