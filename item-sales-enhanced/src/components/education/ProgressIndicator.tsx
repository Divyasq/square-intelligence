import React from 'react';
import { Trophy, Star, Flame, Calculator, Award } from 'lucide-react';
import { useEducation } from '../../context/EducationContext';
import { cn } from '../../utils/cn';

export function ProgressIndicator() {
  const { state } = useEducation();
  const { userProgress, availablePaths } = state;

  const currentPath = availablePaths.find(path => path.id === userProgress.learningPath);
  const completedModules = userProgress.completedModules.length;
  const totalModules = currentPath?.modules.length || 0;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  const getAchievementIcon = (category: string) => {
    switch (category) {
      case 'completion':
        return Star;
      case 'streak':
        return Flame;
      case 'mastery':
        return Calculator;
      default:
        return Award;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">
            {userProgress.achievements.length} achievements
          </span>
        </div>
      </div>

      {/* Learning Path Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            {currentPath?.name || 'Learning Path'}
          </span>
          <span className="text-sm text-gray-500">
            {completedModules} of {totalModules} modules
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {Math.round(progressPercentage)}% complete
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {userProgress.streakDays}
          </div>
          <div className="text-xs text-gray-500">Day Streak</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(userProgress.totalTimeSpent / 60)}
          </div>
          <div className="text-xs text-gray-500">Hours Learned</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {completedModules}
          </div>
          <div className="text-xs text-gray-500">Modules Done</div>
        </div>
      </div>

      {/* Recent Achievements */}
      {userProgress.achievements.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Recent Achievements</h4>
          <div className="space-y-2">
            {userProgress.achievements.slice(-3).map((achievement) => {
              const IconComponent = getAchievementIcon(achievement.icon);
              return (
                <div key={achievement.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="p-1.5 bg-yellow-100 rounded-full">
                    <IconComponent className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">
                      {achievement.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {achievement.description}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    {achievement.unlockedAt.toLocaleDateString()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Next Steps */}
      <div className="mt-6 p-4 bg-purple-50 rounded-lg">
        <h4 className="text-sm font-medium text-purple-900 mb-2">
          Keep Learning!
        </h4>
        <p className="text-sm text-purple-700">
          {progressPercentage === 100 
            ? "🎉 You've completed this learning path! Check out advanced topics."
            : `Complete ${totalModules - completedModules} more modules to finish your current path.`
          }
        </p>
      </div>
    </div>
  );
}

// Compact version for smaller spaces
export function CompactProgressIndicator() {
  const { state } = useEducation();
  const { userProgress, availablePaths } = state;

  const currentPath = availablePaths.find(path => path.id === userProgress.learningPath);
  const completedModules = userProgress.completedModules.length;
  const totalModules = currentPath?.modules.length || 0;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
          <Trophy className="h-4 w-4 text-purple-600" />
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">
            {completedModules}/{totalModules} modules
          </div>
          <div className="text-xs text-gray-500">
            {Math.round(progressPercentage)}% complete
          </div>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-purple-600 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center gap-1">
        <Flame className="h-4 w-4 text-orange-500" />
        <span className="text-sm font-medium text-gray-700">
          {userProgress.streakDays}
        </span>
      </div>
    </div>
  );
}
