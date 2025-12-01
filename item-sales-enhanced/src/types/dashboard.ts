export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  href?: string;
}

export interface CustomerStats {
  totalCustomers: number;
  returningCustomers: number;
  avgVisitsPerCustomer: number;
  avgSpentPerVisit: string;
  positiveFeedback: number;
  negativeFeedback: number;
}

export interface PaymentType {
  id: string;
  name: string;
  amount: string;
  percentage: number;
  color: string;
}

export interface ActionCenterAlert {
  id: string;
  type: 'churn-risk' | 'comps-alert' | 'cost-spike' | 'opportunity';
  title: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  actions: {
    label: string;
    type: 'primary' | 'secondary';
    action: string;
  }[];
  timestamp: string;
  confidence?: number;
}

export interface DashboardData {
  selectedDate: string;
  keyMetrics: DashboardMetric[];
  customerStats: CustomerStats;
  paymentTypes: PaymentType[];
  hasItemsSales: boolean;
  actionCenterAlerts?: ActionCenterAlert[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  href: string;
  isActive?: boolean;
}
