export interface SampleTransaction {
  id: string;
  type: 'sale' | 'refund' | 'void' | 'comp' | 'service_charge' | 'tax' | 'tip';
  amount: number;
  description: string;
  timestamp: Date;
  paymentMethod: string;
  category?: string;
  staff?: string;
  region?: Region;
}

export interface CalculationStep {
  id: string;
  title: string;
  description: string;
  formula: string;
  interactive: boolean;
  inputFields?: {
    name: string;
    type: 'number' | 'currency';
    placeholder: string;
    value?: number;
  }[];
  explanation: string;
  regionalNotes?: {
    region: Region;
    note: string;
  }[];
}

export interface CalculatorScenario {
  id: string;
  title: string;
  description: string;
  businessType: BusinessType;
  region: Region;
  sampleTransactions: SampleTransaction[];
  steps: CalculationStep[];
  expectedResults: {
    grossSales: number;
    items: number;
    serviceCharges: number;
    discountsAndComps: number;
    returns: number;
    netSales: number;
    taxes: number;
    tips: number;
    giftCardSales: number;
    refundsByAmount: number;
    totalSales: number;
  };
  commonMistakes: {
    mistake: string;
    explanation: string;
    correctApproach: string;
  }[];
}

export interface MetricDefinition {
  name: string;
  region: Region;
  sellerFacingDefinition: string;
  shortDefinition: string;
  formula?: string;
  excludes: string[];
  includes: string[];
  commonConfusions: string[];
  relatedMetrics: string[];
  examples: {
    scenario: string;
    calculation: string;
    result: number;
  }[];
}

export interface GuidedTour {
  id: string;
  name: string;
  targetPage: string;
  steps: TourStep[];
  triggerConditions?: {
    userType: 'new' | 'returning';
    featureUsage?: string;
    timeOnPage?: number;
  };
}

export interface TourStep {
  id: string;
  target: string; // CSS selector
  title: string;
  content: string;
  position: TourPosition;
  actions?: {
    type: 'click' | 'input' | 'navigate';
    target: string;
    value?: string;
  }[];
  highlightElement?: boolean;
  showSkip?: boolean;
}

export interface SampleDataSet {
  id: string;
  name: string;
  description: string;
  businessType: BusinessType;
  region: Region;
  timeRange: {
    startDate: Date;
    endDate: Date;
  };
  transactions: SampleTransaction[];
  metrics: {
    grossSales: number;
    refunds: number;
    comps: number;
    voids: number;
    netSales: number;
  };
}

export interface LearningPath {
  id: string;
  name: string;
  description: string;
  difficulty: DifficultyLevel;
  modules: string[]; // module IDs in order
  estimatedTotalTime: number;
  category: string;
  targetAudience: BusinessType[];
  learningObjectives: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'completion' | 'streak' | 'mastery' | 'community' | 'business_impact';
  criteria: {
    type: 'modules_completed' | 'streak_days' | 'score_achieved' | 'time_spent' | 'feature_adoption';
    value: number;
  };
  reward?: {
    type: 'badge' | 'feature_unlock' | 'certificate';
    value: string;
  };
}

export interface ReconciliationScenario {
  id: string;
  title: string;
  description: string;
  issue: string;
  commonCauses: string[];
  troubleshootingSteps: {
    step: string;
    action: string;
    expectedOutcome: string;
  }[];
  resolution: string;
  preventionTips: string[];
}

export interface BusinessScenario {
  id: string;
  title: string;
  businessType: BusinessType;
  region: Region;
  scenario: string;
  challenge: string;
  reportingStrategy: string;
  keyMetrics: string[];
  expectedOutcome: string;
  tips: string[];
}

export interface EducationState {
  modules: EducationModule[];
  userProgress: UserProgress;
  currentModule?: EducationModule;
  availablePaths: LearningPath[];
  achievements: Achievement[];
  metricDefinitions: MetricDefinition[];
  reconciliationScenarios: ReconciliationScenario[];
  businessScenarios: BusinessScenario[];
  isLoading: boolean;
  error: string | null;
  activeTour?: GuidedTour;
  currentTourStep?: number;
}
