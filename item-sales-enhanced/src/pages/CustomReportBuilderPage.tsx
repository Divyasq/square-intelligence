import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  X, 
  Save, 
  Play, 
  Settings, 
  BarChart3, 
  Table, 
  PieChart, 
  TrendingUp,
  Filter,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  ShoppingCart,
  RefreshCw,
  Target,
  Clock,
  Layers,
  Package,
  Tag,
  CreditCard,
  Hash,
  FileText,
  Percent,
  Gift,
  AlertCircle,
  Trash2,
  User,
  Building2
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

interface MetricOption {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<any>;
}

interface FilterOption {
  id: string;
  name: string;
  type: 'date' | 'location' | 'category' | 'employee' | 'payment';
  icon: React.ComponentType<any>;
}

interface ChartOption {
  id: string;
  name: string;
  type: 'bar' | 'line' | 'pie' | 'table';
  icon: React.ComponentType<any>;
}

interface WidgetOption {
  id: string;
  name: string;
  type: 'metric' | 'chart' | 'table' | 'kpi';
  icon: React.ComponentType<any>;
}

// Complete metric definitions based on your specifications
const metricOptions: MetricOption[] = [
  // Basic Item Info
  { id: 'itemization-type', name: 'Itemization Type', category: 'Item Info', description: 'Type of item', icon: Package },
  { id: 'item-name', name: 'Item Name', category: 'Item Info', description: 'Name of the item', icon: Tag },
  { id: 'gtin', name: 'GTIN', category: 'Item Info', description: 'Global Trade Item Number', icon: Hash },
  { id: 'sku', name: 'SKU', category: 'Item Info', description: 'Stock Keeping Unit', icon: Hash },
  { id: 'location', name: 'Location', category: 'Item Info', description: 'Store location', icon: MapPin },
  { id: 'menu', name: 'Menu', category: 'Item Info', description: 'Menu category', icon: FileText },

  // Categories
  { id: 'categories', name: 'Categories', category: 'Categories', description: 'Item categories', icon: Layers },
  { id: 'reporting-category', name: 'Reporting Category', category: 'Categories', description: 'Category for reporting', icon: FileText },
  { id: 'category-rollup', name: 'Category Rollup', category: 'Categories', description: 'Rolled up categories', icon: Layers },

  // Sales Metrics
  { id: 'gross-sales', name: 'Gross Sales', category: 'Sales', description: 'Total sales before deductions', icon: DollarSign },
  { id: 'net-sales', name: 'Net Sales', category: 'Sales', description: 'Sales after returns and discounts', icon: TrendingUp },
  { id: 'tax', name: 'Tax', category: 'Sales', description: 'Tax amount', icon: Percent },
  { id: 'discount-amount', name: 'Discount Amount', category: 'Sales', description: 'Total discount amount', icon: Percent },
  { id: 'discount-name', name: 'Discount Name', category: 'Sales', description: 'Name of discount applied', icon: Tag },
  { id: 'comps', name: 'Comps', category: 'Sales', description: 'Complimentary items', icon: Gift },
  { id: 'void', name: 'Void', category: 'Sales', description: 'Voided transactions', icon: AlertCircle },
  { id: 'items-refunded', name: 'Items Refunded', category: 'Sales', description: 'Number of refunded items', icon: RefreshCw },
  { id: 'items-sold', name: 'Items Sold', category: 'Sales', description: 'Number of items sold', icon: ShoppingCart },
  { id: 'unit', name: 'Unit', category: 'Sales', description: 'Unit of measure', icon: Hash },
  { id: 'units-refunded', name: 'Units Refunded', category: 'Sales', description: 'Number of units refunded', icon: RefreshCw },
  { id: 'units-sold', name: 'Units Sold', category: 'Sales', description: 'Number of units sold', icon: ShoppingCart },
  { id: 'refunds', name: 'Refunds', category: 'Sales', description: 'Total refund amount', icon: RefreshCw },
  { id: 'device-name', name: 'Device Name', category: 'Sales', description: 'Name of the device', icon: Building2 },
  { id: 'device-nickname', name: 'Device Nickname', category: 'Sales', description: 'Nickname of the device', icon: Building2 },
  { id: 'qty', name: 'Qty', category: 'Sales', description: 'Quantity', icon: Hash },
  { id: 'channel', name: 'Channel', category: 'Sales', description: 'Sales channel', icon: Building2 },
  { id: 'transaction-count', name: 'Transaction Count', category: 'Sales', description: 'Number of transactions', icon: ShoppingCart },

  // Discount Details
  { id: 'amount-discounted', name: 'Amount Discounted', category: 'Discounts', description: 'Total amount discounted', icon: Percent },
  { id: 'discounts-applied', name: 'Discounts Applied', category: 'Discounts', description: 'Number of discounts applied', icon: Percent },
  { id: 'gift-card-amount-discounted', name: 'Gift Card Amount Discounted', category: 'Discounts', description: 'Gift card discount amount', icon: Gift },
  { id: 'gift-card-discounts-applied', name: 'Gift Card Discounts Applied', category: 'Discounts', description: 'Number of gift card discounts', icon: Gift },
  { id: 'name', name: 'Name', category: 'General', description: 'General name field', icon: Tag },

  // Void Details
  { id: 'amount-voided', name: 'Amount Voided', category: 'Voids', description: 'Total amount voided', icon: AlertCircle },
  { id: 'items-voided', name: 'Items Voided', category: 'Voids', description: 'Number of items voided', icon: AlertCircle },
  { id: 'void-reason', name: 'Void Reason', category: 'Voids', description: 'Reason for void', icon: AlertCircle },

  // Comp Details
  { id: 'amount-comped', name: 'Amount Comped', category: 'Comps', description: 'Total amount comped', icon: Gift },
  { id: 'comp-reason', name: 'Comp Reason', category: 'Comps', description: 'Reason for comp', icon: Gift },
  { id: 'gift-card-amount-comped', name: 'Gift Card Amount Comped', category: 'Comps', description: 'Gift card comp amount', icon: Gift },
  { id: 'gift-cards-comped', name: 'Gift Cards Comped', category: 'Comps', description: 'Number of gift cards comped', icon: Gift },
  { id: 'items-comped', name: 'Items Comped', category: 'Comps', description: 'Number of items comped', icon: Gift },

  // Custom Attributes
  { id: 'custom-attribute-name', name: 'Custom Attribute Name', category: 'Custom', description: 'Custom attribute name', icon: Tag },

  // Modifier Details
  { id: 'modifier-set-name', name: 'Modifier Set Name', category: 'Modifiers', description: 'Name of modifier set', icon: Layers },
  { id: 'modifier-name', name: 'Modifier Name', category: 'Modifiers', description: 'Name of modifier', icon: Tag },
  { id: 'net-qty-sold', name: 'Net Qty Sold', category: 'Modifiers', description: 'Net quantity sold', icon: Hash },
  { id: 'qty-refunded', name: 'Qty Refunded', category: 'Modifiers', description: 'Quantity refunded', icon: RefreshCw },
  { id: 'qty-sold', name: 'Qty Sold', category: 'Modifiers', description: 'Quantity sold', icon: ShoppingCart },
  { id: 'price', name: 'Price', category: 'Modifiers', description: 'Price of item/modifier', icon: DollarSign },

  // Variation Details
  { id: 'variation-name', name: 'Variation Name', category: 'Variations', description: 'Name of variation', icon: Tag },
  { id: 'variation-unit-cost', name: 'Variation Unit Cost', category: 'Variations', description: 'Unit cost of variation', icon: DollarSign },
  { id: 'variation-vendor-name', name: 'Variation Vendor Name', category: 'Variations', description: 'Vendor name for variation', icon: Building2 },
  { id: 'vendor-code', name: 'Vendor Code', category: 'Variations', description: 'Vendor code', icon: Hash },

  // Item Hierarchy
  { id: 'item', name: 'Item', category: 'Hierarchy', description: 'Item level', icon: Package },
  { id: 'variation', name: 'Variation', category: 'Hierarchy', description: 'Variation level', icon: Layers },
  { id: 'modifier', name: 'Modifier', category: 'Hierarchy', description: 'Modifier level', icon: Tag },

  // Vendor Details
  { id: 'vendor-name', name: 'Vendor Name', category: 'Vendors', description: 'Name of vendor', icon: Building2 },

  // Transaction Details
  { id: 'transaction-id', name: 'Transaction ID', category: 'Transaction', description: 'Transaction identifier', icon: Hash },
  { id: 'payment-id', name: 'Payment ID', category: 'Transaction', description: 'Payment identifier', icon: CreditCard },
  { id: 'details', name: 'Details', category: 'Transaction', description: 'Transaction details', icon: FileText },
  { id: 'event-type', name: 'Event Type', category: 'Transaction', description: 'Type of event', icon: Tag },
  { id: 'dining-option', name: 'Dining Option', category: 'Transaction', description: 'Dining option selected', icon: Package },
  { id: 'fulfillment-note', name: 'Fulfillment Note', category: 'Transaction', description: 'Fulfillment notes', icon: FileText },

  // Employee & Attribution
  { id: 'commission', name: 'Commission', category: 'Employee', description: 'Commission amount', icon: DollarSign },
  { id: 'attributed-to-employee', name: 'Attributed to Employee', category: 'Employee', description: 'Employee attribution', icon: User },

  // Time & Date
  { id: 'date-transaction', name: 'Date (transaction)', category: 'Time', description: 'Transaction date', icon: Calendar },
  { id: 'time', name: 'Time', category: 'Time', description: 'Transaction time', icon: Clock },
  { id: 'time-zone', name: 'Time Zone', category: 'Time', description: 'Time zone', icon: Clock },
  { id: 'order-created', name: 'Order Created', category: 'Time', description: 'Order creation time', icon: Calendar },
  { id: 'order-completed', name: 'Order Completed/Fulfilled', category: 'Time', description: 'Order completion time', icon: Calendar }
];

