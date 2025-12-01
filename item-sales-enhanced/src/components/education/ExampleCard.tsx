import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Calculator, TrendingUp, ArrowRight } from 'lucide-react';
import { Example } from '../../types/education';

interface ExampleCardProps {
  example: Example;
  showCalculation?: boolean;
}

export const ExampleCard: React.FC<ExampleCardProps> = ({ 
  example, 
  showCalculation = true 
}) => {
  return (
    <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <Calculator className="h-5 w-5 text-green-600" />
        <h4 className="font-semibold text-green-900">{example.title}</h4>
      </div>

      <p className="text-gray-700 mb-4">{example.scenario}</p>

      {showCalculation && (
        <div className="space-y-3 mb-4">
          <h5 className="font-medium text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Calculation Steps:
          </h5>
          
          {example.calculation.map((step, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
              <div className="flex-1">
                <div className="font-medium text-gray-900">{step.label}</div>
                <div className="text-sm text-gray-600">{step.explanation}</div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800 font-mono">
                  {step.formula}
                </Badge>
                {index < example.calculation.length - 1 && (
                  <ArrowRight className="h-4 w-4 text-gray-400" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-green-200">
        <span className="font-semibold text-gray-900">Final Result:</span>
        <span className="text-xl font-bold text-green-600">{example.result}</span>
      </div>
    </Card>
  );
};
