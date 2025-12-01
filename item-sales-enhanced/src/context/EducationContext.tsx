import React, { createContext, useContext, useState, useCallback } from 'react';
import { EducationModule, PaymentScenario } from '../types/education';
import { educationModules, paymentScenarios } from '../data/mockEducationData';

interface EducationContextType {
  // Module Management
  modules: EducationModule[];
  currentModule: EducationModule | null;
  currentSectionId: string | null;
  
  // Navigation
  setCurrentModule: (moduleId: string) => void;
  setCurrentSection: (sectionId: string) => void;
  getNextSection: () => string | null;
  getPreviousSection: () => string | null;
  
  // Progress Tracking
  completedSections: Set<string>;
  markSectionComplete: (sectionId: string) => void;
  getModuleProgress: (moduleId: string) => number;
  
  // Calculator State
  calculatorInputs: Record<string, any>;
  updateCalculatorInput: (inputId: string, value: any) => void;
  calculateResult: (calculatorId: string) => Record<string, number>;
  
  // Scenarios
  scenarios: PaymentScenario[];
  selectedScenario: PaymentScenario | null;
  setSelectedScenario: (scenarioId: string) => void;
  
  // Search and Filter
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (difficulty: string) => void;
  getFilteredModules: () => EducationModule[];
}

const EducationContext = createContext<EducationContextType | undefined>(undefined);

export const useEducation = () => {
  const context = useContext(EducationContext);
  if (context === undefined) {
    throw new Error('useEducation must be used within an EducationProvider');
  }
  return context;
};

interface EducationProviderProps {
  children: React.ReactNode;
}

export const EducationProvider: React.FC<EducationProviderProps> = ({ children }) => {
  const [currentModule, setCurrentModuleState] = useState<EducationModule | null>(null);
  const [currentSectionId, setCurrentSectionId] = useState<string | null>(null);
  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());
  const [calculatorInputs, setCalculatorInputs] = useState<Record<string, any>>({});
  const [selectedScenario, setSelectedScenarioState] = useState<PaymentScenario | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  const setCurrentModule = useCallback((moduleId: string) => {
    const module = educationModules.find(m => m.id === moduleId);
    if (module) {
      setCurrentModuleState(module);
      setCurrentSectionId(module.sections[0]?.id || null);
    }
  }, []);

  const setCurrentSection = useCallback((sectionId: string) => {
    setCurrentSectionId(sectionId);
  }, []);

  const getNextSection = useCallback(() => {
    if (!currentModule || !currentSectionId) return null;
    
    const currentIndex = currentModule.sections.findIndex(s => s.id === currentSectionId);
    if (currentIndex < currentModule.sections.length - 1) {
      return currentModule.sections[currentIndex + 1].id;
    }
    return null;
  }, [currentModule, currentSectionId]);

  const getPreviousSection = useCallback(() => {
    if (!currentModule || !currentSectionId) return null;
    
    const currentIndex = currentModule.sections.findIndex(s => s.id === currentSectionId);
    if (currentIndex > 0) {
      return currentModule.sections[currentIndex - 1].id;
    }
    return null;
  }, [currentModule, currentSectionId]);

  const markSectionComplete = useCallback((sectionId: string) => {
    setCompletedSections(prev => new Set(prev).add(sectionId));
  }, []);

  const getModuleProgress = useCallback((moduleId: string) => {
    const module = educationModules.find(m => m.id === moduleId);
    if (!module) return 0;
    
    const completedCount = module.sections.filter(s => completedSections.has(s.id)).length;
    return (completedCount / module.sections.length) * 100;
  }, [completedSections]);

  const updateCalculatorInput = useCallback((inputId: string, value: any) => {
    setCalculatorInputs(prev => ({
      ...prev,
      [inputId]: value
    }));
  }, []);

  const calculateResult = useCallback((calculatorId: string) => {
    const results: Record<string, number> = {};
    
    // Find calculator configuration
    const calculator = educationModules
      .flatMap(m => m.sections)
      .find(s => s.calculator?.id === calculatorId)?.calculator;
    
    if (!calculator) return results;

    // Calculate outputs based on inputs
    calculator.outputs.forEach(output => {
      let result = 0;
      
      // Enhanced formula evaluation
      try {
        let formula = output.formula;
        
        // Replace input IDs with actual values
        calculator.inputs.forEach(input => {
          const value = calculatorInputs[input.id] || input.defaultValue || 0;
          formula = formula.replace(new RegExp(input.id, 'g'), String(value));
        });
        
        // Handle basic arithmetic operations
        if (formula.includes('+') || formula.includes('-') || formula.includes('*') || formula.includes('/')) {
          // Simple evaluation for basic arithmetic
          // Remove spaces and evaluate
          formula = formula.replace(/\s/g, '');
          
          // For safety, only allow numbers, operators, and parentheses
          if (/^[0-9+\-*/.() ]+$/.test(formula)) {
            result = Function('"use strict"; return (' + formula + ')')();
          }
        } else {
          // Direct input mapping
          result = calculatorInputs[output.formula] || 0;
        }
      } catch (error) {
        console.error('Error calculating result:', error);
        result = 0;
      }
      
      results[output.id] = result;
    });
    
    return results;
  }, [calculatorInputs]);

  const setSelectedScenario = useCallback((scenarioId: string) => {
    const scenario = paymentScenarios.find(s => s.id === scenarioId);
    setSelectedScenarioState(scenario || null);
  }, []);

  const getFilteredModules = useCallback(() => {
    return educationModules.filter(module => {
      const matchesSearch = searchTerm === '' || 
        module.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        module.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDifficulty = difficultyFilter === '' || 
        module.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });
  }, [searchTerm, difficultyFilter]);

  const value: EducationContextType = {
    modules: educationModules,
    currentModule,
    currentSectionId,
    setCurrentModule,
    setCurrentSection,
    getNextSection,
    getPreviousSection,
    completedSections,
    markSectionComplete,
    getModuleProgress,
    calculatorInputs,
    updateCalculatorInput,
    calculateResult,
    scenarios: paymentScenarios,
    selectedScenario,
    setSelectedScenario,
    searchTerm,
    setSearchTerm,
    difficultyFilter,
    setDifficultyFilter,
    getFilteredModules
  };

  return (
    <EducationContext.Provider value={value}>
      {children}
    </EducationContext.Provider>
  );
};
