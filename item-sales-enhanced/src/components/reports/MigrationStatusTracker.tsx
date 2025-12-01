import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Circle, Filter, Search } from 'lucide-react';

interface ReportStatus {
  report: string;
  currentState: 'Migrated to SDP' | 'In progress migrating to SDP' | 'Not started' | 'External Workflow' | 'Other Team Owned';
  dataSource: string;
  category: string;
  owner?: string;
  notes?: string;
}

const reportData: ReportStatus[] = [
  // Sales Core Reports (Your Team - In Scope)
  { report: 'Sales Summary', currentState: 'Migrated to SDP', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Sales trends', currentState: 'Migrated to SDP', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Payment methods', currentState: 'Migrated to SDP', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Fees', currentState: 'Migrated to SDP', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Tax Invoice', currentState: 'Migrated to SDP', dataSource: 'Sales', category: 'Core Sales' },
  
  { report: 'Item Sales', currentState: 'In progress migrating to SDP', dataSource: 'Sales/Inventory', category: 'Sales & Inventory' },
  { report: 'Category Sales', currentState: 'In progress migrating to SDP', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Comps', currentState: 'In progress migrating to SDP', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Voids', currentState: 'In progress migrating to SDP', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Discounts', currentState: 'In progress migrating to SDP', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Modifier sales', currentState: 'In progress migrating to SDP', dataSource: 'Sales', category: 'Core Sales' },
  
  { report: 'Section sales', currentState: 'Not started', dataSource: 'Sales/RST data', category: 'Advanced Sales' },
  { report: 'Team sales', currentState: 'Not started', dataSource: 'Sales/Team Member', category: 'Team & Labor' },
  { report: 'Labor vs sales', currentState: 'Not started', dataSource: 'Sales/Labor', category: 'Team & Labor' },
  { report: 'Kitchen Performance', currentState: 'Not started', dataSource: 'Orders/RST data', category: 'Operations' },
  { report: 'Transaction Status', currentState: 'Not started', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Taxes', currentState: 'Not started', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Service charges', currentState: 'Not started', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Custom reports', currentState: 'Not started', dataSource: 'Sales', category: 'Core Sales' },
  { report: 'Gift cards Sales', currentState: 'Not started', dataSource: 'GC data', category: 'Gift Cards' },
  { report: 'Transactions', currentState: 'Not started', dataSource: 'Orders/Sales', category: 'Transactions' },
  { report: 'Daily Sales Summary', currentState: 'Not started', dataSource: 'Sales/Inventory/Employee/Customers', category: 'Summary Reports' },
  { report: 'Monthly Sales Summary', currentState: 'Not started', dataSource: 'Sales/Inventory/Employee/Customers', category: 'Summary Reports' },
  { report: 'Yearly Sales Summary', currentState: 'Not started', dataSource: 'Sales/Inventory/Employee/Customers', category: 'Summary Reports' },
  { report: 'XYZ email', currentState: 'Not started', dataSource: 'Sales/Inventory/Employee/Customers', category: 'Email Reports' },
  { report: 'SQ Anniversary email', currentState: 'Not started', dataSource: 'Sales/Inventory/Employee/Customers', category: 'Email Reports' },
  { report: '1099 K', currentState: 'Not started', dataSource: 'Tax/Compliance', category: 'Tax Reports' },

  // Inventory Reports
  { report: '[Inventory Reports] Cost of Goods (COGS) sold', currentState: 'Not started', dataSource: 'Sales/Inventory/Cost', category: 'Inventory' },
  { report: '[Inventory Reports] Vendor sales', currentState: 'Not started', dataSource: 'Sales/Inventory/Vendor', category: 'Inventory' },
  { report: '[Inventory Reports] Projected Profit', currentState: 'Not started', dataSource: 'Sales/Inventory', category: 'Inventory' },
  { report: '[Inventory Reports] Inventory by Category', currentState: 'Not started', dataSource: 'Sales/Inventory', category: 'Inventory' },
  { report: '[Inventory Reports] Inventory Sell Through', currentState: 'Not started', dataSource: 'Sales/Inventory', category: 'Inventory' },

  // Customer Analytics
  { report: 'Top Customers', currentState: 'Not started', dataSource: 'Sales/Customers', category: 'Customer Analytics' },
  { report: 'Customers Visits', currentState: 'Not started', dataSource: 'Sales/Customers', category: 'Customer Analytics' },
  { report: 'Loyalty Overview Report', currentState: 'Not started', dataSource: 'Loyalty/Customers', category: 'Customer Analytics' },

  // Dashboard Widgets
  { report: 'top-line sales metrics (dashboard home)', currentState: 'Not started', dataSource: 'Dashboard/Sales', category: 'Dashboard Widgets' },
  { report: 'top-line widgets (dashboard home)', currentState: 'Not started', dataSource: 'Dashboard/Sales', category: 'Dashboard Widgets' },
  { report: 'Customer widget (dashboard home)', currentState: 'Not started', dataSource: 'Dashboard/Customers', category: 'Dashboard Widgets' },

  // POS Reports
  { report: '[POS] Sales', currentState: 'Other Team Owned', dataSource: 'POS Events', category: 'POS Reports', owner: 'POS Team', notes: 'POS team migration timeline' },
  { report: '[POS] Disputes', currentState: 'Other Team Owned', dataSource: 'POS Events', category: 'POS Reports', owner: 'POS Team', notes: 'POS team responsibility' },
  { report: '[POS] Shift Report', currentState: 'Other Team Owned', dataSource: 'POS Events', category: 'POS Reports', owner: 'POS Team', notes: 'POS team responsibility' },
  { report: '[POS] Close of Day', currentState: 'Other Team Owned', dataSource: 'POS Events', category: 'POS Reports', owner: 'POS Team', notes: 'POS team responsibility' },
  { report: '[POS] Cash Management Report', currentState: 'Other Team Owned', dataSource: 'POS Events', category: 'POS Reports', owner: 'POS Team', notes: 'POS team responsibility' },
  { report: '[POS] Lives Sales', currentState: 'Other Team Owned', dataSource: 'POS Events', category: 'POS Reports', owner: 'POS Team', notes: 'POS team responsibility' },

  // Banking & Financial
  { report: 'Checking', currentState: 'Other Team Owned', dataSource: 'Banking', category: 'Banking', owner: 'Banking Team', notes: 'Banking team responsibility' },
  { report: 'Savings', currentState: 'Other Team Owned', dataSource: 'Banking', category: 'Banking', owner: 'Banking Team', notes: 'Banking team responsibility' },
  { report: 'Transfers Report', currentState: 'Other Team Owned', dataSource: 'Banking', category: 'Banking', owner: 'Banking Team', notes: 'Banking team responsibility' },
  { report: 'Loan', currentState: 'Other Team Owned', dataSource: 'Banking', category: 'Banking', owner: 'Banking Team', notes: 'Banking team responsibility' },
  { report: 'Balance', currentState: 'Other Team Owned', dataSource: 'Banking', category: 'Banking', owner: 'Banking Team', notes: 'Banking team responsibility' },
  { report: 'Cash Drawers', currentState: 'Other Team Owned', dataSource: 'POS/Banking', category: 'Banking', owner: 'POS Team', notes: 'POS team responsibility' },

  // Invoicing
  { report: 'Paid Invoices', currentState: 'Other Team Owned', dataSource: 'Invoices', category: 'Invoicing', owner: 'Invoicing Team', notes: 'Invoicing team migration timeline' },
  { report: 'Outstanding Invoices', currentState: 'Other Team Owned', dataSource: 'Invoices', category: 'Invoicing', owner: 'Invoicing Team', notes: 'Invoicing team responsibility' },
  { report: 'Accepted Invoices', currentState: 'Other Team Owned', dataSource: 'Invoices', category: 'Invoicing', owner: 'Invoicing Team', notes: 'Invoicing team responsibility' },
  { report: 'Pending approval estimates', currentState: 'Other Team Owned', dataSource: 'Estimates', category: 'Invoicing', owner: 'Invoicing Team', notes: 'Invoicing team responsibility' },
  { report: 'Accepted estimates', currentState: 'Other Team Owned', dataSource: 'Estimates', category: 'Invoicing', owner: 'Invoicing Team', notes: 'Invoicing team responsibility' },
  { report: 'Overdue invoices', currentState: 'Other Team Owned', dataSource: 'Invoices', category: 'Invoicing', owner: 'Invoicing Team', notes: 'Invoicing team responsibility' },

  // Risk & Disputes
  { report: 'Disputes', currentState: 'External Workflow', dataSource: 'Disputes/Risk', category: 'Risk & Disputes', owner: 'Risk Team', notes: 'Risk team existing workflow' },

  // HR & Payroll
  { report: 'Payroll', currentState: 'Other Team Owned', dataSource: 'HR/Payroll', category: 'HR & Payroll', owner: 'HR Team', notes: 'HR team responsibility' }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Migrated to SDP':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'In progress migrating to SDP':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    case 'Not started':
      return <Circle className="h-5 w-5 text-gray-400" />;
    case 'External Workflow':
      return <AlertCircle className="h-5 w-5 text-purple-500" />;
    case 'Other Team Owned':
      return <AlertCircle className="h-5 w-5 text-blue-500" />;
    default:
      return <AlertCircle className="h-5 w-5 text-red-500" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Migrated to SDP':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'In progress migrating to SDP':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Not started':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'External Workflow':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Other Team Owned':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    default:
      return 'bg-red-100 text-red-800 border-red-200';
  }
};

