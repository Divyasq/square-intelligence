import React from 'react';
import { GraduationCap, BookOpen, TrendingUp, Award } from 'lucide-react';
import { useEducation } from '../context/EducationContext';
import { ModuleGrid, FeaturedModuleCard } from '../components/education/ModuleCard';
import { ProgressIndicator } from '../components/education/ProgressIndicator';
import { GuidedTourOverlay } from '../components/education/GuidedTourOverlay';

export function EducationDashboard() {
  const { state, startTour } = useEducation();
  const { modules, userProgress, availablePaths } = state;

  const completedModuleIds = userProgress.completedModules.map(cm => cm.moduleId);
  const currentPath = availablePaths.find(path => path.id === userProgress.learningPath);
  
  // Get recommended next module
  const getNextRecommendedModule = () => {
    if (!currentPath) return null;
    
    for (const moduleId of currentPath.modules) {
      if (!completedModuleIds.includes(moduleId)) {
        const module = modules.find(m => m.id === moduleId);
        if (module) {
          // Check if prerequisites are met
          const prerequisitesMet = module.prerequisites.every(prereqId => 
            completedModuleIds.includes(prereqId)
          );
          if (prerequisitesMet) {
            return module;
          }
        }
      }
    }
    return null;
  };

  const nextModule = getNextRecommendedModule();
  const beginnerModules = modules.filter(m => m.difficulty === 'beginner');
  const intermediateModules = modules.filter(m => m.difficulty === 'intermediate');
  const advancedModules = modules.filter(m => m.difficulty === 'advanced');

  return (
    <div className="min-h-screen bg-gray-50">
      <GuidedTourOverlay />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <GraduationCap className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Seller Education</h1>
                <p className="text-gray-600 mt-1">
                  Master your reporting metrics and discover advanced features
                </p>
              </div>
            </div>
            
            <button
              onClick={() => startTour('reports-overview')}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Take a Tour
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning Section */}
            {nextModule && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Continue Learning</h2>
                </div>
                <FeaturedModuleCard module={nextModule} />
              </section>
            )}

            {/* Beginner Modules */}
            {beginnerModules.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    Beginner
                  </span>
                </div>
                <ModuleGrid 
                  modules={beginnerModules} 
                  completedModuleIds={completedModuleIds}
                />
              </section>
            )}

            {/* Intermediate Modules */}
            {intermediateModules.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <h2 className="text-xl font-semibold text-gray-900">Advanced Analysis</h2>
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    Intermediate
                  </span>
                </div>
                <ModuleGrid 
                  modules={intermediateModules} 
                  completedModuleIds={completedModuleIds}
                />
              </section>
            )}

            {/* Advanced Modules */}
            {advancedModules.length > 0 && (
              <section>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <h2 className="text-xl font-semibold text-gray-900">Business Optimization</h2>
                  <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                    Advanced
                  </span>
                </div>
                <ModuleGrid 
                  modules={advancedModules} 
                  completedModuleIds={completedModuleIds}
                />
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ProgressIndicator />

            {/* Learning Paths */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Learning Paths</h3>
              </div>
              
              <div className="space-y-3">
                {availablePaths.map((path) => (
                  <div 
                    key={path.id}
                    className={`p-3 rounded-lg border-2 transition-colors ${
                      path.id === userProgress.learningPath
                        ? 'border-purple-200 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{path.name}</h4>
                      <span className="text-xs text-gray-500">
                        {path.estimatedTotalTime} min
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{path.description}</p>
                    <div className="mt-2 text-xs text-gray-500">
                      {path.modules.length} modules • {path.difficulty}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Award className="h-5 w-5 text-yellow-600" />
                <h3 className="text-lg font-semibold text-gray-900">Quick Tips</h3>
              </div>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">💡</span>
                  <p>Complete modules in order to unlock advanced features</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">🔥</span>
                  <p>Learn something new daily to maintain your streak</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">🎯</span>
                  <p>Practice with the interactive calculators for better understanding</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-600 font-bold">📊</span>
                  <p>Apply what you learn to your actual reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