const groupByOptions = [
  'Location', 'Device Name', 'Device Nickname', 'Menu', 'Item Name', 'Category Rollup', 
  'Channel', 'Payment Method', 'Employee', 'Date', 'Time', 'Itemization Type'
];

const filterOptions: FilterOption[] = [
  { id: 'category-rollup', name: 'Category Rollup', type: 'category', icon: Layers },
  { id: 'channel', name: 'Channel', type: 'category', icon: Building2 },
  { id: 'device', name: 'Device', type: 'category', icon: Building2 },
  { id: 'device-nickname', name: 'Device Nickname', type: 'category', icon: Building2 },
  { id: 'discount', name: 'Discount', type: 'category', icon: Percent },
  { id: 'fulfillment-methods', name: 'Fulfillment Methods', type: 'category', icon: Package },
  { id: 'item-name', name: 'Item Name', type: 'category', icon: Tag },
  { id: 'item-category', name: 'Item Category', type: 'category', icon: Layers },
  { id: 'item-reporting-category', name: 'Item Reporting Category', type: 'category', icon: FileText },
  { id: 'item-type', name: 'Item Type', type: 'category', icon: Package },
  { id: 'location', name: 'Location', type: 'location', icon: MapPin },
  { id: 'menu', name: 'Menu', type: 'category', icon: FileText },
  { id: 'payment-method', name: 'Payment Method', type: 'payment', icon: CreditCard },
  { id: 'source', name: 'Source', type: 'category', icon: Building2 },
  { id: 'team-member-collected', name: 'Team Member (collected by)', type: 'employee', icon: Users },
  { id: 'team-member-attributed', name: 'Team Member (attributed to)', type: 'employee', icon: Users },
  { id: 'revenue-center', name: 'Revenue Center', type: 'category', icon: Building2 },
  { id: 'date-range', name: 'Date Range', type: 'date', icon: Calendar }
];

