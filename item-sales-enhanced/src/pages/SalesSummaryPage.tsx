import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/Table';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { mockSalesSummary } from '../data/mockData';
import { 
  ExternalLink, 
  TrendingUp, 
  DollarSign, 
  ShoppingCart, 
  Calculator, 
  X,
  Settings
} from 'lucide-react';

const SalesSummaryPage: React.FC = () => {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportTypeOpen, setIsReportTypeOpen] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('summary');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState('Hours');

  const salesData = mockSalesSummary;

  // Sample transaction data for modal
  const sampleTransaction = {
    id: 'TXN-001',
    date: '2024-01-15',
    time: '14:30',
    amount: 125.50,
    customer: 'John Doe',
    items: [
      { name: 'Premium Coffee', quantity: 2, price: 25.00 },
      { name: 'Gourmet Sandwich', quantity: 1, price: 75.50 }
    ],
    paymentMethod: 'Credit Card',
    status: 'Completed'
  };

  const reportTypeOptions = [
    { 
      id: 'summary', 
      label: 'Summary', 
      description: 'Shows total metrics from different days together as one total number, unless others may show day-by-day changes etc.' 
    },
    { 
      id: 'summary-by-hour', 
      label: 'Summary by hour', 
      description: 'Shows metrics from different days together separately by hour for all sales made at 10am or sales made at 11am etc.' 
    },
    { 
      id: 'summary-by-day', 
      label: 'Summary by day', 
      description: 'Shows metrics from different days together separately by day for all the week day or sales made on Tuesday etc.' 
    },
    { 
      id: 'individual-increments', 
      label: 'Individual increments', 
      description: '' 
    }
  ];

  const timeFrameOptions = [
    { value: 'Hours', description: 'Show data for each hour in the selected time frame' },
    { value: 'Days', description: 'Show data for each day in the selected time frame' },
    { value: 'Weeks', description: 'Show data for each week in the selected time frame' },
    { value: 'Months', description: 'Show data for each month in the selected time frame' }
  ];

  const handleTransactionClick = () => {
    setSelectedTransaction(sampleTransaction);
    setIsModalOpen(true);
  };

  const handleExternalLink = (productId: string) => {
    window.open(`/products/${productId}`, '_blank');
  };

  const handleApplyReportType = () => {
    console.log('Applying report type:', selectedReportType, 'with timeframe:', selectedTimeFrame);
    setIsReportTypeOpen(false);
  };

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="flex">
      {/* Main Content */}
      <div className={`flex-1 space-y-6 ${isReportTypeOpen ? 'pr-6' : ''}`}>
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Summary</h1>
            <p className="text-gray-600 mt-1">Comprehensive overview of sales performance</p>
          </div>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={() => setIsReportTypeOpen(true)}
            >
              <Settings size={16} />
              <span>Report Type</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center space-x-2"
              onClick={() => window.print()}
            >
              <ExternalLink size={16} />
              <span>Export Report</span>
            </Button>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gross Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${salesData.grossSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="inline h-3 w-3 mr-1" />
                Total revenue before deductions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Net Sales</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${salesData.netSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                After returns and adjustments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Transactions</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{salesData.transactionCount}</div>
              <p className="text-xs text-muted-foreground">
                Total number of transactions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Ticket</CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${salesData.averageTicket.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Average transaction value
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales by Hour</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={salesData.salesByHour}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Sales']} />
                  <Bar dataKey="sales" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Products by Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={salesData.topProducts}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="revenue"
                  >
                    {salesData.topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Top Products Table */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Top Products Performance</CardTitle>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleExternalLink('all')}
              className="flex items-center space-x-2"
            >
              <ExternalLink size={14} />
              <span>View All Products</span>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Quantity Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Avg. Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {salesData.topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>${product.revenue.toLocaleString()}</TableCell>
                    <TableCell>${(product.revenue / product.quantity).toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={handleTransactionClick}
                        >
                          View Details
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleExternalLink(product.id)}
                          className="flex items-center space-x-1"
                        >
                          <ExternalLink size={12} />
                          <span>Link</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Transaction Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Transaction Details"
          className="max-w-2xl"
        >
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Transaction ID</label>
                  <p className="text-lg font-semibold">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Date & Time</label>
                  <p className="text-lg">{selectedTransaction.date} at {selectedTransaction.time}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Customer</label>
                  <p className="text-lg">{selectedTransaction.customer}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Method</label>
                  <p className="text-lg">{selectedTransaction.paymentMethod}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Items</label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {selectedTransaction.items.map((item: any, index: number) => (
                        <TableRow key={index}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>${(item.quantity * item.price).toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <div>
                  <span className="text-sm font-medium text-gray-500">Status: </span>
                  <span className="text-green-600 font-semibold">{selectedTransaction.status}</span>
                </div>
                <div>
                  <span className="text-lg font-bold">Total: ${selectedTransaction.amount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                  Close
                </Button>
                <Button onClick={() => handleExternalLink(selectedTransaction.id)}>
                  <ExternalLink size={16} className="mr-2" />
                  View Full Transaction
                </Button>
              </div>
            </div>
          )}
        </Modal>
      </div>

      {/* Report Type Side Panel */}
      {isReportTypeOpen && (
        <div className="w-80 bg-white border-l border-gray-200 p-6 space-y-6 h-screen overflow-y-auto">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Report type</h2>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsReportTypeOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>

          <p className="text-sm text-gray-600">
            Changing the report type will change your data to be viewed differently. Summary reports will show single total numbers unless others may show day-by-day changes etc.
          </p>

          <div className="space-y-4">
            <h3 className="font-medium">Summaries</h3>
            
            {reportTypeOptions.map((option) => (
              <div key={option.id} className="space-y-2">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="reportType"
                    value={option.id}
                    checked={selectedReportType === option.id}
                    onChange={(e) => setSelectedReportType(e.target.value)}
                    className="w-4 h-4 text-blue-600 mt-0.5"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-medium">{option.label}</span>
                    {option.description && (
                      <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                    )}
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Individual increments</h3>
            
            {timeFrameOptions.map((timeFrame) => (
              <label key={timeFrame.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="timeFrame"
                  value={timeFrame.value}
                  checked={selectedTimeFrame === timeFrame.value}
                  onChange={(e) => setSelectedTimeFrame(e.target.value)}
                  className="w-4 h-4 text-blue-600 mt-0.5"
                />
                <div className="flex-1">
                  <span className="text-sm font-medium">{timeFrame.value}</span>
                  <p className="text-xs text-gray-500 mt-1">{timeFrame.description}</p>
                </div>
              </label>
            ))}
          </div>

          <div className="pt-4 border-t">
            <Button 
              onClick={handleApplyReportType}
              className="w-full"
            >
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesSummaryPage;