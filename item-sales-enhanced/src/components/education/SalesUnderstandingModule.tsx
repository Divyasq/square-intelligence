import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock, CreditCard, DollarSign, Calendar, HelpCircle, ChevronDown, ChevronRight } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface AnimationStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  highlight: 'payment' | 'sale' | 'both';
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  scenario: string;
  isOpen?: boolean;
}

const animationSteps: AnimationStep[] = [
  {
    id: 'customer-action',
    title: 'Customer Makes Purchase',
    description: 'Customer initiates a transaction at your business',
    duration: 1000,
    highlight: 'both'
  },
  {
    id: 'payment-initiated',
    title: 'Payment Initiated',
    description: 'Payment processing begins - this is when Payments are reported',
    duration: 1500,
    highlight: 'payment'
  },
  {
    id: 'payment-processing',
    title: 'Payment Processing',
    description: 'Payment is being processed by the payment processor',
    duration: 2000,
    highlight: 'payment'
  },
  {
    id: 'payment-complete',
    title: 'Payment Complete',
    description: 'Payment is successfully processed - this is when Gross Sales are reported',
    duration: 1500,
    highlight: 'sale'
  },
  {
    id: 'summary',
    title: 'Summary',
    description: 'Payments are reported when initiated, Gross Sales when payment completes',
    duration: 2000,
    highlight: 'both'
  }
];

const faqData: FAQItem[] = [
  {
    id: 'midnight-window',
    question: 'Why do my sales and payments show different amounts for the same day?',
    answer: 'This happens when transactions cross the midnight boundary. If a payment is initiated before midnight but completes after midnight, the Payment will be reported on the first day and the Gross Sale will be reported on the second day.',
    scenario: '🕚 11:58 PM: Customer swipes card (Payment reported for Day 1)\n🕐 12:02 AM: Payment completes (Gross Sale reported for Day 2)'
  },
  {
    id: 'pre-auth',
    question: 'What are pre-authorization sales and how do they affect my reports?',
    answer: 'Pre-authorization (pre-auth) transactions reserve funds on a customer\'s card but don\'t complete the payment immediately. The Payment is reported when the pre-auth is initiated, but Gross Sales are only reported when the payment is actually completed (captured).',
    scenario: '📅 Monday: Hotel pre-authorizes $200 (Payment reported)\n📅 Wednesday: Guest checks out, final charge $180 (Gross Sale reported)\n\nResult: Payment shows Monday, Gross Sale shows Wednesday'
  },
  {
    id: 'processing-delays',
    question: 'Why might there be delays between payments and sales?',
    answer: 'Several factors can cause delays: network issues, bank processing times, weekend/holiday delays, or payment method differences. Card payments typically process faster than bank transfers.',
    scenario: '💳 Friday 3 PM: Card payment initiated (Payment reported Friday)\n🏦 Monday 9 AM: Bank completes processing (Gross Sale reported Monday)\n\nWeekend processing delays are common'
  },
  {
    id: 'refunds-impact',
    question: 'How do refunds affect the timing of sales vs payments?',
    answer: 'Refunds create negative entries. The original payment and sale maintain their original timing, but refunds are reported when they are processed, which may be on different days.',
    scenario: '📅 Day 1: $100 sale (Payment: $100, Gross Sale: $100)\n📅 Day 3: $30 refund processed\n\nDay 1 shows: Payment $100, Gross Sale $100\nDay 3 shows: Payment -$30, Gross Sale -$30'
  }
];

