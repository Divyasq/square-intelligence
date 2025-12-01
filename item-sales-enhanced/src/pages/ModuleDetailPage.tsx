import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Calculator } from '../components/education/Calculator';
import { ExampleCard } from '../components/education/ExampleCard';
import { PaymentTimeline } from '../components/education/PaymentTimeline';
import { FAQSection } from '../components/education/FAQSection';
import { useEducation } from '../context/EducationContext';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  CheckCircle2,
  Clock,
  ArrowLeft 
} from 'lucide-react';

export const ModuleDetailPage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const {
    currentModule,
    currentSectionId,
    setCurrentModule,
    setCurrentSection,
    getNextSection,
    getPreviousSection,
    markSectionComplete,
    completedSections,
    scenarios,
    selectedScenario,
    setSelectedScenario
  } = useEducation();

  React.useEffect(() => {
    if (moduleId && (!currentModule || currentModule.id !== moduleId)) {
      setCurrentModule(moduleId);
    }
  }, [moduleId, currentModule, setCurrentModule]);

  if (!currentModule || !currentSectionId) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading module...</p>
        </div>
      </div>
    );
  }

  const currentSection = currentModule.sections.find(s => s.id === currentSectionId);
  const nextSectionId = getNextSection();
  const previousSectionId = getPreviousSection();
  const isCompleted = completedSections.has(currentSectionId);

  const handleNextSection = () => {
    if (!isCompleted) {
      markSectionComplete(currentSectionId);
    }
    if (nextSectionId) {
      setCurrentSection(nextSectionId);
    } else {
      // Module completed, go back to education page
      navigate('/education');
    }
  };

  const handlePreviousSection = () => {
    if (previousSectionId) {
      setCurrentSection(previousSectionId);
    }
  };

  if (!currentSection) {
    return <div>Section not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate('/education')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Education
        </Button>
        
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600">{currentModule.duration}</span>
        </div>
      </div>

      {/* Module Info */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{currentModule.title}</h1>
              <p className="text-gray-600">{currentModule.description}</p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-blue-800">
            {currentModule.difficulty}
          </Badge>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4">
          <div className="flex-1 bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${((currentModule.sections.findIndex(s => s.id === currentSectionId) + 1) / currentModule.sections.length) * 100}%` 
              }}
            />
          </div>
          <span className="text-sm text-gray-600">
            {currentModule.sections.findIndex(s => s.id === currentSectionId) + 1} of {currentModule.sections.length}
          </span>
        </div>
      </Card>

      {/* Section Navigation */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
          {currentModule.sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => setCurrentSection(section.id)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                section.id === currentSectionId
                  ? 'bg-white text-blue-600 shadow-sm'
                  : completedSections.has(section.id)
                  ? 'text-green-600 hover:bg-white'
                  : 'text-gray-600 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-2">
                {completedSections.has(section.id) && (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                <span>{index + 1}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Section Content */}
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{currentSection.title}</h2>
        
        <div className="prose max-w-none mb-8">
          <p className="text-gray-700 text-lg leading-relaxed">{currentSection.content}</p>
        </div>

        {/* Examples */}
        {currentSection.examples && currentSection.examples.length > 0 && (
          <div className="space-y-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-900">Examples</h3>
            {currentSection.examples.map((example) => (
              <ExampleCard key={example.id} example={example} />
            ))}
          </div>
        )}

        {/* Calculator */}
        {currentSection.calculator && (
          <div className="mb-8">
            <Calculator calculator={currentSection.calculator} />
          </div>
        )}

        {/* Payment Timeline for specific sections */}
        {currentSection.type === 'timeline' && (
          <div className="mb-8">
            <PaymentTimeline
              scenarios={scenarios}
              selectedScenario={selectedScenario}
              onSelectScenario={setSelectedScenario}
            />
          </div>
        )}
      </Card>

      {/* FAQ Section */}
      {currentModule.faqs && currentModule.faqs.length > 0 && (
        <Card className="p-8">
          <FAQSection faqs={currentModule.faqs} />
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={handlePreviousSection}
          disabled={!previousSectionId}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {!isCompleted && (
            <Button
              variant="outline"
              onClick={() => markSectionComplete(currentSectionId)}
              className="flex items-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4" />
              Mark Complete
            </Button>
          )}
          
          <Button
            onClick={handleNextSection}
            className="flex items-center gap-2"
          >
            {nextSectionId ? 'Next' : 'Complete Module'}
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
