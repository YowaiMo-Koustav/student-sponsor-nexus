import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronLeft, ChevronRight, Play, Pause, SkipForward, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  content: string;
  action?: string;
  actionUrl?: string;
  completed: boolean;
  required: boolean;
}

interface TutorialSection {
  id: string;
  title: string;
  description: string;
  steps: TutorialStep[];
}

const tutorialSections: TutorialSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Learn the basics of SponsorSync',
    steps: [
      {
        id: 'welcome',
        title: 'Welcome to SponsorSync',
        description: 'Let\'s get you started with the basics',
        content: 'Welcome! SponsorSync helps you connect student events with relevant sponsors. This tutorial will guide you through the key features.',
        completed: false,
        required: true
      },
      {
        id: 'profile-setup',
        title: 'Complete Your Profile',
        description: 'Set up your profile to get better matches',
        content: 'A complete profile helps us find the best matches for you. Add your organization details, interests, and preferences.',
        action: 'Complete Profile',
        actionUrl: '/profile',
        completed: false,
        required: true
      },
      {
        id: 'first-event',
        title: 'Create Your First Event',
        description: 'Learn how to create and manage events',
        content: 'Events are the core of SponsorSync. Learn how to create compelling event descriptions that attract sponsors.',
        action: 'Create Event',
        actionUrl: '/events/create',
        completed: false,
        required: true
      }
    ]
  },
  {
    id: 'matching',
    title: 'AI-Powered Matching',
    description: 'Discover how our matching system works',
    steps: [
      {
        id: 'matching-explained',
        title: 'How Matching Works',
        description: 'Understanding our AI matching algorithm',
        content: 'Our AI analyzes event details, sponsor preferences, and historical data to suggest the best matches. The more information you provide, the better the matches.',
        completed: false,
        required: false
      },
      {
        id: 'browse-sponsors',
        title: 'Browse Potential Sponsors',
        description: 'Explore sponsor profiles and opportunities',
        content: 'Browse through our database of sponsors. Filter by industry, budget, and preferences to find the perfect match.',
        action: 'Browse Sponsors',
        actionUrl: '/sponsors',
        completed: false,
        required: false
      },
      {
        id: 'send-proposal',
        title: 'Send Your First Proposal',
        description: 'Learn how to create compelling proposals',
        content: 'Use our proposal templates to create professional sponsorship requests. Customize them to match your event and target sponsors.',
        action: 'Create Proposal',
        actionUrl: '/proposals',
        completed: false,
        required: false
      }
    ]
  },
  {
    id: 'communication',
    title: 'Communication Tools',
    description: 'Master our communication features',
    steps: [
      {
        id: 'messaging',
        title: 'In-App Messaging',
        description: 'Communicate directly with sponsors',
        content: 'Use our real-time messaging system to communicate with sponsors. Share files, schedule meetings, and track conversations.',
        action: 'Try Messaging',
        actionUrl: '/messages',
        completed: false,
        required: false
      },
      {
        id: 'notifications',
        title: 'Notification Settings',
        description: 'Stay updated with important alerts',
        content: 'Configure your notification preferences to stay informed about new matches, messages, and event updates.',
        action: 'Configure Notifications',
        actionUrl: '/settings/notifications',
        completed: false,
        required: false
      }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    description: 'Track your success with detailed analytics',
    steps: [
      {
        id: 'dashboard-overview',
        title: 'Dashboard Overview',
        description: 'Understanding your analytics dashboard',
        content: 'Your dashboard provides insights into event performance, sponsor engagement, and overall success metrics.',
        action: 'View Dashboard',
        actionUrl: '/dashboard',
        completed: false,
        required: false
      },
      {
        id: 'export-reports',
        title: 'Export Reports',
        description: 'Generate and export detailed reports',
        content: 'Export your data for presentations, reports, or further analysis. Choose from various formats and date ranges.',
        action: 'Export Report',
        actionUrl: '/analytics/export',
        completed: false,
        required: false
      }
    ]
  }
];

const OnboardingTutorial: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());

  const currentSectionData = tutorialSections[currentSection];
  const currentStepData = currentSectionData?.steps[currentStep];

  const totalSteps = tutorialSections.reduce((acc, section) => acc + section.steps.length, 0);
  const completedCount = completedSteps.size;
  const progress = (completedCount / totalSteps) * 100;

  const handleStepComplete = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]));
    toast({
      title: "Step completed!",
      description: "Great job! You're making progress.",
    });
  };

  const handleNext = () => {
    if (currentStep < currentSectionData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentSection < tutorialSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentStep(0);
    } else {
      // Tutorial completed
      setIsPlaying(false);
      toast({
        title: "Tutorial completed!",
        description: "Congratulations! You're ready to use SponsorSync.",
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      setCurrentStep(tutorialSections[currentSection - 1].steps.length - 1);
    }
  };

  const handleSkip = () => {
    if (currentStep < currentSectionData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else if (currentSection < tutorialSections.length - 1) {
      setCurrentSection(currentSection + 1);
      setCurrentStep(0);
    }
  };

  const handleAction = (step: TutorialStep) => {
    if (step.actionUrl) {
      window.open(step.actionUrl, '_blank');
    }
    handleStepComplete(step.id);
  };

  useEffect(() => {
    if (isPlaying && currentStepData) {
      const timer = setTimeout(() => {
        if (!currentStepData.required) {
          handleNext();
        }
      }, 5000); // Auto-advance non-required steps after 5 seconds

      return () => clearTimeout(timer);
    }
  }, [isPlaying, currentStep, currentSection]);

  if (!showTutorial) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setShowTutorial(true)}>
          <Play className="h-4 w-4 mr-2" />
          Resume Tutorial
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Welcome to SponsorSync</CardTitle>
              <CardDescription>
                {currentSectionData?.title} • Step {currentStep + 1} of {currentSectionData?.steps.length}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowTutorial(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{completedCount} of {totalSteps} steps completed</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {currentStepData && (
            <>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Badge variant={currentStepData.required ? "default" : "secondary"}>
                    {currentStepData.required ? "Required" : "Optional"}
                  </Badge>
                  {completedSteps.has(currentStepData.id) && (
                    <Badge variant="outline" className="text-green-600">
                      <Check className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">{currentStepData.title}</h3>
                  <p className="text-muted-foreground mb-4">{currentStepData.description}</p>
                  <p className="text-sm">{currentStepData.content}</p>
                </div>

                {currentStepData.action && (
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-sm font-medium mb-2">Try it now:</p>
                    <Button onClick={() => handleAction(currentStepData)}>
                      {currentStepData.action}
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevious}
                    disabled={currentSection === 0 && currentStep === 0}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSkip}
                  >
                    <SkipForward className="h-4 w-4 mr-2" />
                    Skip
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button onClick={handleNext}>
                    {currentSection === tutorialSections.length - 1 && currentStep === currentSectionData.steps.length - 1
                      ? 'Finish Tutorial'
                      : 'Next'
                    }
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </>
          )}

          <div className="border-t pt-4">
            <h4 className="text-sm font-medium mb-2">Tutorial Sections:</h4>
            <div className="grid grid-cols-2 gap-2">
              {tutorialSections.map((section, index) => (
                <div
                  key={section.id}
                  className={`p-2 rounded text-xs cursor-pointer transition-colors ${
                    index === currentSection
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                  onClick={() => {
                    setCurrentSection(index);
                    setCurrentStep(0);
                  }}
                >
                  <div className="font-medium">{section.title}</div>
                  <div className="text-muted-foreground">{section.description}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingTutorial; 