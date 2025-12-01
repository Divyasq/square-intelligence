import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  TrendingUp, 
  RefreshCw, 
  ShoppingCart,
  Plus,
  BarChart3,
  Calendar,
  Filter,
  Download,
  Clock
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

interface MetricWidget {
  id: string;
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: React.ComponentType<any>;
  route: string;
}

const metricWidgets: MetricWidget[] = [
  {
    id: 'gross-sales',
    title: 'Gross Sales',
    value: '$12,234.56',
    change: '+12.5%',
    changeType: 'positive',
    icon: DollarSign,
    route: '/financial-suite/reports/sales-summary'
  },
  {
    id: 'net-sales',
    title: 'Net Sales',
    value: '$11,456.78',
    change: '+8.3%',
    changeType: 'positive',
    icon: TrendingUp,
    route: '/financial-suite/reports/sales-summary'
  },
  {
    id: 'returns',
    title: 'Returns',
    value: '$777.78',
    change: '-2.1%',
    changeType: 'negative',
    icon: RefreshCw,
    route: '/financial-suite/reports/sales-summary'
  },
  {
    id: 'transaction-count',
    title: 'Transaction Count',
    value: '1,234',
    change: '+15.7%',
    changeType: 'positive',
    icon: ShoppingCart,
    route: '/financial-suite/reports/sales-summary'
  }
];

export function FinancialSuitePage() {
  const navigate = useNavigate();

  const handleWidgetClick = (widget: MetricWidget) => {
    navigate(widget.route);
  };

  const handleCreateCustomReport = () => {
    navigate('/financial-suite/custom-reports/create');
  };

  const handleViewReports = () => {
    navigate('/financial-suite/reports');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Financial Suite</h1>
              <p className="text-sm text-gray-600 mt-1">
                Comprehensive analytics and custom reporting for your business
              </p>
              <div className="mt-2 px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full inline-block">
                ✅ SCHEDULED EXPORTS ENABLED - Server: item-sales-enhanced
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Last 30 days
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="flex space-x-4">
            <Button onClick={handleCreateCustomReport} className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Create Custom Report
            </Button>
            <Button variant="outline" onClick={handleViewReports}>
              <BarChart3 className="h-4 w-4 mr-2" />
              View All Reports
            </Button>
            <Button variant="outline" onClick={() => navigate('/financial-suite/scheduled-exports')}>
              <Clock className="h-4 w-4 mr-2" />
              Scheduled Exports
            </Button>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Key Metrics</h2>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Widget
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metricWidgets.map((widget) => {
              const Icon = widget.icon;
              return (
                <Card 
                  key={widget.id}
                  className="p-6 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleWidgetClick(widget)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className={`text-sm font-medium ${
                      widget.changeType === 'positive' 
                        ? 'text-green-600' 
                        : widget.changeType === 'negative'
                        ? 'text-red-600'
                        : 'text-gray-600'
                    }`}>
                      {widget.change}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">
                      {widget.title}
                    </h3>
                    <p className="text-2xl font-bold text-gray-900">
                      {widget.value}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Reports */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
              <Button variant="outline" size="sm">View All</Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Sales Summary</p>
                  <p className="text-sm text-gray-600">Last run: 2 hours ago</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Items Performance</p>
                  <p className="text-sm text-gray-600">Last run: 1 day ago</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium text-gray-900">Customer Analysis</p>
                  <p className="text-sm text-gray-600">Last run: 3 days ago</p>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>
            </div>
          </Card>

          {/* Custom Reports */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Custom Reports</h3>
              <Button variant="outline" size="sm" onClick={handleCreateCustomReport}>
                Create New
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Weekly Performance Dashboard</p>
                  <p className="text-sm text-gray-600">Created: 1 week ago</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <div>
                  <p className="font-medium text-gray-900">Product Category Analysis</p>
                  <p className="text-sm text-gray-600">Created: 2 weeks ago</p>
                </div>
                <Button variant="outline" size="sm">Edit</Button>
              </div>
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">Start building custom reports tailored to your business needs</p>
                <Button onClick={handleCreateCustomReport}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Custom Report
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
