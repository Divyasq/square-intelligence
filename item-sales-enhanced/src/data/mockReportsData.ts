import { SalesBreakdown } from '../types/reports';

// Mock sales data for the report
export const mockSalesData: SalesBreakdown = {
  items: 1540.00,
  serviceCharges: {
    covidServiceCharge: 0.00,
    setupCost: 0.00,
    autoGratuity: 7.20
  },
  returns: -813.47,
  discountsAndComps: 0.00,
  netSales: 758.94,
  giftCardSales: 0.00,
  deferredSales: {
    giftCardSales: 0.00,
    invoices: 100.00,
    invoiceDepositRedeemed: -100.00,
    squareOnline: 0.00
  },
  taxes: 1.59,
  tips: 0.00,
  totalSales: 760.53,
  totalPaymentsCollected: 760.53,
  paymentMethods: [
    { method: 'Card', amount: 55.00 },
    { method: 'Cash', amount: 705.53 }
  ],
  fees: {
    squarePaymentProcessingFees: -1.90
  },
  netTotal: 758.63
};

// Mock data for different date ranges
export const generateMockSalesData = (dateRange: { start: Date; end: Date }): SalesBreakdown => {
  const daysDiff = Math.ceil((dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24));
  const multiplier = Math.max(1, daysDiff / 7); // Scale based on date range
  
  return {
    items: Math.round(mockSalesData.items * multiplier * (0.8 + Math.random() * 0.4)),
    serviceCharges: {
      covidServiceCharge: Math.round(mockSalesData.serviceCharges.covidServiceCharge * multiplier * 100) / 100,
      setupCost: Math.round(mockSalesData.serviceCharges.setupCost * multiplier * 100) / 100,
      autoGratuity: Math.round(mockSalesData.serviceCharges.autoGratuity * multiplier * 100) / 100
    },
    returns: Math.round(mockSalesData.returns * multiplier * (0.5 + Math.random() * 0.5)),
    discountsAndComps: Math.round(mockSalesData.discountsAndComps * multiplier * 100) / 100,
    netSales: 0, // Will be calculated
    giftCardSales: Math.round(mockSalesData.giftCardSales * multiplier * 100) / 100,
    deferredSales: {
      giftCardSales: Math.round(mockSalesData.deferredSales.giftCardSales * multiplier * 100) / 100,
      invoices: Math.round(mockSalesData.deferredSales.invoices * multiplier * 100) / 100,
      invoiceDepositRedeemed: Math.round(mockSalesData.deferredSales.invoiceDepositRedeemed * multiplier * 100) / 100,
      squareOnline: Math.round(mockSalesData.deferredSales.squareOnline * multiplier * 100) / 100
    },
    taxes: Math.round(mockSalesData.taxes * multiplier * 100) / 100,
    tips: Math.round(mockSalesData.tips * multiplier * 100) / 100,
    totalSales: 0, // Will be calculated
    totalPaymentsCollected: 0, // Will be calculated
    paymentMethods: [
      { method: 'Card', amount: Math.round(55 * multiplier * (0.8 + Math.random() * 0.4) * 100) / 100 },
      { method: 'Cash', amount: Math.round(705.53 * multiplier * (0.8 + Math.random() * 0.4) * 100) / 100 }
    ],
    fees: {
      squarePaymentProcessingFees: Math.round(-1.90 * multiplier * 100) / 100
    },
    netTotal: 0 // Will be calculated
  };
};

// Calculate derived values
export const calculateSalesData = (data: SalesBreakdown): SalesBreakdown => {
  const netSales = data.items + 
    data.serviceCharges.covidServiceCharge + 
    data.serviceCharges.setupCost + 
    data.serviceCharges.autoGratuity + 
    data.returns + 
    data.discountsAndComps;
  
  const totalSales = netSales + data.giftCardSales + data.taxes + data.tips;
  const totalPaymentsCollected = data.paymentMethods.reduce((sum, method) => sum + method.amount, 0);
  const netTotal = totalPaymentsCollected + data.fees.squarePaymentProcessingFees;
  
  return {
    ...data,
    netSales: Math.round(netSales * 100) / 100,
    totalSales: Math.round(totalSales * 100) / 100,
    totalPaymentsCollected: Math.round(totalPaymentsCollected * 100) / 100,
    netTotal: Math.round(netTotal * 100) / 100
  };
};
