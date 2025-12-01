import React, { useState, useEffect } from 'react';
import { Calculator, CheckCircle, AlertCircle, HelpCircle, DollarSign, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { CalculatorScenario, CalculationStep } from '../../types/education';

interface InteractiveCalculatorProps {
  scenario: CalculatorScenario;
  onComplete?: (results: any) => void;
  className?: string;
}

export function InteractiveCalculator({ scenario, onComplete, className = '' }: InteractiveCalculatorProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userInputs, setUserInputs] = useState<Record<string, number>>({});
  const [stepResults, setStepResults] = useState<Record<number, number>>({});
  const [showHints, setShowHints] = useState(false);
  const [showTransactions, setShowTransactions] = useState(false);
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    step: number;
    inputs: Record<string, number>;
    result: number;
    formula: string;
  }>>([]);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const currentStepData = scenario.steps[currentStep];
  const isLastStep = currentStep === scenario.steps.length - 1;

  // Initialize inputs with default values if provided
  useEffect(() => {
    if (currentStepData?.inputFields) {
      const defaultInputs: Record<string, number> = {};
      currentStepData.inputFields.forEach(field => {
        if (field.value !== undefined) {
          defaultInputs[field.name] = field.value;
        }
      });
      setUserInputs(defaultInputs);
    }
  }, [currentStep, currentStepData]);

  const handleInputChange = (fieldName: string, value: string) => {
    const numValue = parseFloat(value) || 0;
    setUserInputs(prev => ({
      ...prev,
      [fieldName]: numValue
    }));
  };

  const calculateStepResult = () => {
    let result = 0;
    const inputs = userInputs;
    
    // Enhanced calculation logic based on step type and scenario
    switch (currentStepData.id) {
      case 'step1': // Gross Sales
        result = (inputs.itemSales || 0) + (inputs.serviceCharges || 0);
        break;
      case 'step2': // Net Sales
        result = (inputs.grossSales || 0) - (inputs.discounts || 0) - (inputs.comps || 0) - (inputs.returns || 0);
        break;
      case 'step3': // Total Sales
        result = (inputs.netSales || 0) + (inputs.taxes || 0) + (inputs.tips || 0) + (inputs.giftCards || 0) - (inputs.refunds || 0);
        break;
      default:
        // Generic calculation based on formula
        if (currentStepData.formula.includes('-')) {
          const values = Object.values(inputs);
          result = values[0] || 0;
          for (let i = 1; i < values.length; i++) {
            result -= values[i] || 0;
          }
        } else {
          result = Object.values(inputs).reduce((sum, val) => sum + val, 0);
        }
    }
    
    setStepResults(prev => ({
      ...prev,
      [currentStep]: result
    }));

    // Add to calculation history
    setCalculationHistory(prev => [...prev, {
      step: currentStep,
      inputs: { ...inputs },
      result,
      formula: currentStepData.formula
    }]);

    return result;
  };

  const handleNextStep = () => {
    const result = calculateStepResult();
    setCompletedSteps(prev => new Set([...prev, currentStep]));
    
    if (isLastStep) {
      // Compare with expected results
      const finalResults = {
        ...stepResults,
        [currentStep]: result
      };
      onComplete?.(finalResults);
    } else {
      setCurrentStep(prev => prev + 1);
      // Carry forward relevant values to next step
      const nextStepData = scenario.steps[currentStep + 1];
      if (nextStepData?.inputFields) {
        const nextInputs: Record<string, number> = {};
        nextStepData.inputFields.forEach(field => {
          if (field.name === 'grossSales' && currentStep === 0) {
            nextInputs[field.name] = result;
          } else if (field.name === 'netSales' && currentStep === 1) {
            nextInputs[field.name] = result;
          } else if (field.value !== undefined) {
            nextInputs[field.name] = field.value;
          }
        });
        setUserInputs(nextInputs);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      // Restore previous step inputs
      const prevHistory = calculationHistory.find(h => h.step === currentStep - 1);
      if (prevHistory) {
        setUserInputs(prevHistory.inputs);
      }
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getBusinessTypeIcon = () => {
    switch (scenario.businessType) {
      case 'restaurant':
        return '🍽️';
      case 'retail':
        return '🛍️';
      case 'service':
        return '⚙️';
      default:
        return '💼';
    }
  };

  const getLiveCalculationPreview = () => {
    const inputs = Object.values(userInputs);
    if (inputs.length === 0) return 0;

    switch (currentStepData.id) {
      case 'step1':
        return (userInputs.itemSales || 0) + (userInputs.serviceCharges || 0);
      case 'step2':
        return (userInputs.grossSales || 0) - (userInputs.discounts || 0) - (userInputs.comps || 0) - (userInputs.returns || 0);
      case 'step3':
        return (userInputs.netSales || 0) + (userInputs.taxes || 0) + (userInputs.tips || 0) + (userInputs.giftCards || 0) - (userInputs.refunds || 0);
      default:
        if (currentStepData.formula.includes('-')) {
          return inputs[0] - inputs.slice(1).reduce((sum, val) => sum + val, 0);
        }
        return inputs.reduce((sum, val) => sum + val, 0);
    }
  };

  const getExpectedResultForComparison = () => {
    switch (currentStep) {
      case 0:
        return scenario.expectedResults.grossSales;
      case 1:
        return scenario.expectedResults.netSales;
      case 2:
        return scenario.expectedResults.totalSales;
      default:
        return 0;
    }
  };

  const isInputValid = () => {
    if (!currentStepData.interactive || !currentStepData.inputFields) return true;
    return currentStepData.inputFields.some(field => userInputs[field.name] > 0);
  };

  return (
    <div className={`bg-white rounded-lg shadow-lg border border-gray-200 p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Calculator className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{scenario.title}</h3>
              <span className="text-2xl">{getBusinessTypeIcon()}</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {scenario.region}
              </span>
            </div>
            <p className="text-gray-600">{scenario.description}</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowTransactions(!showTransactions)}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          {showTransactions ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          {showTransactions ? 'Hide' : 'Show'} Sample Data
        </button>
      </div>

      {/* Sample Transactions */}
      {showTransactions && (
        <div className="mb-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            📊 Sample Transactions
            <span className="text-sm text-gray-500">({scenario.businessType} • {scenario.region})</span>
          </h4>
          <div className="space-y-2">
            {scenario.sampleTransactions.map((txn) => (
              <div key={txn.id} className="flex justify-between items-center text-sm bg-white p-3 rounded border">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    txn.type === 'sale' ? 'bg-green-500' :
                    txn.type === 'refund' ? 'bg-red-500' :
                    txn.type === 'tax' ? 'bg-blue-500' :
                    txn.type === 'tip' ? 'bg-yellow-500' :
                    'bg-purple-500'
                  }`}></span>
                  <span className="font-medium">{txn.description}</span>
                  {txn.staff && <span className="text-gray-500">({txn.staff})</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-medium ${txn.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(txn.amount)}
                  </span>
                  <span className="text-gray-400 text-xs capitalize">{txn.type.replace('_', ' ')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep + 1} of {scenario.steps.length}</span>
          <span>{Math.round(((currentStep + 1) / scenario.steps.length) * 100)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / scenario.steps.length) * 100}%` }}
          />
        </div>
        
        {/* Step indicators */}
        <div className="flex justify-between mt-2">
          {scenario.steps.map((_, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-3 h-3 rounded-full ${
                completedSteps.has(index) ? 'bg-green-500' :
                index === currentStep ? 'bg-purple-500' :
                'bg-gray-300'
              }`} />
              {completedSteps.has(index) && (
                <CheckCircle className="h-3 w-3 text-green-500 -ml-3" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current Step */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
          {currentStepData.title}
          {completedSteps.has(currentStep) && <CheckCircle className="h-5 w-5 text-green-500" />}
        </h4>
        <p className="text-gray-600 mb-4">{currentStepData.description}</p>
        
        {/* Formula Display */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-purple-600" />
            <span className="text-sm font-medium text-gray-700">Formula:</span>
          </div>
          <code className="text-purple-600 font-mono text-lg font-semibold">
            {currentStepData.formula}
          </code>
        </div>

        {/* Input Fields */}
        {currentStepData.interactive && currentStepData.inputFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {currentStepData.inputFields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {field.name.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </label>
                <div className="relative">
                  {field.type === 'currency' && (
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                  )}
                  <input
                    type="number"
                    step="0.01"
                    placeholder={field.placeholder}
                    value={userInputs[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors ${
                      field.type === 'currency' ? 'pl-8' : ''
                    }`}
                  />
                </div>
                {field.value !== undefined && (
                  <p className="text-xs text-gray-500">
                    Suggested: {field.type === 'currency' ? formatCurrency(field.value) : field.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Live Calculation Preview */}
        {currentStepData.interactive && Object.keys(userInputs).length > 0 && (
          <div className="bg-green-50 rounded-lg p-4 mb-4 border border-green-200">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Live Calculation:</span>
            </div>
            <div className="text-green-800 font-mono">
              {Object.entries(userInputs).map(([key, value], index) => (
                <span key={key}>
                  {formatCurrency(value)}
                  {index < Object.entries(userInputs).length - 1 && 
                    (currentStepData.formula.includes('-') && index === 0 ? ' - ' : ' + ')
                  }
                </span>
              ))}
              <span className="font-bold ml-2 text-lg">
                = {formatCurrency(getLiveCalculationPreview())}
              </span>
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
          <div className="flex items-start gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-800 text-sm mb-2">{currentStepData.explanation}</p>
              <div className="text-xs text-blue-600">
                💡 <strong>Business Context:</strong> This calculation is essential for {scenario.businessType} businesses to understand their {currentStepData.title.toLowerCase()}.
              </div>
            </div>
          </div>
        </div>

        {/* Regional Notes */}
        {currentStepData.regionalNotes && currentStepData.regionalNotes.length > 0 && (
          <div className="bg-yellow-50 rounded-lg p-4 mb-4 border border-yellow-200">
            <h5 className="font-medium text-yellow-800 mb-2 flex items-center gap-1">
              🌍 Regional Notes:
            </h5>
            {currentStepData.regionalNotes.map((note, index) => (
              <div key={index} className="text-sm text-yellow-700 mb-1">
                <strong>{note.region}:</strong> {note.note}
              </div>
            ))}
          </div>
        )}

        {/* Calculation History */}
        {calculationHistory.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
            <h5 className="font-medium text-gray-800 mb-2 flex items-center gap-1">
              📈 Previous Steps:
            </h5>
            <div className="space-y-1">
              {calculationHistory.map((history, index) => (
                <div key={index} className="text-sm text-gray-600 flex justify-between">
                  <span><strong>Step {history.step + 1}:</strong> {scenario.steps[history.step].title}</span>
                  <span className="font-mono">{formatCurrency(history.result)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevStep}
          disabled={currentStep === 0}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous
        </button>

        <div className="flex gap-2">
          <button
            onClick={() => setShowHints(!showHints)}
            className="px-4 py-2 text-purple-600 hover:text-purple-800 transition-colors"
          >
            {showHints ? 'Hide' : 'Show'} Hints
          </button>
          
          <button
            onClick={handleNextStep}
            disabled={currentStepData.interactive && !isInputValid()}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {isLastStep ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Complete Calculator
              </>
            ) : (
              'Next Step →'
            )}
          </button>
        </div>
      </div>

      {/* Hints */}
      {showHints && scenario.commonMistakes && (
        <div className="mt-6 bg-red-50 rounded-lg p-4 border border-red-200">
          <h5 className="font-medium text-red-800 mb-3 flex items-center gap-1">
            💡 Common Mistakes to Avoid:
          </h5>
          <div className="space-y-3">
            {scenario.commonMistakes.map((mistake, index) => (
              <div key={index} className="text-sm text-red-700 bg-white rounded p-3 border border-red-100">
                <div className="font-medium text-red-800 mb-1">❌ {mistake.mistake}</div>
                <div className="mb-1"><strong>Why this happens:</strong> {mistake.explanation}</div>
                <div><strong>✅ Correct approach:</strong> {mistake.correctApproach}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Expected Results Comparison (shown after completion) */}
      {isLastStep && stepResults[currentStep] && (
        <div className="mt-6 bg-green-50 rounded-lg p-4 border border-green-200">
          <h5 className="font-medium text-green-800 mb-3 flex items-center gap-1">
            📊 Expected vs Your Results:
          </h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-white p-3 rounded border">
              <strong className="text-green-700">Your Calculation:</strong>
              <div className="text-green-700 font-mono text-lg">{formatCurrency(stepResults[currentStep])}</div>
            </div>
            <div className="bg-white p-3 rounded border">
              <strong className="text-green-700">Expected Result:</strong>
              <div className="text-green-700 font-mono text-lg">{formatCurrency(getExpectedResultForComparison())}</div>
            </div>
          </div>
          {Math.abs(stepResults[currentStep] - getExpectedResultForComparison()) < 0.01 ? (
            <div className="mt-3 flex items-center gap-2 text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Perfect! Your calculation matches the expected result.</span>
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 text-yellow-800">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">Review your inputs - there's a small difference from the expected result.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