// Enhanced mock table data with more comprehensive dummy data
const mockTableData = [
  {
    id: 1,
    itemName: 'Chicken Sandwich',
    itemizationType: 'Food',
    gtin: '1234567890123',
    sku: 'CHICK-001',
    location: 'Main Street',
    menu: 'Lunch Menu',
    categories: 'Sandwiches',
    reportingCategory: 'Food',
    categoryRollup: 'Main Dishes',
    grossSales: 45.99,
    netSales: 41.39,
    tax: 4.60,
    discountAmount: 0,
    discountName: '',
    comps: 0,
    void: 0,
    itemsRefunded: 0,
    itemsSold: 3,
    unit: 'Each',
    unitsRefunded: 0,
    unitsSold: 3,
    refunds: 0,
    deviceName: 'Square Terminal',
    deviceNickname: 'Front Counter',
    qty: 3,
    channel: 'In-Store',
    transactionCount: 2,
    amountDiscounted: 0,
    discountsApplied: 0,
    price: 15.33,
    transactionId: 'TXN-001',
    paymentId: 'PAY-001',
    diningOption: 'Dine In',
    commission: 2.30,
    attributedToEmployee: 'John Doe',
    dateTransaction: '2025-01-28',
    time: '12:30 PM',
    timeZone: 'PST'
  },
  {
    id: 2,
    itemName: 'Caesar Salad',
    itemizationType: 'Food',
    gtin: '1234567890124',
    sku: 'CAES-001',
    location: 'Main Street', 
    menu: 'Lunch Menu',
    categories: 'Salads',
    reportingCategory: 'Food',
    categoryRollup: 'Healthy Options',
    grossSales: 28.50,
    netSales: 25.65,
    tax: 2.85,
    discountAmount: 0,
    discountName: '',
    comps: 0,
    void: 0,
    itemsRefunded: 0,
    itemsSold: 2,
    unit: 'Each',
    unitsRefunded: 0,
    unitsSold: 2,
    refunds: 0,
    deviceName: 'Square Terminal',
    deviceNickname: 'Front Counter',
    qty: 2,
    channel: 'In-Store',
    transactionCount: 2,
    amountDiscounted: 0,
    discountsApplied: 0,
    price: 14.25,
    transactionId: 'TXN-002',
    paymentId: 'PAY-002',
    diningOption: 'Takeout',
    commission: 1.43,
    attributedToEmployee: 'Jane Smith',
    dateTransaction: '2025-01-28',
    time: '1:15 PM',
    timeZone: 'PST'
  },
  {
    id: 3,
    itemName: 'Margherita Pizza',
    itemizationType: 'Food',
    gtin: '1234567890125',
    sku: 'MARG-001',
    location: 'Downtown',
    menu: 'Dinner Menu',
    categories: 'Pizza',
    reportingCategory: 'Food',
    categoryRollup: 'Main Dishes',
    grossSales: 89.97,
    netSales: 80.97,
    tax: 8.99,
    discountAmount: 0,
    discountName: '',
    comps: 0,
    void: 0,
    itemsRefunded: 0,
    itemsSold: 3,
    unit: 'Each',
    unitsRefunded: 0,
    unitsSold: 3,
    refunds: 0,
    deviceName: 'iPad POS',
    deviceNickname: 'Kitchen Terminal',
    qty: 3,
    channel: 'Online',
    transactionCount: 1,
    amountDiscounted: 0,
    discountsApplied: 0,
    price: 29.99,
    transactionId: 'TXN-003',
    paymentId: 'PAY-003',
    diningOption: 'Delivery',
    commission: 4.50,
    attributedToEmployee: 'Mike Johnson',
    dateTransaction: '2025-01-28',
    time: '6:45 PM',
    timeZone: 'PST'
  },
  {
    id: 4,
    itemName: 'Iced Coffee',
    itemizationType: 'Beverage',
    gtin: '1234567890126',
    sku: 'ICOF-001',
    location: 'Main Street',
    menu: 'Beverages',
    categories: 'Cold Drinks',
    reportingCategory: 'Beverages',
    categoryRollup: 'Beverages',
    grossSales: 24.75,
    netSales: 22.28,
    tax: 2.47,
    discountAmount: 2.47,
    discountName: 'Student Discount',
    comps: 0,
    void: 0,
    itemsRefunded: 0,
    itemsSold: 5,
    unit: 'Each',
    unitsRefunded: 0,
    unitsSold: 5,
    refunds: 0,
    deviceName: 'Square Register',
    deviceNickname: 'Coffee Bar',
    qty: 5,
    channel: 'In-Store',
    transactionCount: 3,
    amountDiscounted: 2.47,
    discountsApplied: 1,
    price: 4.95,
    transactionId: 'TXN-004',
    paymentId: 'PAY-004',
    diningOption: 'Takeout',
    commission: 1.24,
    attributedToEmployee: 'Sarah Wilson',
    dateTransaction: '2025-01-28',
    time: '8:30 AM',
    timeZone: 'PST'
  },
  {
    id: 5,
    itemName: 'Chocolate Cake',
    itemizationType: 'Food',
    gtin: '1234567890127',
    sku: 'CHOC-001',
    location: 'Downtown',
    menu: 'Desserts',
    categories: 'Desserts',
    reportingCategory: 'Food',
    categoryRollup: 'Desserts',
    grossSales: 42.50,
    netSales: 38.25,
    tax: 4.25,
    discountAmount: 0,
    discountName: '',
    comps: 8.50,
    void: 0,
    itemsRefunded: 0,
    itemsSold: 4,
    unit: 'Slice',
    unitsRefunded: 0,
    unitsSold: 5,
    refunds: 0,
    deviceName: 'iPad POS',
    deviceNickname: 'Dessert Station',
    qty: 5,
    channel: 'In-Store',
    transactionCount: 2,
    amountDiscounted: 0,
    discountsApplied: 0,
    price: 8.50,
    transactionId: 'TXN-005',
    paymentId: 'PAY-005',
    diningOption: 'Dine In',
    commission: 2.13,
    attributedToEmployee: 'Alex Brown',
    dateTransaction: '2025-01-28',
    time: '3:20 PM',
    timeZone: 'PST'
  }
];

