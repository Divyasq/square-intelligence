import React from 'react';
import { SalesScenario } from '../../types/deferredSales';
import { Card } from '../ui/Card';

interface ScenarioCardProps {
  scenario: SalesScenario;
  isSelected: boolean;
  onSelect: (scenario: SalesScenario) => void;
}

export function ScenarioCard({ scenario, isSelected, onSelect }: ScenarioCardProps) {
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all ${
        isSelected 
          ? 'border-blue-500 bg-blue-50 shadow-md' 
          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
      }`}
      onClick={() => onSelect(scenario)}
    >
      <h4 className={`font-medium mb-2 ${isSelected ? 'text-blue-900' : 'text-gray-900'}`}>
        {scenario.title}
      </h4>
      <p className={`text-sm ${isSelected ? 'text-blue-700' : 'text-gray-600'}`}>
        {scenario.description}
      </p>
    </Card>
  );
}
