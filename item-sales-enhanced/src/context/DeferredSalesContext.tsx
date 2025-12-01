import React, { createContext, useContext, useState } from 'react';
import { ScenarioGroup, SalesScenario } from '../types/deferredSales';
import { deferredSalesData } from '../data/deferredSalesData';

interface DateRange {
  start: Date;
  end: Date;
}

interface DeferredSalesContextType {
  scenarioGroups: ScenarioGroup[];
  selectedGroup: ScenarioGroup | null;
  selectedScenario: SalesScenario | null;
  dateRange: DateRange;
  setSelectedGroup: (group: ScenarioGroup | null) => void;
  setSelectedScenario: (scenario: SalesScenario | null) => void;
  setDateRange: (dateRange: DateRange) => void;
  getScenarioDataForDate: (scenario: SalesScenario, dateRange: DateRange) => SalesScenario;
}

const DeferredSalesContext = createContext<DeferredSalesContextType | undefined>(undefined);

export function DeferredSalesProvider({ children }: { children: React.ReactNode }) {
  const [selectedGroup, setSelectedGroup] = useState<ScenarioGroup | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<SalesScenario | null>(null);
  
  // Default to July 29-30, 2025 to match the image
  const [dateRange, setDateRange] = useState<DateRange>({
    start: new Date(2025, 6, 29), // July 29, 2025
    end: new Date(2025, 6, 30)    // July 30, 2025
  });

  const getScenarioDataForDate = (scenario: SalesScenario, dateRange: DateRange): SalesScenario => {
    // Handle deposit payment scenarios with date-based logic
    if (scenario.id === 'deposit-payment' || scenario.id === 'remaining-payment') {
      const depositDate = new Date(2025, 6, 5); // July 5, 2025
      const remainingDate = new Date(2025, 6, 10); // July 10, 2025
      
      const isDepositInRange = dateRange.start <= depositDate && depositDate <= dateRange.end;
      const isRemainingInRange = dateRange.start <= remainingDate && remainingDate <= dateRange.end;
      
      // If only deposit date is in range
      if (isDepositInRange && !isRemainingInRange) {
        return {
          ...scenario,
          id: 'deposit-payment',
          title: 'Deposit Payment',
          description: 'Customer pays $100 deposit towards a $1000 item (July 5)',
          salesSections: [
            {
              title: 'Sales',
              lines: [
                { label: 'Gross Sales', amount: 0 },
                { label: '          Items', amount: 0 },
                { label: '          Service Charges', amount: 0 },
                { label: 'Returns', amount: 0 },
                { label: 'Discounts & Comps', amount: 0 },
                { label: 'Net Sales', amount: 0 },
                { label: 'Tax', amount: 0 },
                { label: 'Tip', amount: 0 },
                { label: 'Refunds by Amount', amount: 0 }
              ]
            },
            {
              title: 'Deferred Sales',
              lines: [
                { label: '      Gift Card Sales', amount: 0 },
                { label: '      Partial Payments', amount: 0 }
              ],
              total: 100.00
            }
          ],
          paymentSections: [
            {
              title: 'Payments',
              lines: [
                { label: 'Total Collected', amount: 100.00 },
                { label: '     Cash', amount: 0 },
                { label: '     Card', amount: 100.00 },
                { label: '     Partial Payments Redeemed', amount: 0 },
                { label: '     External', amount: 0 },
                { label: '     Other', amount: 0 },
                { label: '     Gift Card', amount: 0 },
                { label: '     Bank Transfer', amount: 0 },
                { label: '     House Account', amount: 0 },
                { label: '     Fees', amount: 0 }
              ],
              total: 100.00
            }
          ]
        };
      }
      
      // If only remaining payment date is in range
      if (!isDepositInRange && isRemainingInRange) {
        return {
          ...scenario,
          id: 'remaining-payment',
          title: 'Remaining Payment',
          description: 'Customer pays remaining amount - gross sales recognized (July 10)',
          salesSections: [
            {
              title: 'Sales',
              lines: [
                { label: 'Gross Sales', amount: 1000.00 },
                { label: '          Items', amount: 1000.00 },
                { label: '          Service Charges', amount: 0 },
                { label: 'Returns', amount: 0 },
                { label: 'Discounts & Comps', amount: 0 },
                { label: 'Net Sales', amount: 1000.00 },
                { label: 'Tax', amount: 0 },
                { label: 'Tip', amount: 0 },
                { label: 'Refunds by Amount', amount: 0 }
              ]
            },
            {
              title: 'Deferred Sales',
              lines: [
                { label: '      Gift Card Sales', amount: 0 }
              ],
              total: 1000.00
            }
          ],
          paymentSections: [
            {
              title: 'Payments',
              lines: [
                { label: 'Total Collected', amount: 1000.00 },
                { label: '     Cash', amount: 0 },
                { label: '     Card', amount: 900.00 },
                { label: '     Partial Payments Redeemed', amount: 100.00 },
                { label: '     External', amount: 0 },
                { label: '     Other', amount: 0 },
                { label: '     Gift Card', amount: 0 },
                { label: '     Bank Transfer', amount: 0 },
                { label: '     House Account', amount: 0 },
                { label: '     Fees', amount: 0 }
              ],
              total: 1000.00
            }
          ]
        };
      }
      
      // If both dates are in range (July 5 to July 15)
      if (isDepositInRange && isRemainingInRange) {
        return {
          ...scenario,
          id: 'combined-deposit-payment',
          title: 'Combined Deposit & Payment',
          description: 'Full transaction cycle - deposit taken July 5, remaining paid July 10',
          salesSections: [
            {
              title: 'Sales',
              lines: [
                { label: 'Gross Sales', amount: 1000.00 },
                { label: 'Items', amount: 1000.00 },
                { label: 'Service Charges', amount: 0 },
                { label: 'Returns', amount: 0 },
                { label: 'Discounts & Comps', amount: 0 },
                { label: 'Net Sales', amount: 1000.00 },
                { label: 'Tax', amount: 0 },
                { label: 'Tip', amount: 0 },
                { label: 'Refunds by Amount', amount: 0 }
              ]
            },
            {
              title: 'Deferred Sales',
              lines: [
                { label: 'Gift Card Sales', amount: 0 },
                { label: 'Deposit', amount: 0 } // Net zero: +100 on July 5, -100 on July 10
              ],
              total: 1000.00
            }
          ],
          paymentSections: [
            {
              title: 'Payments',
              lines: [
                { label: 'Total Collected', amount: 1000.00 }, // $100 on July 5 + $900 on July 10
                { label: 'Cash', amount: 0 },
                { label: 'Card', amount: 1000.00 }, // Combined card payments
                { label: 'Partial Payments Redeemed', amount: 0 }, // Internal transfer, not double-counted
                { label: 'External', amount: 0 },
                { label: 'Other', amount: 0 },
                { label: 'Gift Card', amount: 0 },
                { label: 'Bank Transfer', amount: 0 },
                { label: 'House Account', amount: 0 },
                { label: 'Fees', amount: 0 }
              ],
              total: 1000.00
            }
          ]
        };
      }
    }

    // Handle partial payment scenarios with date-based logic
    if (scenario.id === 'partial-payment' || scenario.id === 'completed-invoice') {
      const partialDate = new Date(2025, 6, 5); // July 5, 2025
      const completedDate = new Date(2025, 6, 10); // July 10, 2025
      
      const isPartialInRange = dateRange.start <= partialDate && partialDate <= dateRange.end;
      const isCompletedInRange = dateRange.start <= completedDate && completedDate <= dateRange.end;
      
      // If only partial payment date is in range
      if (isPartialInRange && !isCompletedInRange) {
        return {
          ...scenario,
          id: 'partial-payment',
          title: 'Partial Payment',
          description: 'Customer pays $100 towards a $1000 invoice (July 5)',
          salesSections: [
            {
              title: 'Sales',
              lines: [
                { label: 'Gross Sales', amount: 0 },
                { label: '          Items', amount: 0 },
                { label: '          Service Charges', amount: 0 },
                { label: 'Returns', amount: 0 },
                { label: 'Discounts & Comps', amount: 0 },
                { label: 'Net Sales', amount: 0 },
                { label: 'Tax', amount: 0 },
                { label: 'Tip', amount: 0 },
                { label: 'Refunds by Amount', amount: 0 }
              ]
            },
            {
              title: 'Deferred Sales',
              lines: [
                { label: '      Gift Card Sales', amount: 0 },
                { label: '      Partial Payments', amount: 100.00 }
              ],
              total: 100.00
            }
          ],
          paymentSections: [
            {
              title: 'Payments',
              lines: [
                { label: 'Total Collected', amount: 100.00 },
                { label: '     Cash', amount: 0 },
                { label: '     Card', amount: 100.00 },
                { label: '     Partial Payments Redeemed', amount: 0 },
                { label: '     External', amount: 0 },
                { label: '     Other', amount: 0 },
                { label: '     Gift Card', amount: 0 },
                { label: '     Bank Transfer', amount: 0 },
                { label: '     House Account', amount: 0 },
                { label: '     Fees', amount: 0 }
              ],
              total: 100.00
            }
          ]
        };
      }
      
      // If only completed payment date is in range
      if (!isPartialInRange && isCompletedInRange) {
        return {
          ...scenario,
          id: 'completed-invoice-remaining',
          title: 'Invoice Completion',
          description: 'Customer pays remaining invoice amount - gross sales recognized (July 10)',
          salesSections: [
            {
              title: 'Sales',
              lines: [
                { label: 'Gross Sales', amount: 1000.00 },
                { label: '          Items', amount: 1000.00 },
                { label: '          Service Charges', amount: 0 },
                { label: 'Returns', amount: 0 },
                { label: 'Discounts & Comps', amount: 0 },
                { label: 'Net Sales', amount: 1000.00 },
                { label: 'Tax', amount: 0 },
                { label: 'Tip', amount: 0 },
                { label: 'Refunds by Amount', amount: 0 }
              ]
            },
            {
              title: 'Deferred Sales',
              lines: [
                { label: '      Gift Card Sales', amount: 0 },
                { label: '      Partial Payments', amount: 0 }
              ],
              total: 1000.00
            }
          ],
          paymentSections: [
            {
              title: 'Payments',
              lines: [
                { label: 'Total Collected', amount: 1000.00 },
                { label: '     Cash', amount: 0 },
                { label: '     Card', amount: 900.00 },
                { label: '     Partial Payments Redeemed', amount: 100.00 },
                { label: '     External', amount: 0 },
                { label: '     Other', amount: 0 },
                { label: '     Gift Card', amount: 0 },
                { label: '     Bank Transfer', amount: 0 },
                { label: '     House Account', amount: 0 },
                { label: '     Fees', amount: 0 }
              ],
              total: 1000.00
            }
          ]
        };
      }
      
      // If both dates are in range (July 5 to July 15)
      if (isPartialInRange && isCompletedInRange) {
        return {
          ...scenario,
          id: 'combined-invoice-payment',
          title: 'Combined Invoice Payment',
          description: 'Full invoice cycle - partial payment July 5, completion July 10',
          salesSections: [
            {
              title: 'Sales',
              lines: [
                { label: 'Gross Sales', amount: 1000.00 },
                { label: '          Items', amount: 1000.00 },
                { label: '          Service Charges', amount: 0 },
                { label: 'Returns', amount: 0 },
                { label: 'Discounts & Comps', amount: 0 },
                { label: 'Net Sales', amount: 1000.00 },
                { label: 'Tax', amount: 0 },
                { label: 'Tip', amount: 0 },
                { label: 'Refunds by Amount', amount: 0 }
              ]
            },
            {
              title: 'Deferred Sales',
              lines: [
                { label: '      Gift Card Sales', amount: 0 },
                { label: '      Partial Payments', amount: 0 } // Net zero: +100 on July 5, -100 on July 10
              ],
              total: 1000.00
            }
          ],
          paymentSections: [
            {
              title: 'Payments',
              lines: [
                { label: 'Total Collected', amount: 1000.00 }, // $100 on July 5 + $900 on July 10
                { label: '     Cash', amount: 0 },
                { label: '     Card', amount: 1000.00 }, // Combined card payments
                { label: '     Partial Payments Redeemed', amount: 0 }, // Internal transfer, not double-counted
                { label: '     External', amount: 0 },
                { label: '     Other', amount: 0 },
                { label: '     Gift Card', amount: 0 },
                { label: '     Bank Transfer', amount: 0 },
                { label: '     House Account', amount: 0 },
                { label: '     Fees', amount: 0 }
              ],
              total: 1000.00
            }
          ]
        };
      }
    }
    
    // Return original scenario for other cases
    return scenario;
  };

  const value = {
    scenarioGroups: deferredSalesData,
    selectedGroup,
    selectedScenario,
    dateRange,
    setSelectedGroup,
    setSelectedScenario,
    setDateRange,
    getScenarioDataForDate
  };

  return (
    <DeferredSalesContext.Provider value={value}>
      {children}
    </DeferredSalesContext.Provider>
  );
}

export function useDeferredSales() {
  const context = useContext(DeferredSalesContext);
  if (context === undefined) {
    throw new Error('useDeferredSales must be used within a DeferredSalesProvider');
  }
  return context;
}
