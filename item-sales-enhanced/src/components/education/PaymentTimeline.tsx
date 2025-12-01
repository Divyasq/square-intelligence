import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Clock, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PaymentScenario } from '../../types/education';

interface PaymentTimelineProps {
  scenarios: PaymentScenario[];
  selectedScenario?: PaymentScenario | null;
  onSelectScenario?: (scenarioId: string) => void;
}

export const PaymentTimeline: React.FC<PaymentTimelineProps> = ({
  scenarios,
  selectedScenario,
  onSelectScenario
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Payment Processing Scenarios
      </h3>
      
      <div className="grid gap-4">
        {scenarios.map((scenario) => (
          <Card 
            key={scenario.id}
            className={`p-4 cursor-pointer transition-all ${
              selectedScenario?.id === scenario.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'hover:border-gray-300'
            }`}
            onClick={() => onSelectScenario?.(scenario.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold text-gray-900">{scenario.name}</h4>
                {scenario.isEdgeCase ? (
                  <Badge className="bg-orange-100 text-orange-800">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Edge Case
                  </Badge>
                ) : (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Standard
                  </Badge>
                )}
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-gray-700">Sale Reported:</span>
                </div>
                <span className="text-sm text-gray-900">{scenario.saleReportTime}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Payment Reported:</span>
                </div>
                <span className="text-sm text-gray-900">{scenario.paymentReportTime}</span>
              </div>
            </div>

            {selectedScenario?.id === scenario.id && (
              <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Explanation:</strong> {scenario.explanation}
                </p>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