export function MigrationStatusTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Get unique categories and statuses
  const categories = ['All', ...Array.from(new Set(reportData.map(item => item.category)))];
  const statuses = ['All', ...Array.from(new Set(reportData.map(item => item.currentState)))];

  // Filter data
  const filteredData = reportData.filter(item => {
    const matchesSearch = item.report.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.dataSource.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.currentState === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Calculate statistics
  const totalReports = reportData.length;
  const migratedCount = reportData.filter(item => item.currentState === 'Migrated to SDP').length;
  const inProgressCount = reportData.filter(item => item.currentState === 'In progress migrating to SDP').length;
  const notStartedCount = reportData.filter(item => 
    item.currentState === 'Not started'
  ).length;

  const migratedPercentage = Math.round((migratedCount / totalReports) * 100);
  const inProgressPercentage = Math.round((inProgressCount / totalReports) * 100);
  const notStartedPercentage = Math.round((notStartedCount / totalReports) * 100);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">SDP Migration Status Tracker</h1>
          <p className="text-gray-600">Track the progress of report migrations to the new SDP platform</p>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-3xl font-bold text-gray-900">{totalReports}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Filter className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Migrated</p>
                <p className="text-3xl font-bold text-green-600">{migratedCount}</p>
                <p className="text-sm text-gray-500">{migratedPercentage}% complete</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-3xl font-bold text-yellow-600">{inProgressCount}</p>
                <p className="text-sm text-gray-500">{inProgressPercentage}% of total</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Not Started</p>
                <p className="text-3xl font-bold text-gray-600">{notStartedCount}</p>
                <p className="text-sm text-gray-500">{notStartedPercentage}% remaining</p>
              </div>
              <div className="p-3 bg-gray-100 rounded-full">
                <Circle className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Progress</h3>
          <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
            <div className="flex h-4 rounded-full overflow-hidden">
              <div 
                className="bg-green-500 transition-all duration-500"
                style={{ width: `${migratedPercentage}%` }}
              ></div>
              <div 
                className="bg-yellow-500 transition-all duration-500"
                style={{ width: `${inProgressPercentage}%` }}
              ></div>
              <div 
                className="bg-gray-400 transition-all duration-500"
                style={{ width: `${notStartedPercentage}%` }}
              ></div>
            </div>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              Migrated ({migratedCount})
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              In Progress ({inProgressCount})
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              Not Started ({notStartedCount})
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Reports</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by report name or data source..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Migration Status Details ({filteredData.length} of {totalReports} reports)
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredData.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.report}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.dataSource}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(item.currentState)}
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(item.currentState)}`}>
                          {item.currentState}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No reports match your current filters</div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedStatus('All');
              }}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
