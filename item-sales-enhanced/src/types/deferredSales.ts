export interface SalesLine {
  label: string;
  amount: number;
}

export interface SalesSection {
  title: string;
  lines: SalesLine[];
  total?: number;
}

export interface PaymentLine {
  label: string;
  amount: number;
}

export interface PaymentSection {
  title: string;
  lines: PaymentLine[];
  total?: number;
}

export interface SalesScenario {
  id: string;
  title: string;
  description: string;
  salesSections: SalesSection[];
  paymentSections: PaymentSection[];
}

export interface ScenarioGroup {
  id: string;
  title: string;
  description: string;
  scenarios: SalesScenario[];
}

export type ScenarioType = 
  | 'gift-card-tracking'
  | 'gift-card-payment'
  | 'deposits-scheduled'
  | 'partial-payments-invoice'
  | 'completed-invoices'
  | 'catering-so';
