import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { SearchInput } from '../components/ui/SearchInput';
import { ModuleCard } from '../components/education/ModuleCard';
import { useEducation } from '../context/EducationContext';
import { GraduationCap, Search, Filter } from 'lucide-react';

export const EducationPage: React.FC = () => {
  const navigate = useNavigate();
  const { 
    getFilteredModules, 
    searchTerm, 
    setSearchTerm, 
    difficultyFilter, 
    setDifficultyFilter,
    setCurrentModule 
  } = useEducation();

  const filteredModules = getFilteredModules();

  const handleStartModule = (moduleId: string) => {
    setCurrentModule(moduleId);
    navigate(`/education/${moduleId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Education Center</h1>
            <p className="text-gray-600">Learn about sales metrics and payment processing</p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchInput
              placeholder="Search modules..."
              value={searchTerm}
              onChange={setSearchTerm}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={difficultyFilter}
              onChange={(e) => setDifficultyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onStart={handleStartModule}
          />
        ))}
      </div>

      {filteredModules.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No modules found</h3>
          <p className="text-gray-600">
            Try adjusting your search terms or filters to find relevant modules.
          </p>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {filteredModules.length}
          </div>
          <div className="text-sm text-gray-600">Available Modules</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">
            {filteredModules.reduce((total, module) => total + module.sections.length, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Sections</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {filteredModules.reduce((total, module) => total + module.faqs.length, 0)}
          </div>
          <div className="text-sm text-gray-600">FAQ Items</div>
        </Card>
      </div>
    </div>
  );
};
