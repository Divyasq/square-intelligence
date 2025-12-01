import React from 'react';
import { AlertTriangle, TrendingDown, DollarSign, Users } from 'lucide-react';
import { ActionCenterAlert } from '../../types/dashboard';
import { cn } from '../../utils/cn';

interface ActionCenterProps {
  alerts: ActionCenterAlert[];
  onAlertAction?: (alertId: string, action: string) => void;
  onDismiss?: (alertId: string) => void;
}

export function ActionCenter({ alerts, onAlertAction, onDismiss }: ActionCenterProps) {
  const getAlertIcon = (type: ActionCenterAlert['type']) => {
    switch (type) {
      case 'churn-risk':
        return <Users className="h-5 w-5" />;
      case 'comps-alert':
        return <AlertTriangle className="h-5 w-5" />;
      case 'cost-spike':
        return <TrendingDown className="h-5 w-5" />;
      case 'opportunity':
        return <DollarSign className="h-5 w-5" />;
      default:
        return <AlertTriangle className="h-5 w-5" />;
    }
  };

  const getSeverityStyles = (severity: ActionCenterAlert['severity']) => {
    switch (severity) {
      case 'high':
        return 'border-l-red-500 bg-red-50';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getIconStyles = (severity: ActionCenterAlert['severity']) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'low':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (!alerts || alerts.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            🧠 AI Action Center
            <span className="text-sm font-normal text-gray-500">0 AI Insights</span>
            <span className="text-sm font-normal text-gray-500">0 Alerts</span>
          </h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No active alerts or insights</p>
          <p className="text-sm">We'll notify you when something needs your attention</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          🧠 AI Action Center
          <span className="text-sm font-normal text-gray-500">{alerts.length} AI Insights</span>
          <span className="text-sm font-normal text-gray-500">{alerts.filter(a => a.severity === 'high').length} Alerts</span>
        </h3>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={cn(
              'border-l-4 rounded-lg p-4 relative',
              getSeverityStyles(alert.severity)
            )}
          >
            {/* Alert Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={cn('p-2 rounded-lg', getIconStyles(alert.severity))}>
                  {getAlertIcon(alert.type)}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                    {alert.title}
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                      Alert
                    </span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">
                    {alert.description}
                  </p>
                </div>
              </div>
              
              {/* Dismiss Button */}
              {onDismiss && (
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="text-gray-400 hover:text-gray-600 p-1"
                  aria-label="Dismiss alert"
                >
                  ×
                </button>
              )}
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-4 bg-white/60 rounded-lg p-3">
              {alert.metrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-xs text-gray-600 mb-1">{metric.label}</div>
                  <div className="font-semibold text-gray-900">{metric.value}</div>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                {alert.actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => onAlertAction?.(alert.id, action.action)}
                    className={cn(
                      'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      action.type === 'primary'
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    )}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
              
              <div className="text-xs text-gray-500">
                {alert.timestamp}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