const chartOptions: ChartOption[] = [
  { id: 'bar-chart', name: 'Bar Chart', type: 'bar', icon: BarChart3 },
  { id: 'line-chart', name: 'Line Chart', type: 'line', icon: TrendingUp },
  { id: 'pie-chart', name: 'Pie Chart', type: 'pie', icon: PieChart },
  { id: 'data-table', name: 'Data Table', type: 'table', icon: Table }
];

// Simplified widget options - only Metric Cards and KPI Cards
const widgetOptions: WidgetOption[] = [
  { id: 'metric-card', name: 'Metric Card', type: 'metric', icon: Target },
  { id: 'kpi-widget', name: 'KPI Widget', type: 'kpi', icon: TrendingUp }
];

// Predefined metric cards based on your requirements
const predefinedMetricCards = [
  { id: 'gross-sales', name: 'Gross Sales', value: '$2,847.50', change: '+12.5%', icon: DollarSign },
  { id: 'net-sales', name: 'Net Sales', value: '$2,563.20', change: '+8.3%', icon: TrendingUp },
  { id: 'average-total-sale', name: 'Average Total Sale', value: '$18.75', change: '+5.2%', icon: Target },
  { id: 'cover-count', name: 'Cover Count', value: '152', change: '+15.8%', icon: Users },
  { id: 'transaction-count', name: 'Transaction Count', value: '89', change: '+7.4%', icon: ShoppingCart },
  { id: 'sale-count', name: 'Sale Count', value: '89', change: '+7.4%', icon: ShoppingCart },
  { id: 'return-count', name: 'Return Count', value: '3', change: '-12.5%', icon: RefreshCw },
  { id: 'items-sold', name: 'Items Sold', value: '247', change: '+18.2%', icon: Package }
];

