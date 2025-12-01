import { EducationModule, PaymentScenario, MetricDefinition } from '../types/education';

export const metricDefinitions: MetricDefinition[] = [
  {
    name: 'Gross Sales',
    formula: 'Price + Service Charges',
    description: 'The total amount charged to the customer before any deductions',
    whenReported: 'When payment is completed',
    examples: ['$100 item + $5 service charge = $105 Gross Sales']
  },
  {
    name: 'Net Sales',
    formula: 'Gross Sales - Discounts - Comps - Returns',
    description: 'Sales amount after deducting discounts, comps, and returns',
    whenReported: 'When payment is completed',
    examples: ['$105 Gross - $10 discount = $95 Net Sales']
  }
];

export const paymentScenarios: PaymentScenario[] = [
  {
    id: 'single-payment',
    name: 'Sale with Single Payment',
    description: 'Standard transaction with one payment method',
    saleReportTime: 'Payment completed time',
    paymentReportTime: 'Payment created time (with exceptions)',
    explanation: 'Most common scenario with minimal timing differences',
    isEdgeCase: false
  },
  {
    id: 'credit-card-delay',
    name: 'Credit Card Processing Delay',
    description: 'Unintentional delays due to server-side processing',
    saleReportTime: 'Payment completed time',
    paymentReportTime: 'Payment created time',
    explanation: 'Network latency or server delays can cause timing discrepancies',
    isEdgeCase: true
  },
  {
    id: 'cash-system-issue',
    name: 'Cash Payment System Issue',
    description: 'Internal system failure affecting payment record timing',
    saleReportTime: 'Payment completed time',
    paymentReportTime: 'Payment created time (when system recovers)',
    explanation: 'System failures can create gaps between sale and payment recording',
    isEdgeCase: true
  },
  {
    id: 'pre-auth',
    name: 'Pre-Authorization',
    description: 'Intentional separation of auth and capture times',
    saleReportTime: 'Payment completed time',
    paymentReportTime: 'Payment created time (except Gift Cards and Bank Transfers)',
    explanation: 'Authorization happens before capture, creating intentional timing differences',
    isEdgeCase: false
  },
  {
    id: 'delayed-capture',
    name: 'Delayed Capture (Credit Card)',
    description: 'Intentional delay for paper receipts and reopen checks',
    saleReportTime: 'Created_at (close to payment auth time)',
    paymentReportTime: 'Payment created time (except Gift Cards and Bank Transfers)',
    explanation: 'Used for paper receipts where capture happens later than authorization',
    isEdgeCase: false
  },
  {
    id: 'offline-payments',
    name: 'Offline Payments',
    description: 'Payments taken offline and synced later',
    saleReportTime: 'Bill/Order completed_at time (when seller took payment)',
    paymentReportTime: 'Auth time when payment comes back online',
    explanation: 'Offline mode creates timing gaps when payments sync back online',
    isEdgeCase: true
  },
  {
    id: 'ach-payments',
    name: 'ACH Payments',
    description: 'Bank transfer payments with processing delays',
    saleReportTime: 'Payment completed/Capture time',
    paymentReportTime: 'Payment completed/Capture time',
    explanation: 'Both metrics align for ACH payments due to processing requirements',
    isEdgeCase: false
  },
  {
    id: 'split-payments',
    name: 'Sale with Split Payments',
    description: 'Multiple payment methods for single sale',
    saleReportTime: 'Last completed payment',
    paymentReportTime: 'Individual payment created times (with exceptions)',
    explanation: 'Sale timing depends on final payment completion',
    isEdgeCase: false
  },
  {
    id: 'invoice-payments',
    name: 'Sale with Multiple Payments via Invoice',
    description: 'Invoice paid in multiple installments',
    saleReportTime: 'When final payment is complete',
    paymentReportTime: 'Individual payment times (Gift Cards and Bank Transfers when completed)',
    explanation: 'Sale not recorded until invoice is fully paid',
    isEdgeCase: false
  },
  {
    id: 'house-account',
    name: 'House Account',
    description: 'Credit account payments',
    saleReportTime: 'When order is placed',
    paymentReportTime: 'As House account balances are paid',
    explanation: 'Sale recorded immediately, payments recorded when account is settled',
    isEdgeCase: false
  }
];