export function SalesUnderstandingModule() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [faqItems, setFaqItems] = useState<FAQItem[]>(
    faqData.map(item => ({ ...item, isOpen: false }))
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && currentStep < animationSteps.length) {
      const step = animationSteps[currentStep];
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + (100 / (step.duration / 100));
          if (newProgress >= 100) {
            if (currentStep < animationSteps.length - 1) {
              setCurrentStep(prev => prev + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return 100;
            }
          }
          return newProgress;
        });
      }, 100);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentStep]);

  const handlePlay = () => {
    if (currentStep >= animationSteps.length - 1 && progress >= 100) {
      // Reset if at the end
      setCurrentStep(0);
      setProgress(0);
    }
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const toggleFAQ = (id: string) => {
    setFaqItems(prev => prev.map(item => 
      item.id === id ? { ...item, isOpen: !item.isOpen } : item
    ));
  };

  const currentStepData = animationSteps[currentStep];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Understanding Your Sales</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn the difference between when Payments and Gross Sales are reported, 
          and why they might show different amounts on the same day.
        </p>
      </div>

      {/* Interactive Animation */}
      <Card className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Sales & Payments Timeline
          </h2>
          <p className="text-gray-600">
            Click play to see how payments and sales are reported at different times
          </p>
        </div>

        {/* Animation Controls */}
        <div className="flex justify-center gap-4 mb-8">
          <Button
            onClick={isPlaying ? handlePause : handlePlay}
            className="flex items-center gap-2"
          >
            {isPlaying ? (
              <>
                <Pause className="h-4 w-4" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Play
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>

        {/* Animation Timeline */}
        <div className="relative mb-8">
          {/* Timeline Bar */}
          <div className="w-full h-2 bg-gray-200 rounded-full mb-4">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-100"
              style={{ width: `${(currentStep * 100 + progress) / animationSteps.length}%` }}
            />
          </div>

          {/* Step Indicators */}
          <div className="flex justify-between">
            {animationSteps.map((step, index) => (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 ${
                  index < currentStep 
                    ? 'bg-blue-600 border-blue-600' 
                    : index === currentStep 
                    ? 'bg-white border-blue-600' 
                    : 'bg-white border-gray-300'
                }`} />
                <span className="text-xs mt-1 max-w-20 text-center">
                  {step.title.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Step Display */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {currentStepData?.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              Step {currentStep + 1} of {animationSteps.length}
            </div>
          </div>
          <p className="text-gray-700 mb-4">
            {currentStepData?.description}
          </p>

          {/* Visual Indicators */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`p-4 rounded-lg border-2 transition-all ${
              currentStepData?.highlight === 'payment' || currentStepData?.highlight === 'both'
                ? 'border-green-500 bg-green-50'
                : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className={`h-5 w-5 ${
                  currentStepData?.highlight === 'payment' || currentStepData?.highlight === 'both'
                    ? 'text-green-600'
                    : 'text-gray-400'
                }`} />
                <span className="font-semibold">Payments</span>
              </div>
              <p className="text-sm text-gray-600">
                Reported when payment is <strong>initiated</strong>
              </p>
            </div>

            <div className={`p-4 rounded-lg border-2 transition-all ${
              currentStepData?.highlight === 'sale' || currentStepData?.highlight === 'both'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className={`h-5 w-5 ${
                  currentStepData?.highlight === 'sale' || currentStepData?.highlight === 'both'
                    ? 'text-blue-600'
                    : 'text-gray-400'
                }`} />
                <span className="font-semibold">Gross Sales</span>
              </div>
              <p className="text-sm text-gray-600">
                Reported when payment is <strong>completed</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-2">
            <div className="p-1 bg-blue-100 rounded">
              <Calendar className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-1">Key Takeaway</h4>
              <p className="text-blue-800 text-sm">
                Payments and Gross Sales can appear on different days because they're reported 
                at different stages of the transaction process. This is completely normal and 
                helps you understand your cash flow timing.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* FAQ Section */}
      <Card className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <HelpCircle className="h-6 w-6 text-purple-600" />
          <h2 className="text-2xl font-semibold text-gray-900">
            Common Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg">
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                {item.isOpen ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
              </button>
              
              {item.isOpen && (
                <div className="px-4 pb-4">
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 mb-4">{item.answer}</p>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                        <span>📋</span>
                        Example Scenario
                      </h4>
                      <pre className="text-sm text-yellow-800 whitespace-pre-line font-mono">
                        {item.scenario}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Additional Help */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Need More Help?</h4>
          <p className="text-gray-600 text-sm mb-3">
            If you're still seeing unexpected differences between your payments and sales, 
            consider these factors:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Check your timezone settings in your Square account</li>
            <li>• Review the specific payment methods used (some process slower)</li>
            <li>• Look for any failed or declined transactions</li>
            <li>• Consider network connectivity issues during busy periods</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
