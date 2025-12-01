export interface SalesData {
  totalSales: number;
  netSales: number;
  returns: number;
  grossSales: number;
  serviceCharges: number;
  discountsAndComps: number;
  taxes: number;
  tips: number;
  totalPaymentsCollected: number;
  fees: number;
  netTotal: number;
  transactionCount: number;
}

export interface PaymentMethod {
  method: string;
  amount: number;
}

export interface SalesBreakdown {
  items: number;
  serviceCharges: {
    covidServiceCharge: number;
    setupCost: number;
    autoGratuity: number;
  };
  returns: number;
  discountsAndComps: number;
  netSales: number;
  giftCardSales: number;
  deferredSales: {
    giftCardSales: number;
    invoices: number;
    invoiceDepositRedeemed: number;
    squareOnline: number;
  };
  taxes: number;
  tips: number;
  totalSales: number;
  totalPaymentsCollected: number;
  paymentMethods: PaymentMethod[];
  fees: {
    squarePaymentProcessingFees: number;
  };
  netTotal: number;
}

export interface ReportFilters {
  dateRange: {
    start: Date;
    end: Date;
  };
  location: string;
  timeframe: string;
  groupBy: string;
}

export interface ReportState {
  salesData: SalesBreakdown;
  filters: ReportFilters;
  isLoading: boolean;
  error: string | null;
}
