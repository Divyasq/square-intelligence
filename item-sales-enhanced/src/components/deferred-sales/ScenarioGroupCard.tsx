import React from 'react';
import { ScenarioGroup } from '../../types/deferredSales';
import { Card } from '../ui/Card';
import { ChevronRight } from 'lucide-react';

interface ScenarioGroupCardProps {
  group: ScenarioGroup;
  onSelect: (group: ScenarioGroup) => void;
}

export function ScenarioGroupCard({ group, onSelect }: ScenarioGroupCardProps) {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer" onClick={() => onSelect(group)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{group.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{group.description}</p>
          <div className="text-sm text-blue-600">
            {group.scenarios.length} scenario{group.scenarios.length !== 1 ? 's' : ''}
          </div>
        </div>
        <ChevronRight className="h-5 w-5 text-gray-400" />
      </div>
    </Card>
  );
}
