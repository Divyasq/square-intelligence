export interface ScheduledExport {
  id: string;
  name: string;
  reportType: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  format: 'pdf' | 'csv';
  email: string;
  isActive: boolean;
  createdAt: string;
  lastRun?: string;
  nextRun: string;
  status: 'active' | 'paused' | 'completed' | 'failed';
}

export interface CreateScheduledExportData {
  name: string;
  reportType: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  format: 'pdf' | 'csv';
  email: string;
}
