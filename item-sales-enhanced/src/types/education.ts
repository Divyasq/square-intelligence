export interface EducationModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  sections: ModuleSection[];
  faqs: FAQ[];
  visualizations?: Visualization[];
}

export interface ModuleSection {
  id: string;
  title: string;
  content: string;
  type: 'text' | 'calculation' | 'timeline' | 'interactive' | 'definition' | 'comparison' | 'scenarios' | 'edge-cases' | 'complex' | 'deep-dive' | 'navigation' | 'strategies' | 'use-cases';
  examples?: Example[];
  calculator?: Calculator;
}

export interface Example {
  id: string;
  title: string;
  scenario: string;
  calculation: CalculationStep[];
  result: string;
}

export interface CalculationStep {
  label: string;
  formula: string;
  value: number;
  explanation: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  examples?: string[];
}

export interface Calculator {
  id: string;
  type: 'sales-metrics' | 'payment-timing';
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
}

export interface CalculatorInput {
  id: string;
  label: string;
  type: 'number' | 'select' | 'checkbox';
  placeholder?: string;
  options?: string[];
  defaultValue?: string | number;
}

export interface CalculatorOutput {
  id: string;
  label: string;
  formula: string;
  format: 'currency' | 'percentage' | 'number';
}

export interface Visualization {
  id: string;
  type: 'timeline' | 'flowchart' | 'comparison' | 'comparison-chart';
  title: string;
  data: any;
  description: string;
}

export interface PaymentScenario {
  id: string;
  name: string;
  description: string;
  saleReportTime: string;
  paymentReportTime: string;
  explanation: string;
  isEdgeCase: boolean;
}

export interface MetricDefinition {
  name: string;
  formula: string;
  description: string;
  whenReported: string;
  examples: string[];
}
