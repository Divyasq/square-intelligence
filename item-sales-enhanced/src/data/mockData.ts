import { Component, ComponentCategory } from '../types/component';
import { PerformanceDashboardDemo } from '../components/demos/PerformanceDashboardDemo';
import { ItemsTableDemo } from '../components/demos/ItemsTableDemo';
import { AlertDemo } from '../components/demos/AlertDemo';
import { EmptyStateDemo } from '../components/demos/EmptyStateDemo';
import { ProductFormDemo } from '../components/demos/ProductFormDemo';
import { LeftNavDemo } from '../components/demos/LeftNavDemo';

export const mockComponents: Component[] = [
  {
    id: 'performance-dashboard',
    name: 'Performance Dashboard',
    description: 'A comprehensive dashboard showing key business metrics, customer data, payment types, and sales analytics',
    category: 'dashboard',
    tags: ['dashboard', 'analytics', 'metrics', 'performance', 'sales', 'customers'],
    component: PerformanceDashboardDemo
  },
  {
    id: 'items-table',
    name: 'Items Table',
    description: 'A comprehensive table for managing inventory items with search, filtering, and bulk actions',
    category: 'table',
    tags: ['table', 'inventory', 'items', 'search', 'filter', 'crud'],
    component: ItemsTableDemo
  },
  {
    id: 'alert',
    name: 'Alert',
    description: 'A flexible alert component for displaying important messages with optional actions and dismiss functionality',
    category: 'feedback',
    tags: ['alert', 'notification', 'message', 'dismissable', 'info'],
    component: AlertDemo
  },
  {
    id: 'empty-state',
    name: 'Empty State',
    description: 'A component for displaying empty states with optional actions to guide users',
    category: 'feedback',
    tags: ['empty', 'state', 'placeholder', 'no-data', 'actions'],
    component: EmptyStateDemo
  },
  {
    id: 'product-form',
    name: 'Product Form',
    description: 'A comprehensive form for creating and editing product information with image upload, categorization, and detailed specifications',
    category: 'forms',
    tags: ['form', 'product', 'input', 'validation', 'upload', 'ecommerce', 'inventory'],
    component: ProductFormDemo
  },
  {
    id: 'left-nav',
    name: 'Left Navigation',
    description: 'A sliding navigation component with smooth left-to-right and right-to-left animations for menu transitions',
    category: 'navigation',
    tags: ['navigation', 'menu', 'sidebar', 'sliding', 'animation', 'submenu'],
    component: LeftNavDemo
  }
];

export const mockCategories: ComponentCategory[] = [
  {
    id: 'all',
    name: 'All Components',
    description: 'Browse all available components',
    icon: 'layout-grid',
    components: mockComponents
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Analytics and reporting dashboard components',
    icon: 'bar-chart-3',
    components: mockComponents.filter(c => c.category === 'dashboard')
  },
  {
    id: 'table',
    name: 'Tables',
    description: 'Data table and list components',
    icon: 'table',
    components: mockComponents.filter(c => c.category === 'table')
  },
  {
    id: 'feedback',
    name: 'Feedback',
    description: 'User feedback and state components',
    icon: 'message-circle',
    components: mockComponents.filter(c => c.category === 'feedback')
  },
  {
    id: 'forms',
    name: 'Forms',
    description: 'Form components for data input and collection',
    icon: 'file-text',
    components: mockComponents.filter(c => c.category === 'forms')
  },
  {
    id: 'navigation',
    name: 'Navigation',
    description: 'Navigation and menu components',
    icon: 'menu',
    components: mockComponents.filter(c => c.category === 'navigation')
  }
];