// KPI card data
const kpiCardData = {
  id: 'ube-ice-cream-kpi',
  title: 'Ube Ice Cream Sales',
  value: '+20%',
  description: 'Top combination: Sugar Cone + Mango',
  trend: 'positive'
};

export function CustomReportBuilderPage() {
  const navigate = useNavigate();
  const [reportName, setReportName] = useState('');
  const [reportDescription, setReportDescription] = useState('');
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [selectedCharts, setSelectedCharts] = useState<string[]>([]);
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);
  const [selectedGroupBy, setSelectedGroupBy] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'metrics' | 'filters' | 'charts' | 'widgets' | 'groupby'>('metrics');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSave = () => {
    console.log('Saving report:', {
      name: reportName,
      description: reportDescription,
      metrics: selectedMetrics,
      filters: selectedFilters,
      charts: selectedCharts,
      widgets: selectedWidgets,
      groupBy: selectedGroupBy
    });
    navigate('/financial-suite/custom-reports');
  };

  const handlePreview = () => {
    console.log('Previewing report');
  };

  const addMetric = (metricId: string) => {
    if (!selectedMetrics.includes(metricId)) {
      setSelectedMetrics([...selectedMetrics, metricId]);
    }
  };

  const removeMetric = (metricId: string) => {
    setSelectedMetrics(selectedMetrics.filter(id => id !== metricId));
  };

  const addFilter = (filterId: string) => {
    if (!selectedFilters.includes(filterId)) {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };

  const removeFilter = (filterId: string) => {
    setSelectedFilters(selectedFilters.filter(id => id !== filterId));
  };

  const addChart = (chartId: string) => {
    if (!selectedCharts.includes(chartId)) {
      setSelectedCharts([...selectedCharts, chartId]);
    }
  };

  const removeChart = (chartId: string) => {
    setSelectedCharts(selectedCharts.filter(id => id !== chartId));
  };

  const addWidget = (widgetId: string) => {
    if (!selectedWidgets.includes(widgetId)) {
      setSelectedWidgets([...selectedWidgets, widgetId]);
    }
  };

  const removeWidget = (widgetId: string) => {
    setSelectedWidgets(selectedWidgets.filter(id => id !== widgetId));
  };

  const addGroupBy = (groupBy: string) => {
    if (!selectedGroupBy.includes(groupBy)) {
      setSelectedGroupBy([...selectedGroupBy, groupBy]);
    }
  };

  const removeGroupBy = (groupBy: string) => {
    setSelectedGroupBy(selectedGroupBy.filter(item => item !== groupBy));
  };

  // Enhanced table data with more records for pagination
  const getAllTableData = () => {
    // Extend mock data for pagination demo
    const extendedData = [];
    for (let i = 0; i < 50; i++) {
      const baseItem = mockTableData[i % mockTableData.length];
      extendedData.push({
        ...baseItem,
        id: i + 1,
        itemName: `${baseItem.itemName} ${Math.floor(i / 5) + 1}`,
        grossSales: baseItem.grossSales + (Math.random() * 20 - 10),
        netSales: baseItem.netSales + (Math.random() * 15 - 7.5),
        tax: baseItem.tax + (Math.random() * 2 - 1),
        itemsSold: baseItem.itemsSold + Math.floor(Math.random() * 5),
        transactionCount: baseItem.transactionCount + Math.floor(Math.random() * 3)
      });
    }
    return extendedData;
  };

  // Get filtered and grouped table data based on selections
  const getTableData = () => {
    let data = getAllTableData();
    
    // Apply grouping if selected - multiple group by columns
    if (selectedGroupBy.length > 0) {
      // For demo, we'll group by the first selected group by option
      const primaryGroupBy = selectedGroupBy[0];
      
      if (primaryGroupBy === 'Location') {
        const grouped = data.reduce((acc, item) => {
          const key = item.location;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        }, {} as any);
        
        data = Object.entries(grouped).flatMap(([location, items]: [string, any]) => [
          { id: `header-${location}`, isGroupHeader: true, location, itemName: location },
          ...items
        ]);
      } else if (primaryGroupBy === 'Menu') {
        const grouped = data.reduce((acc, item) => {
          const key = item.menu;
          if (!acc[key]) {
            acc[key] = [];
          }
          acc[key].push(item);
          return acc;
        }, {} as any);
        
        data = Object.entries(grouped).flatMap(([menu, items]: [string, any]) => [
          { id: `header-${menu}`, isGroupHeader: true, menu, itemName: menu },
          ...items
        ]);
      }
    }
    
    return data;
  };

  // Get table columns based on selected group by and metrics
  const getTableColumns = () => {
    const columns = [];
    
    // Add group by columns first in order
    selectedGroupBy.forEach(groupBy => {
      const key = groupBy.toLowerCase().replace(/\s+/g, '');
      columns.push({ 
        key, 
        label: groupBy,
        type: 'text',
        isGroupBy: true
      });
    });
    
    // Add selected metric columns
    selectedMetrics.forEach(metricId => {
      const metric = metricOptions.find(m => m.id === metricId);
      if (metric) {
        columns.push({ 
          key: metricId.replace(/-/g, ''), 
          label: metric.name,
          type: ['gross-sales', 'net-sales', 'tax', 'discount-amount', 'refunds', 'commission', 'price', 'amount-discounted', 'amount-voided', 'amount-comped'].includes(metricId) ? 'currency' : 'number',
          isGroupBy: false
        });
      }
    });
    
    return columns;
  };

  const formatValue = (value: any, type: string) => {
    if (type === 'currency') {
      return `$${value?.toFixed(2) || '0.00'}`;
    }
    if (type === 'number') {
      return value || 0;
    }
    return value || '';
  };

  // Pagination logic
  const getPaginatedData = (data: any[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const getTotalPages = (data: any[]) => {
    return Math.ceil(data.length / itemsPerPage);
  };

  const renderPreviewSection = () => {
    const tableData = getTableData();
    const columns = getTableColumns();
    
    return (
      <div className="space-y-6">
        {/* Widgets Section */}
        {selectedWidgets.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Widgets</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedWidgets.map((widgetId) => {
                // Check if it's a metric card
                const metricCard = predefinedMetricCards.find(m => m.id === widgetId);
                if (metricCard) {
                  const Icon = metricCard.icon;
                  const isPositive = metricCard.change.startsWith('+');
                  return (
                    <Card key={widgetId} className="p-4 relative group">
                      {/* Remove button */}
                      <button
                        onClick={() => removeWidget(widgetId)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Icon className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className={`text-sm font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {metricCard.change}
                        </span>
                      </div>
                      <h4 className="text-sm font-medium text-gray-600">{metricCard.name}</h4>
                      <p className="text-2xl font-bold text-gray-900">{metricCard.value}</p>
                    </Card>
                  );
                }
                
                // Check if it's the KPI widget
                if (widgetId === kpiCardData.id) {
                  return (
                    <Card key={widgetId} className="p-4 relative group col-span-full md:col-span-2">
                      {/* Remove button */}
                      <button
                        onClick={() => removeWidget(widgetId)}
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1"
                      >
                        <X className="h-3 w-3" />
                      </button>
                      
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <TrendingUp className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">{kpiCardData.title}</h4>
                          <p className="text-3xl font-bold text-green-600 mb-1">{kpiCardData.value}</p>
                          <p className="text-sm text-gray-600">{kpiCardData.description}</p>
                        </div>
                      </div>
                    </Card>
                  );
                }
                
                return null;
              })}
            </div>
          </div>
        )}

        {/* Charts Section */}
        {selectedCharts.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Charts</h3>
            <div className="space-y-4">
              {selectedCharts.map((chartId) => {
                const chart = chartOptions.find(c => c.id === chartId);
                if (!chart) return null;
                
                return (
                  <Card key={chartId} className="p-6 relative group">
                    {/* Remove button */}
                    <button
                      onClick={() => removeChart(chartId)}
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 hover:bg-red-200 text-red-600 rounded-full p-1 z-10"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-medium text-gray-900">{chart.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">Compare</Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    {/* Mock chart visualization */}
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <chart.icon className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-600">{chart.name} Preview</p>
                        <p className="text-sm text-gray-500">Chart will render based on selected metrics</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Table Section */}
        {selectedMetrics.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Data Table</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">
                  Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, tableData.length)} of {tableData.length} results
                </span>
                {selectedFilters.length > 0 && (
                  <Badge variant="outline" className="text-xs">
                    {selectedFilters.length} filter{selectedFilters.length > 1 ? 's' : ''} applied
                  </Badge>
                )}
              </div>
            </div>
            <Card className="overflow-hidden">
              {columns.length === 0 ? (
                <div className="p-12 text-center">
                  <Table className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Select Metrics to Build Table</h4>
                  <p className="text-gray-600">Choose metrics from the right panel to populate your data table</p>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          {columns.map((column) => (
                            <th key={column.key} className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.isGroupBy ? 'bg-blue-50' : ''}`}>
                              {column.label}
                              {column.isGroupBy && (
                                <span className="ml-1 text-blue-600">↓</span>
                              )}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {getPaginatedData(tableData).map((row, index) => (
                          <tr key={`${row.id}-${index}`} className={row.isGroupHeader ? 'bg-blue-50 font-semibold' : 'hover:bg-gray-50'}>
                            {columns.map((column) => (
                              <td key={`${row.id}-${column.key}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {row.isGroupHeader ? (
                                  column.isGroupBy ? (
                                    <span className="font-semibold text-blue-900 flex items-center">
                                      <Layers className="h-4 w-4 mr-1" />
                                      {row[column.key] || row.itemName}
                                    </span>
                                  ) : (
                                    <span className="text-gray-400">—</span>
                                  )
                                ) : (
                                  formatValue(row[column.key.replace(/([A-Z])/g, '$1').toLowerCase().replace(/\s+/g, '') as keyof typeof row], column.type || 'text')
                                )}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Pagination */}
                  {getTotalPages(tableData) > 1 && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                      <div className="flex-1 flex justify-between sm:hidden">
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(Math.min(getTotalPages(tableData), currentPage + 1))}
                          disabled={currentPage === getTotalPages(tableData)}
                        >
                          Next
                        </Button>
                      </div>
                      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Showing{' '}
                            <span className="font-medium">{((currentPage - 1) * itemsPerPage) + 1}</span>
                            {' '}to{' '}
                            <span className="font-medium">
                              {Math.min(currentPage * itemsPerPage, tableData.length)}
                            </span>
                            {' '}of{' '}
                            <span className="font-medium">{tableData.length}</span>
                            {' '}results
                          </p>
                        </div>
                        <div>
                          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                            <Button
                              variant="outline"
                              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                              disabled={currentPage === 1}
                              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                              Previous
                            </Button>
                            
                            {/* Page numbers */}
                            {Array.from({ length: Math.min(5, getTotalPages(tableData)) }, (_, i) => {
                              const pageNum = i + 1;
                              return (
                                <Button
                                  key={pageNum}
                                  variant={currentPage === pageNum ? "default" : "outline"}
                                  onClick={() => setCurrentPage(pageNum)}
                                  className="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                                >
                                  {pageNum}
                                </Button>
                              );
                            })}
                            
                            <Button
                              variant="outline"
                              onClick={() => setCurrentPage(Math.min(getTotalPages(tableData), currentPage + 1))}
                              disabled={currentPage === getTotalPages(tableData)}
                              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                            >
                              Next
                            </Button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </Card>
          </div>
        )}

        {/* Empty State */}
        {selectedMetrics.length === 0 && selectedWidgets.length === 0 && (
          <div className="text-center py-12">
            <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Start Building Your Report</h3>
            <p className="text-gray-600 mb-6">Select metric cards and KPI widgets from the right panel to build your custom report</p>
          </div>
        )}
      </div>
    );
  };

  const renderMetricsPanel = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">Available Metrics</h4>
        <span className="text-xs text-gray-500">{selectedMetrics.length} selected</span>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {metricOptions.map((metric) => {
          const Icon = metric.icon;
          const isSelected = selectedMetrics.includes(metric.id);
          return (
            <div
              key={metric.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => addMetric(metric.id)}
            >
              <div className="flex items-center space-x-2">
                <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                    {!isSelected && (
                      <Plus className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">{metric.description}</p>
                  <Badge variant="outline" className="mt-1 text-xs">{metric.category}</Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderFiltersPanel = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">Available Filters</h4>
        <span className="text-xs text-gray-500">{selectedFilters.length} selected</span>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {filterOptions.map((filter) => {
          const Icon = filter.icon;
          const isSelected = selectedFilters.includes(filter.id);
          return (
            <div
              key={filter.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => addFilter(filter.id)}
            >
              <div className="flex items-center space-x-2">
                <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{filter.name}</span>
                    {!isSelected && (
                      <Plus className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs capitalize">{filter.type}</Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderGroupByPanel = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">Group By Options</h4>
        {selectedGroupBy.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setSelectedGroupBy([])}
            className="text-xs"
          >
            Clear All
          </Button>
        )}
      </div>
      
      {/* Selected Group By Items */}
      {selectedGroupBy.length > 0 && (
        <div className="mb-4">
          <h5 className="text-xs font-medium text-gray-600 mb-2">Selected ({selectedGroupBy.length})</h5>
          <div className="space-y-1">
            {selectedGroupBy.map((groupBy, index) => (
              <div key={groupBy} className="flex items-center justify-between p-2 bg-blue-50 rounded border border-blue-200">
                <div className="flex items-center space-x-2">
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                    {index + 1}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{groupBy}</span>
                </div>
                <button
                  onClick={() => removeGroupBy(groupBy)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {groupByOptions.map((option) => {
          const isSelected = selectedGroupBy.includes(option);
          return (
            <div
              key={option}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                isSelected ? 'border-blue-500 bg-blue-50 opacity-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => isSelected ? removeGroupBy(option) : addGroupBy(option)}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{option}</span>
                {isSelected ? (
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Added</Badge>
                ) : (
                  <Plus className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderChartsPanel = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">Available Charts</h4>
        <span className="text-xs text-gray-500">{selectedCharts.length} selected</span>
      </div>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {chartOptions.map((chart) => {
          const Icon = chart.icon;
          const isSelected = selectedCharts.includes(chart.id);
          return (
            <div
              key={chart.id}
              className={`p-3 rounded-lg border cursor-pointer transition-all ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => addChart(chart.id)}
            >
              <div className="flex items-center space-x-2">
                <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{chart.name}</span>
                    {!isSelected && (
                      <Plus className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs capitalize">{chart.type}</Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderWidgetsPanel = () => (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-gray-700">Available Widgets</h4>
        <span className="text-xs text-gray-500">{predefinedMetricCards.length + 1} selected</span>
      </div>
      
      {/* Metric Cards Section */}
      <div className="mb-6">
        <h5 className="text-xs font-medium text-gray-600 mb-2 flex items-center">
          <Target className="h-3 w-3 mr-1" />
          Metric Cards
        </h5>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {predefinedMetricCards.map((metric) => {
            const Icon = metric.icon;
            const isSelected = selectedWidgets.includes(metric.id);
            return (
              <div
                key={metric.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => addWidget(metric.id)}
              >
                <div className="flex items-center space-x-2">
                  <Icon className={`h-4 w-4 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                      {!isSelected && (
                        <Plus className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className="text-xs">Metric</Badge>
                      <span className="text-xs text-gray-500">{metric.value}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KPI Widget Section */}
      <div>
        <h5 className="text-xs font-medium text-gray-600 mb-2 flex items-center">
          <TrendingUp className="h-3 w-3 mr-1" />
          KPI Widget
        </h5>
        <div
          className={`p-3 rounded-lg border cursor-pointer transition-all ${
            selectedWidgets.includes(kpiCardData.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => addWidget(kpiCardData.id)}
        >
          <div className="flex items-center space-x-2">
            <TrendingUp className={`h-4 w-4 ${selectedWidgets.includes(kpiCardData.id) ? 'text-blue-600' : 'text-gray-600'}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">{kpiCardData.title}</span>
                {!selectedWidgets.includes(kpiCardData.id) && (
                  <Plus className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="outline" className="text-xs">KPI</Badge>
                <span className="text-xs text-gray-500">{kpiCardData.description}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create Custom Report</h1>
              <p className="text-sm text-gray-600 mt-1">
                Build a custom report with your preferred metrics, filters, and visualizations
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={() => navigate('/financial-suite/custom-reports')}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button variant="outline" onClick={handlePreview}>
                <Play className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Main Content - Preview Area */}
        <div className="flex-1 overflow-auto min-w-0">
          <div className="p-4 lg:p-6 max-w-full">
            {/* Report Details */}
            <Card className="p-4 lg:p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Report Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Report Name
                  </label>
                  <input
                    type="text"
                    value={reportName}
                    onChange={(e) => setReportName(e.target.value)}
                    placeholder="Enter report name..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={reportDescription}
                    onChange={(e) => setReportDescription(e.target.value)}
                    placeholder="Describe what this report shows..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                  />
                </div>
              </div>
            </Card>

            {/* Report Preview */}
            <div className="max-w-full overflow-hidden">
              {renderPreviewSection()}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Component Selection */}
        <div className="w-80 xl:w-96 bg-white border-l border-gray-200 overflow-auto flex-shrink-0">
          <div className="p-4 lg:p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Build Your Report</h3>
            
            {/* Tabs */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex flex-wrap">
                {[
                  { id: 'metrics', label: 'Metrics', icon: Target },
                  { id: 'filters', label: 'Filters', icon: Filter },
                  { id: 'groupby', label: 'Group By', icon: Layers },
                  { id: 'charts', label: 'Charts', icon: BarChart3 },
                  { id: 'widgets', label: 'Widgets', icon: Target }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-2 px-2 lg:px-3 mr-1 lg:mr-2 mb-2 border-b-2 font-medium text-xs flex items-center space-x-1 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="h-3 w-3" />
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="min-w-0">
              {activeTab === 'metrics' && renderMetricsPanel()}
              {activeTab === 'filters' && renderFiltersPanel()}
              {activeTab === 'groupby' && renderGroupByPanel()}
              {activeTab === 'charts' && renderChartsPanel()}
              {activeTab === 'widgets' && renderWidgetsPanel()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
