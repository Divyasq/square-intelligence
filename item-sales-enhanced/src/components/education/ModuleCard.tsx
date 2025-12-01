import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import { EducationModule } from '../../types/education';
import { useEducation } from '../../context/EducationContext';

interface ModuleCardProps {
  module: EducationModule;
  onStart: (moduleId: string) => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, onStart }) => {
  const { getModuleProgress } = useEducation();
  const progress = getModuleProgress(module.id);
  const isCompleted = progress === 100;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <Badge className={getDifficultyColor(module.difficulty)}>
            {module.difficulty}
          </Badge>
        </div>
        {isCompleted && (
          <CheckCircle2 className="h-5 w-5 text-green-600" />
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {module.title}
      </h3>
      
      <p className="text-gray-600 mb-4 line-clamp-2">
        {module.description}
      </p>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          {module.duration}
        </div>
        <div className="text-sm text-gray-500">
          {module.sections.length} sections
        </div>
      </div>

      {progress > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progress</span>
            <span className="text-gray-900 font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <Button 
        onClick={() => onStart(module.id)}
        className="w-full"
        variant={progress > 0 ? 'outline' : 'default'}
      >
        {progress === 0 ? 'Start Module' : progress === 100 ? 'Review' : 'Continue'}
      </Button>
    </Card>
  );
};
