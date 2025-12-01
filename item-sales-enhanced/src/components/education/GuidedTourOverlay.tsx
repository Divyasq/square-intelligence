import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useEducation } from '../../context/EducationContext';
import { cn } from '../../utils/cn';

export function GuidedTourOverlay() {
  const { state, nextTourStep, skipTour } = useEducation();
  const { activeTour, currentTourStep } = state;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTour && currentTourStep !== undefined) {
      const currentStep = activeTour.steps[currentTourStep];
      if (currentStep && currentStep.target) {
        const targetElement = document.querySelector(currentStep.target);
        if (targetElement) {
          // Scroll target into view
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          
          // Add highlight class
          if (currentStep.highlightElement) {
            targetElement.classList.add('tour-highlight');
          }
        }
      }
    }

    // Cleanup function
    return () => {
      const highlightedElements = document.querySelectorAll('.tour-highlight');
      highlightedElements.forEach(el => el.classList.remove('tour-highlight'));
    };
  }, [activeTour, currentTourStep]);

  if (!activeTour || currentTourStep === undefined) {
    return null;
  }

  const currentStep = activeTour.steps[currentTourStep];
  const isLastStep = currentTourStep === activeTour.steps.length - 1;
  const isFirstStep = currentTourStep === 0;

  const getTooltipPosition = () => {
    const targetElement = document.querySelector(currentStep.target);
    if (!targetElement) return { top: '50%', left: '50%' };

    const rect = targetElement.getBoundingClientRect();
    const position = currentStep.position;

    switch (position) {
      case 'top':
        return {
          top: `${rect.top - 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: `${rect.bottom + 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - 20}px`,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + 20}px`,
          transform: 'translate(0, -50%)'
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  const tooltipStyle = getTooltipPosition();

  return (
    <>
      {/* Overlay backdrop */}
      <div 
        ref={overlayRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-40 tour-overlay"
        onClick={skipTour}
      />

      {/* Tooltip */}
      <div
        className="fixed z-50 max-w-sm"
        style={tooltipStyle}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {currentStep.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">
                  Step {currentTourStep + 1} of {activeTour.steps.length}
                </span>
                <div className="flex gap-1">
                  {activeTour.steps.map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full",
                        index === currentTourStep ? "bg-purple-600" : "bg-gray-300"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={skipTour}
              className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              {currentStep.content}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {currentStep.showSkip !== false && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={skipTour}
                  className="text-gray-500 hover:text-gray-700"
                >
                  Skip Tour
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              {!isFirstStep && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Go to previous step (would need to implement this)
                  }}
                  className="gap-1"
                >
                  <ArrowLeft className="h-3 w-3" />
                  Back
                </Button>
              )}
              <Button
                onClick={nextTourStep}
                size="sm"
                className="bg-purple-600 hover:bg-purple-700 gap-1"
              >
                {isLastStep ? 'Finish' : 'Next'}
                {!isLastStep && <ArrowRight className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Tooltip arrow */}
        <div className={cn(
          "absolute w-3 h-3 bg-white border transform rotate-45",
          currentStep.position === 'top' && "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 border-b-0 border-r-0",
          currentStep.position === 'bottom' && "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 border-t-0 border-l-0",
          currentStep.position === 'left' && "left-full top-1/2 -translate-y-1/2 -translate-x-1/2 border-t-0 border-r-0",
          currentStep.position === 'right' && "right-full top-1/2 -translate-y-1/2 translate-x-1/2 border-b-0 border-l-0"
        )} />
      </div>

      {/* Custom styles for highlighting */}
      <style jsx>{`
        .tour-highlight {
          position: relative;
          z-index: 45;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.3);
          border-radius: 8px;
        }
        
        .tour-overlay {
          pointer-events: auto;
        }
        
        .tour-highlight {
          pointer-events: none;
        }
      `}</style>
    </>
  );
}
