import { ScheduledExport } from '../types/scheduled-exports';

export const mockScheduledExports: ScheduledExport[] = [
  {
    id: '1',
    name: 'Weekly Sales Summary',
    reportType: 'Sales Summary',
    frequency: 'weekly',
    format: 'pdf',
    email: 'manager@business.com',
    isActive: true,
    createdAt: '2024-11-20',
    lastRun: '2024-11-25',
    nextRun: '2024-12-02',
    status: 'active'
  },
  {
    id: '2', 
    name: 'Monthly Reconciliation',
    reportType: 'Reconciliation',
    frequency: 'monthly',
    format: 'csv',
    email: 'accounting@business.com',
    isActive: true,
    createdAt: '2024-11-15',
    lastRun: '2024-11-01',
    nextRun: '2024-12-01',
    status: 'active'
  },
  {
    id: '3',
    name: 'Daily Sales Export',
    reportType: 'Sales Summary', 
    frequency: 'daily',
    format: 'csv',
    email: 'owner@business.com',
    isActive: false,
    createdAt: '2024-11-10',
    lastRun: '2024-11-24',
    nextRun: '2024-11-26',
    status: 'paused'
  }
];
