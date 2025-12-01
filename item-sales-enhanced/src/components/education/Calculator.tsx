import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Calculator as CalculatorIcon, DollarSign } from 'lucide-react';
import { Calculator as CalculatorType } from '../../types/education';
import { useEducation } from '../../context/EducationContext';

interface CalculatorProps {
  calculator: CalculatorType;
}

export const Calculator: React.FC<CalculatorProps> = ({ calculator }) => {
  const { calculatorInputs, updateCalculatorInput, calculateResult } = useEducation();
  const [results, setResults] = useState<Record<string, number>>({});

  const handleInputChange = (inputId: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    updateCalculatorInput(inputId, numValue);
  };

  const handleCalculate = () => {
    const newResults = calculateResult(calculator.id);
    setResults(newResults);
  };

  const formatValue = (value: number, format: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value);
      case 'percentage':
        return `${value.toFixed(2)}%`;
      default:
        return value.toFixed(2);
    }
  };

  return (
    <Card className="p-6 bg-blue-50 border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <CalculatorIcon className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-blue-900">Interactive Calculator</h3>
      </div>

      <div className="space-y-4 mb-6">
        {calculator.inputs.map((input) => (
          <div key={input.id}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {input.label}
            </label>
            {input.type === 'number' && (
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="number"
                  placeholder={input.placeholder}
                  defaultValue={input.defaultValue}
                  className="pl-10"
                  onChange={(e) => handleInputChange(input.id, e.target.value)}
                />
              </div>
            )}
            {input.type === 'select' && (
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleInputChange(input.id, e.target.value)}
              >
                {input.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      <Button onClick={handleCalculate} className="w-full mb-4">
        Calculate
      </Button>

      {Object.keys(results).length > 0 && (
        <div className="space-y-3 pt-4 border-t border-blue-200">
          <h4 className="font-medium text-blue-900">Results:</h4>
          {calculator.outputs.map((output) => (
            <div key={output.id} className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-medium text-gray-700">{output.label}:</span>
              <span className="text-lg font-bold text-blue-600">
                {formatValue(results[output.id] || 0, output.format)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