export const educationModules: EducationModule[] = [
  {
    id: 'sales-metrics-education',
    title: 'Understanding Sales Metrics',
    description: 'Understanding how Gross Sales, Net Sales, and Total Line Items are calculated and when they are reported',
    duration: '20 minutes',
    difficulty: 'Beginner',
    sections: [
      {
        id: 'metric-definitions',
        title: 'Sales Metrics Definitions',
        content: 'Learn the fundamental definitions and formulas for key sales metrics used in Square reporting.',
        type: 'definition',
        examples: [
          {
            id: 'definitions-overview',
            title: 'Core Sales Metrics',
            scenario: 'Understanding the relationship between different sales metrics',
            calculation: [
              { label: 'Gross Sales', formula: 'Price + Service Charges', value: 0, explanation: 'Total amount before deductions' },
              { label: 'Net Sales', formula: 'Gross Sales - Discounts - Comps - Returns', value: 0, explanation: 'Amount after deductions' },
              { label: 'Total Line Item', formula: 'Net Sales - Partial Refunds + Tax', value: 0, explanation: 'Final amount with tax adjustments' }
            ],
            result: 'These metrics build upon each other in sequence'
          }
        ]
      },
      {
        id: 'gross-sales',
        title: 'Gross Sales',
        content: 'Gross Sales = Price + Service Charges. This represents the total amount charged to customers before any deductions. It includes the base price of items plus any service charges.',
        type: 'calculation',
        examples: [
          {
            id: 'gross-example-1',
            title: 'Basic Gross Sales',
            scenario: 'Customer orders a $25 meal with $3 delivery fee',
            calculation: [
              { label: 'Item Price', formula: '$25.00', value: 25, explanation: 'Base price of the meal' },
              { label: 'Service Charges', formula: '$3.00', value: 3, explanation: 'Delivery fee' },
              { label: 'Gross Sales', formula: '$25.00 + $3.00', value: 28, explanation: 'Total before deductions' }
            ],
            result: '$28.00'
          }
        ],
        calculator: {
          id: 'gross-sales-calc',
          type: 'sales-metrics',
          inputs: [
            { id: 'item-price', label: 'Item Price', type: 'number', placeholder: '25.00', defaultValue: 25 },
            { id: 'service-charges', label: 'Service Charges', type: 'number', placeholder: '3.00', defaultValue: 3 }
          ],
          outputs: [
            { id: 'gross-sales', label: 'Gross Sales', formula: 'item-price + service-charges', format: 'currency' }
          ]
        }
      },
      {
        id: 'net-sales',
        title: 'Net Sales',
        content: 'Net Sales = Gross Sales - Discounts - Comps - Returns. This is calculated by taking Gross Sales and subtracting discounts, comps (complimentary items), and returns.',
        type: 'calculation',
        examples: [
          {
            id: 'net-example-1',
            title: 'Net Sales with Discount',
            scenario: 'Customer has $28 gross sales with a $5 discount applied',
            calculation: [
              { label: 'Gross Sales', formula: '$28.00', value: 28, explanation: 'Starting amount' },
              { label: 'Discounts', formula: '-$5.00', value: -5, explanation: 'Applied discount' },
              { label: 'Comps', formula: '$0.00', value: 0, explanation: 'No complimentary items' },
              { label: 'Returns', formula: '$0.00', value: 0, explanation: 'No returns' },
              { label: 'Net Sales', formula: '$28.00 - $5.00', value: 23, explanation: 'Final net amount' }
            ],
            result: '$23.00'
          }
        ],
        calculator: {
          id: 'net-sales-calc',
          type: 'sales-metrics',
          inputs: [
            { id: 'gross-sales', label: 'Gross Sales', type: 'number', placeholder: '28.00', defaultValue: 28 },
            { id: 'discounts', label: 'Discounts', type: 'number', placeholder: '5.00', defaultValue: 5 },
            { id: 'comps', label: 'Comps', type: 'number', placeholder: '0.00', defaultValue: 0 },
            { id: 'returns', label: 'Returns', type: 'number', placeholder: '0.00', defaultValue: 0 }
          ],
          outputs: [
            { id: 'net-sales', label: 'Net Sales', formula: 'gross-sales - discounts - comps - returns', format: 'currency' }
          ]
        }
      },
      {
        id: 'total-line-item',
        title: 'Total Line Item',
        content: 'Total Line Item = Net Sales - Partial Refunds + Tax. This is the final amount calculated as Net Sales minus partial refunds (refunds by amount) plus tax.',
        type: 'calculation',
        examples: [
          {
            id: 'total-example-1',
            title: 'Complete Calculation',
            scenario: 'Customer with $23 net sales, $2 partial refund, and $1.68 tax',
            calculation: [
              { label: 'Net Sales', formula: '$23.00', value: 23, explanation: 'After discounts and comps' },
              { label: 'Partial Refunds', formula: '-$2.00', value: -2, explanation: 'Refund by amount' },
              { label: 'Tax', formula: '+$1.68', value: 1.68, explanation: 'Applied tax' },
              { label: 'Total Line Item', formula: '$23.00 - $2.00 + $1.68', value: 22.68, explanation: 'Final amount' }
            ],
            result: '$22.68'
          }
        ],
        calculator: {
          id: 'total-line-item-calc',
          type: 'sales-metrics',
          inputs: [
            { id: 'net-sales', label: 'Net Sales', type: 'number', placeholder: '23.00', defaultValue: 23 },
            { id: 'partial-refunds', label: 'Partial Refunds', type: 'number', placeholder: '2.00', defaultValue: 2 },
            { id: 'tax', label: 'Tax', type: 'number', placeholder: '1.68', defaultValue: 1.68 }
          ],
          outputs: [
            { id: 'total-line-item', label: 'Total Line Item', formula: 'net-sales - partial-refunds + tax', format: 'currency' }
          ]
        }
      },
      {
        id: 'reporting-timing',
        title: 'When Metrics Are Reported',
        content: 'Understanding when sales metrics are calculated and reported in your Square dashboard.',
        type: 'timeline',
        examples: [
          {
            id: 'reporting-timing-example',
            title: 'Sales Metrics Reporting',
            scenario: 'All sales metrics follow the same reporting schedule',
            calculation: [
              { label: 'Gross Sales', formula: 'Reported when payment is completed', value: 0, explanation: 'Payment completion triggers reporting' },
              { label: 'Net Sales', formula: 'Reported when payment is completed', value: 0, explanation: 'Same timing as Gross Sales' },
              { label: 'Total Line Item', formula: 'Reported when payment is completed', value: 0, explanation: 'Same timing as other sales metrics' }
            ],
            result: 'All sales metrics are reported simultaneously when payment completes'
          }
        ]
      }
    ],
    faqs: [
      {
        id: 'faq-timing',
        question: 'When are Gross/Net Sales reported?',
        answer: 'All sales metrics (Gross Sales, Net Sales, Total Line Item) are calculated and reported when the payment is completed.',
        category: 'timing',
        examples: ['Payment completion triggers metric calculation', 'Pending payments do not affect sales metrics', 'All sales metrics use the same reporting time']
      },
      {
        id: 'faq-service-charges',
        question: 'What counts as service charges in Gross Sales?',
        answer: 'Service charges include delivery fees, processing fees, convenience charges, and any additional fees beyond the base item price.',
        category: 'definitions',
        examples: ['Delivery fee: $3.00', 'Processing fee: $1.50', 'Convenience charge: $2.00']
      },
      {
        id: 'faq-partial-refunds',
        question: 'What are partial refunds in the Total Line Item calculation?',
        answer: 'Partial refunds are refunds by amount (not full item returns). They reduce the Total Line Item but not the Net Sales.',
        category: 'definitions',
        examples: ['$5 refund on a $20 item', 'Refund for damaged portion of order', 'Customer dissatisfaction adjustment']
      },
      {
        id: 'faq-comps',
        question: 'What are comps in the Net Sales calculation?',
        answer: 'Comps (complimentary items) are free items given to customers, which reduce the Net Sales amount.',
        category: 'definitions',
        examples: ['Free appetizer', 'Complimentary drink', 'Manager comp for service issue']
      }
    ],
    visualizations: [
      {
        id: 'sales-metrics-flow',
        type: 'flowchart',
        title: 'Sales Metrics Calculation Flow',
        description: 'Visual representation of how sales metrics are calculated',
        data: metricDefinitions
      }
    ]
  },
  {
    id: 'sales-payments-differences',
    title: 'Understanding Sales and Payments Metrics Differences',
    description: 'Learn why sales and payment metrics can differ and when each is reported',
    duration: '30 minutes',
    difficulty: 'Intermediate',
    sections: [
      {
        id: 'timing-overview',
        title: 'When Sales vs Payments Are Reported',
        content: 'Understanding the fundamental difference in timing between sales and payment reporting.',
        type: 'comparison',
        examples: [
          {
            id: 'timing-comparison',
            title: 'Sales vs Payments Reporting Timeline',
            scenario: 'Understanding when each metric is recorded',
            calculation: [
              { label: 'Sales Metrics', formula: 'When payment is completed', value: 0, explanation: 'Reported when payment finishes processing successfully' },
              { label: 'Payment Metrics', formula: 'When payment is initiated', value: 0, explanation: 'Reported when payment starts (with specific exceptions)' }
            ],
            result: 'This timing difference creates discrepancies in your reports'
          }
        ]
      },
      {
        id: 'general-scenarios',
        title: 'General Payment Scenarios',
        content: 'Common scenarios that cause differences between sales and payment timing.',
        type: 'scenarios',
        examples: [
          {
            id: 'single-payment-scenario',
            title: 'Sale with Single Payment',
            scenario: 'Standard transaction with one payment method',
            calculation: [
              { label: 'Sale Timing', formula: 'Payment completed time', value: 0, explanation: 'When the payment finishes processing' },
              { label: 'Payment Timing', formula: 'When customer presents payment method', value: 0, explanation: 'When customer presents payment method (except Gift Cards: payment complete, Bank Transfers: payment completed time)' }
            ],
            result: 'Most common scenario with minimal timing differences'
          },
          {
            id: 'credit-card-delay-scenario',
            title: 'Credit Card Processing Delay',
            scenario: 'Unintentional delays due to server-side processing issues',
            calculation: [
              { label: 'Sale Timing', formula: 'Payment completed time', value: 0, explanation: 'When payment actually completes despite delays' },
              { label: 'Payment Timing', formula: 'When customer presents payment method', value: 0, explanation: 'When customer initially presented payment method' }
            ],
            result: 'Network latency or server delays can cause timing discrepancies'
          },
          {
            id: 'cash-system-issue-scenario',
            title: 'Cash Payment System Issue',
            scenario: 'Internal system failure affecting payment record timing',
            calculation: [
              { label: 'Sale Timing', formula: 'Payment completed time', value: 0, explanation: 'When cash payment is actually completed' },
              { label: 'Payment Timing', formula: 'When customer presents payment method (when system recovers)', value: 0, explanation: 'When system failure is resolved and record is created' }
            ],
            result: 'System failures can create gaps between sale and payment recording'
          }
        ]
      },
      {
        id: 'edge-cases',
        title: 'Edge Cases and Special Payment Methods',
        content: 'Special payment scenarios that have unique timing behaviors.',
        type: 'edge-cases',
        examples: [
          {
            id: 'pre-auth-scenario',
            title: 'Pre-Authorization',
            scenario: 'Payments are reported when customer presents payment method, sales when payment completes',
            calculation: [
              { label: 'Sale Timing', formula: 'Payment completed time', value: 0, explanation: 'When payment is captured and sale completes' },
              { label: 'Payment Timing', formula: 'When customer presents payment method', value: 0, explanation: 'When customer presents card for authorization (except Gift Cards: payment complete, Bank Transfers: payment completed time)' }
            ],
            result: 'May show differences when sales fall outside of midnight windows'
          },
          {
            id: 'tipping-paper-receipts-scenario',
            title: 'Tipping on Paper Receipts',
            scenario: 'Open orders where payment method is presented after order creation',
            calculation: [
              { label: 'Sale Timing', formula: 'When order is created', value: 0, explanation: 'Sale recorded when order is initially created' },
              { label: 'Payment Timing', formula: 'When customer presents payment method', value: 0, explanation: 'When customer presents card for payment (except Gift Cards: payment complete, Bank Transfers: payment completed time)' }
            ],
            result: 'Used for paper receipts and open orders where payment happens after order creation'
          },
          {
            id: 'offline-payments-scenario',
            title: 'Offline Payments',
            scenario: 'Payments taken offline and synced later',
            calculation: [
              { label: 'Sale Timing', formula: 'Bill/Order completed_at time', value: 0, explanation: 'When seller took the payment offline' },
              { label: 'Payment Timing', formula: 'Auth time when payment comes back online', value: 0, explanation: 'When offline payment syncs back to system' }
            ],
            result: 'Offline mode creates timing gaps when payments sync back online'
          },
          {
            id: 'ach-payments-scenario',
            title: 'ACH Payments',
            scenario: 'Bank transfer payments with processing delays',
            calculation: [
              { label: 'Sale Timing', formula: 'Payment completed/Capture time', value: 0, explanation: 'When ACH payment is completed' },
              { label: 'Payment Timing', formula: 'Payment completed/Capture time', value: 0, explanation: 'Same as sale timing for ACH' }
            ],
            result: 'Both metrics align for ACH payments due to processing requirements'
          }
        ]
      },
      {
        id: 'complex-scenarios',
        title: 'Complex Payment Scenarios',
        content: 'Advanced scenarios involving multiple payments or special account types.',
        type: 'complex',
        examples: [
          {
            id: 'split-payments-scenario',
            title: 'Sale with Split Payments',
            scenario: 'Multiple payment methods for single sale',
            calculation: [
              { label: 'Sale Timing', formula: 'Last completed payment', value: 0, explanation: 'Sale timing depends on when final payment completes' },
              { label: 'Payment Timing', formula: 'When customer presents payment method', value: 0, explanation: 'Each payment reports when customer presents payment method (except Gift Cards: payment complete, Bank Transfers: bankTransaction.completedAt)' }
            ],
            result: 'Sale timing depends on final payment completion'
          },
          {
            id: 'invoice-payments-scenario',
            title: 'Sale with Multiple Payments via Invoice',
            scenario: 'Invoice paid in multiple installments',
            calculation: [
              { label: 'Sale Timing', formula: 'When final payment is complete', value: 0, explanation: 'Sale not recorded until invoice is fully paid' },
              { label: 'Payment Timing', formula: 'When customer presents payment method', value: 0, explanation: 'Each payment reports when customer presents payment method (Gift Cards: when completed, Bank Transfers: when completed)' }
            ],
            result: 'Sale not recorded until invoice is fully paid'
          },
          {
            id: 'house-account-scenario',
            title: 'House Account',
            scenario: 'Credit account payments',
            calculation: [
              { label: 'Sale Timing', formula: 'When order is placed', value: 0, explanation: 'Sale recorded immediately when order is created' },
              { label: 'Payment Timing', formula: 'As House account balances are paid', value: 0, explanation: 'Payments recorded when account is settled' }
            ],
            result: 'Sale recorded immediately, payments recorded when account is settled'
          }
        ]
      },
      {
        id: 'bank-transfers-deep-dive',
        title: 'Understanding Bank Transfers',
        content: 'Deep dive into how bank transfers affect sales and payment reporting.',
        type: 'deep-dive',
        examples: [
          {
            id: 'bank-transfer-timing',
            title: 'Bank Transfer Timing Rules',
            scenario: 'How bank transfers are handled differently from other payment methods',
            calculation: [
              { label: 'Standard Payments', formula: 'When customer presents payment method', value: 0, explanation: 'Most payments report when customer presents payment method' },
              { label: 'Bank Transfers', formula: 'Payment completed time', value: 0, explanation: 'Bank transfers report when completed, aligning with sales timing' },
              { label: 'Why Different', formula: 'Processing requirements', value: 0, explanation: 'Bank transfers require completion confirmation before reporting' }
            ],
            result: 'Bank transfers align more closely with sales timing than other payment methods'
          }
        ]
      }
    ],
    faqs: [
      {
        id: 'payments-faq-general',
        question: 'Why don\'t my sales reports match my payment reports?',
        answer: 'Sales and payments are tracked differently: Sales reports show when transactions are completed, Payment reports show when payment processing is initiated. This timing difference occurs because sales are reported when payment completes, while payments are reported when the payment process begins (with some exceptions for specific payment methods).',
        category: 'general',
        examples: [
          'Sales: reported when payment completes',
          'Payments: reported when payment processing starts',
          'Timing differences can occur during processing',
          'Different payment methods have different timing rules'
        ]
      },
      {
        id: 'payments-faq-close-day-mismatch',
        question: 'My close-of-day report doesn\'t match my daily sales report. What\'s wrong?',
        answer: 'This is usually due to different time windows: Daily sales reports typically cover a full 24-hour calendar day, Close-of-day reports only include transactions within your configured business hours. Check for transactions that occurred outside your normal business hours (early morning or late evening).',
        category: 'timing',
        examples: [
          'Daily sales: full 24-hour calendar day',
          'Close-of-day: configured business hours only',
          'Early morning transactions (6:59 AM when business starts at 7:00 AM)',
          'Late evening transactions after configured close time'
        ]
      },
      {
        id: 'payments-faq-missing-transaction',
        question: 'There\'s a transaction missing from my close-of-day report but it shows in my sales report. Where did it go?',
        answer: 'Check the transaction timestamp: Transactions outside your configured business hours won\'t appear in close-of-day reports. Common examples: 6:59 AM sale when business hours start at 7:00 AM, Late evening transactions after your configured close time. Solution: Adjust your business hours settings or reference the full daily sales report.',
        category: 'troubleshooting',
        examples: [
          '6:59 AM sale when business hours start at 7:00 AM',
          'Late evening transactions after configured close time',
          'Adjust business hours settings if needed',
          'Reference full daily sales report for complete picture'
        ]
      },
      {
        id: 'payments-faq-refunds-mismatch',
        question: 'My refunds don\'t match between different reports. Why?',
        answer: 'Refunds can appear differently depending on timing: Same-day refunds may net against sales in some reports, Next-day refunds appear as separate line items, Different reports may group refunds by processing date vs. original sale date.',
        category: 'timing',
        examples: [
          'Same-day refunds: may net against sales',
          'Next-day refunds: appear as separate line items',
          'Processing date vs. original sale date grouping',
          'Report-specific refund handling varies'
        ]
      },
      {
        id: 'payments-faq-multi-location',
        question: 'I have multiple locations. Why do my consolidated reports not add up?',
        answer: 'Multi-location reporting considerations: Ensure all locations are in the same time zone setting, Check that business hours are configured consistently, Verify that all locations are included in your consolidated report filters, Inter-location transfers may appear differently in individual vs. consolidated reports.',
        category: 'complex',
        examples: [
          'Ensure consistent time zone settings across locations',
          'Configure business hours consistently',
          'Verify all locations included in consolidated filters',
          'Inter-location transfers may appear differently'
        ]
      },
      {
        id: 'payments-faq-gross-net-difference',
        question: 'What\'s the difference between gross sales and net sales?',
        answer: 'Gross sales: Total transaction amounts before any deductions, Net sales: Gross sales minus refunds, discounts, and tax (depending on your settings). Always check which metric your reports are displaying.',
        category: 'definitions',
        examples: [
          'Gross sales: total before deductions',
          'Net sales: after refunds, discounts, tax adjustments',
          'Check report settings for which metric is displayed',
          'Both metrics serve different analytical purposes'
        ]
      },
      {
        id: 'payments-faq-credit-card-deposits',
        question: 'My credit card deposits don\'t match my credit card sales. Is there an error?',
        answer: 'This is normal due to processing timing: Credit card sales are recorded when the transaction occurs, Deposits happen 1-2 business days later, Weekend and holiday processing delays can extend this timing, Check your deposit schedule in your Square dashboard.',
        category: 'timing',
        examples: [
          'Sales recorded when transaction occurs',
          'Deposits happen 1-2 business days later',
          'Weekend and holiday delays extend timing',
          'Check deposit schedule in dashboard'
        ]
      },
      {
        id: 'payments-faq-troubleshooting',
        question: 'What should I do when reports don\'t match?',
        answer: 'Follow these troubleshooting steps: 1. Check time ranges - Ensure you\'re comparing the same date ranges, 2. Verify time zones - Confirm all reports use the same time zone, 3. Review business hours - Check your close-of-day settings, 4. Look for edge cases - Early morning or late evening transactions, 5. Consider processing delays - Sales vs. payment timing differences.',
        category: 'troubleshooting',
        examples: [
          'Compare same date ranges across reports',
          'Verify consistent time zone usage',
          'Check close-of-day business hours settings',
          'Look for transactions outside normal hours',
          'Account for processing delays between sales and payments'
        ]
      },
      {
        id: 'payments-faq-prevention',
        question: 'How can I prevent report discrepancies?',
        answer: 'Prevention tips: Set consistent business hours across all locations, Understand the difference between sales and payment timing, Regularly review report settings after system changes, Train staff on proper transaction timing procedures.',
        category: 'prevention',
        examples: [
          'Set consistent business hours across locations',
          'Understand sales vs payment timing differences',
          'Review report settings after changes',
          'Train staff on transaction timing procedures'
        ]
      }
    ],
    visualizations: [
      {
        id: 'payment-timeline',
        type: 'timeline',
        title: 'Payment Processing Timeline',
        description: 'Visual representation of when different metrics are reported',
        data: paymentScenarios
      },
      {
        id: 'scenario-comparison',
        type: 'comparison-chart',
        title: 'Sales vs Payments Timing Comparison',
        description: 'Side-by-side comparison of timing for different scenarios',
        data: paymentScenarios
      }
    ]
  },
  {
    id: 'self-serve-navigation',
    title: 'Self-Serve Navigation: Sales Summary to Transactions',
    description: 'Learn how to navigate from summary numbers to detailed transaction data',
    duration: '15 minutes',
    difficulty: 'Beginner',
    sections: [
      {
        id: 'navigation-overview',
        title: 'Understanding the Navigation Flow',
        content: 'Learn how to drill down from high-level sales summary data to individual transaction details.',
        type: 'navigation',
        examples: [
          {
            id: 'navigation-flow',
            title: 'Sales Summary to Transaction Details',
            scenario: 'Following the data trail from summary to details',
            calculation: [
              { label: 'Sales Summary', formula: 'High-level aggregated data', value: 0, explanation: 'Total sales, payment counts, averages' },
              { label: 'Filtered Reports', formula: 'Filtered by time, payment method, etc.', value: 0, explanation: 'Narrow down to specific criteria' },
              { label: 'Transaction Details', formula: 'Individual transaction records', value: 0, explanation: 'Complete transaction information' }
            ],
            result: 'Navigate from summary metrics to individual transaction details'
          }
        ]
      },
      {
        id: 'drill-down-techniques',
        title: 'Drill-Down Techniques',
        content: 'Master the techniques for drilling down from summary data to transaction-level details.',
        type: 'interactive',
        examples: [
          {
            id: 'time-based-drill-down',
            title: 'Time-Based Drill Down',
            scenario: 'Narrowing down by time periods',
            calculation: [
              { label: 'Monthly Summary', formula: 'Total sales for the month', value: 0, explanation: 'Start with monthly aggregated data' },
              { label: 'Daily Breakdown', formula: 'Sales by day within the month', value: 0, explanation: 'Drill down to daily level' },
              { label: 'Hourly Analysis', formula: 'Sales by hour for specific days', value: 0, explanation: 'Further drill down to hourly data' },
              { label: 'Transaction List', formula: 'Individual transactions', value: 0, explanation: 'Final level: individual transactions' }
            ],
            result: 'Progressive narrowing from month to individual transactions'
          },
          {
            id: 'payment-method-drill-down',
            title: 'Payment Method Drill Down',
            scenario: 'Analyzing by payment method',
            calculation: [
              { label: 'Total Sales', formula: 'All payment methods combined', value: 0, explanation: 'Starting point: total sales' },
              { label: 'By Payment Method', formula: 'Credit cards, cash, etc.', value: 0, explanation: 'Break down by payment method' },
              { label: 'Specific Method', formula: 'Focus on one payment method', value: 0, explanation: 'Drill into specific payment method' },
              { label: 'Transaction Details', formula: 'Individual transactions for that method', value: 0, explanation: 'See individual transactions' }
            ],
            result: 'Isolate and analyze specific payment methods'
          }
        ]
      },
      {
        id: 'filtering-strategies',
        title: 'Effective Filtering Strategies',
        content: 'Learn how to use filters effectively to find the data you need.',
        type: 'strategies',
        examples: [
          {
            id: 'multi-filter-approach',
            title: 'Multi-Filter Approach',
            scenario: 'Using multiple filters to narrow down data',
            calculation: [
              { label: 'Date Range', formula: 'Specific time period', value: 0, explanation: 'Start with relevant time frame' },
              { label: 'Payment Method', formula: 'Specific payment types', value: 0, explanation: 'Add payment method filter' },
              { label: 'Amount Range', formula: 'Transaction size filter', value: 0, explanation: 'Filter by transaction amount' },
              { label: 'Location', formula: 'Specific business location', value: 0, explanation: 'Filter by location if applicable' }
            ],
            result: 'Combine multiple filters for precise data analysis'
          }
        ]
      },
      {
        id: 'common-use-cases',
        title: 'Common Navigation Use Cases',
        content: 'Explore common scenarios where you need to navigate from summary to details.',
        type: 'use-cases',
        examples: [
          {
            id: 'discrepancy-investigation',
            title: 'Investigating Discrepancies',
            scenario: 'When summary numbers don\'t match expectations',
            calculation: [
              { label: 'Identify Issue', formula: 'Summary shows unexpected numbers', value: 0, explanation: 'Notice discrepancy in summary data' },
              { label: 'Filter by Time', formula: 'Narrow to specific time period', value: 0, explanation: 'Focus on when issue occurred' },
              { label: 'Check Payment Methods', formula: 'Look at payment method breakdown', value: 0, explanation: 'See if specific payment methods are affected' },
              { label: 'Review Transactions', formula: 'Examine individual transactions', value: 0, explanation: 'Find specific transactions causing the issue' }
            ],
            result: 'Systematic approach to finding root cause of discrepancies'
          },
          {
            id: 'performance-analysis',
            title: 'Performance Analysis',
            scenario: 'Understanding business performance patterns',
            calculation: [
              { label: 'High-Level Trends', formula: 'Monthly/weekly performance', value: 0, explanation: 'Start with broad performance view' },
              { label: 'Peak Identification', formula: 'Find high-performing periods', value: 0, explanation: 'Identify peak performance times' },
              { label: 'Drill into Peaks', formula: 'Analyze high-performing days/hours', value: 0, explanation: 'Understand what drove good performance' },
              { label: 'Transaction Analysis', formula: 'Look at individual high-value transactions', value: 0, explanation: 'Identify specific successful transactions' }
            ],
            result: 'Understand what drives business performance'
          }
        ]
      }
    ],
    faqs: [
      {
        id: 'navigation-faq-filters',
        question: 'What filters are available for drilling down into transaction data?',
        answer: 'Common filters include date range, payment method, transaction amount, location, item categories, and staff members.',
        category: 'navigation',
        examples: [
          'Date range: Last 30 days, specific week, custom range',
          'Payment method: Credit cards, cash, gift cards, etc.',
          'Amount: Transactions over $50, under $10, etc.',
          'Location: Specific store locations for multi-location businesses'
        ]
      },
      {
        id: 'navigation-faq-export',
        question: 'Can I export the detailed transaction data after filtering?',
        answer: 'Yes, most reporting systems allow you to export filtered transaction data to CSV or Excel formats for further analysis.',
        category: 'navigation',
        examples: [
          'Export to CSV for spreadsheet analysis',
          'Export to Excel with formatting',
          'Export specific columns only',
          'Export with applied filters maintained'
        ]
      },

    ],
    visualizations: [
      {
        id: 'navigation-flow',
        type: 'flowchart',
        title: 'Navigation Flow Diagram',
        description: 'Visual guide for navigating from summary to transaction details',
        data: []
      }
    ]
  },
  {
    id: 'reconciliation-faqs',
    title: 'Reconciliation FAQs',
    description: 'Common questions about summary emails, close-of-day reports, and reconciliation processes',
    duration: '25 minutes',
    difficulty: 'Beginner',
    sections: [
      {
        id: 'reconciliation-overview',
        title: 'Understanding Reconciliation',
        content: 'Learn about the different reconciliation tools and reports available to help you balance your books.',
        type: 'overview',
        examples: [
          {
            id: 'reconciliation-tools',
            title: 'Reconciliation Tools Overview',
            scenario: 'Understanding the different tools available for reconciliation',
            calculation: [
              { label: 'Summary Emails', formula: 'Daily automated summaries', value: 0, explanation: 'Automated daily reports sent via email' },
              { label: 'Close-of-Day Reports', formula: 'End-of-business-day summaries', value: 0, explanation: 'Reports covering your configured business hours' },
              { label: 'Dashboard Reports', formula: 'Real-time reporting interface', value: 0, explanation: 'Interactive reports in your Square dashboard' },
              { label: 'Export Options', formula: 'Downloadable detailed data', value: 0, explanation: 'CSV and Excel exports for external analysis' }
            ],
            result: 'Multiple tools work together to provide complete reconciliation capabilities'
          }
        ]
      }
    ],
    faqs: [
      {
        id: 'reconciliation-faq-email-timing',
        question: 'When do I receive the daily summary email?',
        answer: 'We send a daily email to merchants who have taken at least one payment for the day summarizing their gross sales. The email is sent after 1:30 AM PST. If you don\'t have business hours set (most merchants don\'t), you\'ll receive an email covering midnight to midnight. The Daily Sales Summary is based on your set business hours, which you can update in your Public Profile.',
        category: 'summary-email',
        examples: [
          'Sent after 1:30 AM PST for previous business day',
          'Requires at least one payment to trigger email',
          'Midnight to midnight if no business hours set',
          'Based on business hours and timezone in Public Profile',
          'Separate emails sent for each location with payments'
        ]
      },
      {
        id: 'reconciliation-faq-close-day-vs-summary',
        question: 'What\'s the difference between close-of-day reports and summary emails?',
        answer: 'Close-of-day reports cover transactions within your configured business hours, while summary emails typically cover a full 24-hour period. Close-of-day reports are generated when you manually close your day, while summary emails are sent automatically.',
        category: 'close-of-day',
        examples: [
          'Close-of-day: configured business hours only',
          'Summary email: full 24-hour period',
          'Close-of-day: manually triggered',
          'Summary email: automatically sent'
        ]
      },
      {
        id: 'reconciliation-faq-missing-email',
        question: 'I didn\'t receive my daily summary email. What should I do?',
        answer: 'Check your spam/junk folder first. Verify your email address is correct in your Square account settings. If you still don\'t receive it, you can access the same information in your Square dashboard under Reports.',
        category: 'troubleshooting',
        examples: [
          'Check spam/junk email folders',
          'Verify email address in account settings',
          'Access reports directly in Square dashboard',
          'Contact support if issue persists'
        ]
      },
      {
        id: 'reconciliation-faq-reconcile-cash',
        question: 'How do I reconcile cash transactions?',
        answer: 'Compare your physical cash count with the cash sales shown in your reports. The close-of-day report will show total cash sales, which should match your cash drawer after accounting for your starting cash amount.',
        category: 'cash-reconciliation',
        examples: [
          'Count physical cash in drawer',
          'Check cash sales in close-of-day report',
          'Account for starting cash amount',
          'Investigate any discrepancies'
        ]
      },
      {
        id: 'reconciliation-faq-deposit-timing',
        question: 'Why don\'t my deposits match my daily sales?',
        answer: 'Deposits typically occur 1-2 business days after sales due to payment processing. Your daily sales report shows when transactions occurred, while deposits show when funds actually reach your bank account.',
        category: 'deposits',
        examples: [
          'Sales: when transaction occurred',
          'Deposits: when funds reach bank (1-2 days later)',
          'Weekend/holiday delays affect timing',
          'Different payment methods have different processing times'
        ]
      },
      {
        id: 'reconciliation-faq-refund-reconciliation',
        question: 'How do refunds appear in reconciliation reports?',
        answer: 'Refunds appear as negative amounts in your reports and reduce your net sales. Same-day refunds may net against sales, while refunds processed on different days appear as separate line items.',
        category: 'refunds',
        examples: [
          'Refunds show as negative amounts',
          'Same-day refunds: net against sales',
          'Different-day refunds: separate line items',
          'Reduces net sales and deposit amounts'
        ]
      },
      {
        id: 'reconciliation-faq-tax-reconciliation',
        question: 'How is tax handled in reconciliation reports?',
        answer: 'Tax collected is shown separately from sales in most reports. Your total transaction amount includes tax, but reports typically break down the tax portion separately for accounting purposes.',
        category: 'tax',
        examples: [
          'Tax shown separately from sales',
          'Total transaction = sales + tax',
          'Tax breakdown available for accounting',
          'Tax rates may vary by location/item type'
        ]
      },
      {
        id: 'reconciliation-faq-multi-location',
        question: 'How do I reconcile multiple locations?',
        answer: 'You can view reports for individual locations or consolidated across all locations. Ensure each location\'s business hours and settings are configured consistently for accurate reconciliation.',
        category: 'multi-location',
        examples: [
          'Individual location reports available',
          'Consolidated multi-location reports',
          'Ensure consistent business hours settings',
          'Configure time zones properly for each location'
        ]
      },
      {
        id: 'reconciliation-faq-discrepancy-investigation',
        question: 'What should I do if I find discrepancies during reconciliation?',
        answer: 'Start by checking transaction timing and business hours settings. Look for transactions outside normal hours, verify payment method totals, and check for any pending or failed transactions. Document discrepancies and contact support if needed.',
        category: 'troubleshooting',
        examples: [
          'Check transaction timing and business hours',
          'Look for transactions outside normal hours',
          'Verify payment method totals',
          'Check for pending or failed transactions',
          'Document discrepancies for support'
        ]
      },
      {
        id: 'reconciliation-faq-export-data',
        question: 'Can I export reconciliation data for my accounting software?',
        answer: 'Yes, Square provides various export options including CSV and Excel formats. You can export transaction details, summary reports, and tax information that can be imported into most accounting software.',
        category: 'exports',
        examples: [
          'CSV and Excel export formats available',
          'Transaction details and summary reports',
          'Tax information included',
          'Compatible with most accounting software'
        ]
      },
      {
        id: 'reconciliation-faq-best-practices',
        question: 'What are the best practices for daily reconciliation?',
        answer: 'Reconcile daily rather than waiting, compare multiple report types for accuracy, keep physical receipts for cash transactions, document any discrepancies immediately, and maintain consistent business hours settings.',
        category: 'best-practices',
        examples: [
          'Reconcile daily, not weekly or monthly',
          'Compare multiple report types for accuracy',
          'Keep physical receipts for cash transactions',
          'Document discrepancies immediately',
          'Maintain consistent business hours settings'
        ]
      }
    ],
    visualizations: [
      {
        id: 'reconciliation-flow',
        type: 'flowchart',
        title: 'Daily Reconciliation Process',
        description: 'Step-by-step guide for daily reconciliation workflow',
        data: []
      }
    ]
  }
];

export default educationModules;
