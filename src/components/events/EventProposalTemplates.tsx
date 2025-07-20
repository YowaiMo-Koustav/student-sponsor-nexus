import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Copy, Download, Eye, FileText, Users, Calendar, MapPin, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProposalTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  content: string;
  variables: string[];
  estimatedValue: string;
  duration: string;
}

const proposalTemplates: ProposalTemplate[] = [
  {
    id: 'tech-conference',
    name: 'Tech Conference',
    category: 'Technology',
    description: 'Professional technology conference with industry speakers',
    content: `# {eventName} - Technology Conference

## Event Overview
**Date:** {eventDate}
**Location:** {eventLocation}
**Expected Attendance:** {expectedAttendance} attendees
**Duration:** {duration}

## Event Description
{eventDescription}

## Sponsorship Opportunities

### Platinum Sponsor - $10,000
- Keynote speaking opportunity
- Prominent logo placement
- 10x10 booth space
- Social media promotion
- Event website homepage feature

### Gold Sponsor - $5,000
- Panel discussion participation
- 8x8 booth space
- Social media mentions
- Event program advertisement

### Silver Sponsor - $2,500
- 6x6 booth space
- Event program listing
- Social media recognition

## Contact Information
**Organizer:** {organizerName}
**Email:** {organizerEmail}
**Phone:** {organizerPhone}

We look forward to partnering with you for this exciting event!`,
    variables: ['eventName', 'eventDate', 'eventLocation', 'expectedAttendance', 'duration', 'eventDescription', 'estimatedValue', 'organizerName', 'organizerEmail', 'organizerPhone'],
    estimatedValue: '$10,000',
    duration: '2-3 days'
  },
  {
    id: 'career-fair',
    name: 'Career Fair',
    category: 'Professional Development',
    description: 'Student career fair connecting graduates with employers',
    content: `# {eventName} - Career Fair

## Event Overview
**Date:** {eventDate}
**Location:** {eventLocation}
**Expected Attendance:** {expectedAttendance} students
**Duration:** {duration}

## Event Description
{eventDescription}

## Sponsorship Opportunities

### Premier Recruiter - $5,000
- Priority booth placement
- Exclusive interview rooms
- Pre-event student database access
- Featured employer spotlight
- Social media campaign

### Gold Recruiter - $3,000
- Standard booth space
- Interview room access
- Student database access
- Event program advertisement

### Silver Recruiter - $1,500
- Booth space
- Event program listing
- Student database access

## Contact Information
**Organizer:** {organizerName}
**Email:** {organizerEmail}
**Phone:** {organizerPhone}

Join us in connecting talented students with amazing opportunities!`,
    variables: ['eventName', 'eventDate', 'eventLocation', 'expectedAttendance', 'duration', 'eventDescription', 'estimatedValue', 'organizerName', 'organizerEmail', 'organizerPhone'],
    estimatedValue: '$5,000',
    duration: '1 day'
  },
  {
    id: 'hackathon',
    name: 'Hackathon',
    category: 'Technology',
    description: 'Innovation-focused coding competition',
    content: `# {eventName} - Hackathon

## Event Overview
**Date:** {eventDate}
**Location:** {eventLocation}
**Expected Attendance:** {expectedAttendance} participants
**Duration:** {duration}

## Event Description
{eventDescription}

## Sponsorship Opportunities

### Innovation Partner - $8,000
- Challenge sponsorship
- Judging panel participation
- Branded prizes
- Social media campaign
- Post-event showcase

### Tech Partner - $4,000
- Challenge sponsorship
- Mentorship opportunities
- Branded prizes
- Social media mentions

### Supporter - $1,500
- Prize contribution
- Event program listing
- Social media recognition

## Contact Information
**Organizer:** {organizerName}
**Email:** {organizerEmail}
**Phone:** {organizerPhone}

Help us inspire the next generation of innovators!`,
    variables: ['eventName', 'eventDate', 'eventLocation', 'expectedAttendance', 'duration', 'eventDescription', 'estimatedValue', 'organizerName', 'organizerEmail', 'organizerPhone'],
    estimatedValue: '$8,000',
    duration: '24-48 hours'
  },
  {
    id: 'cultural-festival',
    name: 'Cultural Festival',
    category: 'Arts & Culture',
    description: 'Celebration of diverse cultures and traditions',
    content: `# {eventName} - Cultural Festival

## Event Overview
**Date:** {eventDate}
**Location:** {eventLocation}
**Expected Attendance:** {expectedAttendance} attendees
**Duration:** {duration}

## Event Description
{eventDescription}

## Sponsorship Opportunities

### Cultural Partner - $5,000
- Main stage sponsorship
- Cultural performance sponsorship
- Food vendor sponsorship
- Social media campaign
- Event website feature

### Community Partner - $2,500
- Performance sponsorship
- Food vendor sponsorship
- Social media mentions
- Event program advertisement

### Supporter - $1,000
- Food vendor sponsorship
- Event program listing
- Social media recognition

## Contact Information
**Organizer:** {organizerName}
**Email:** {organizerEmail}
**Phone:** {organizerPhone}

Join us in celebrating diversity and cultural exchange!`,
    variables: ['eventName', 'eventDate', 'eventLocation', 'expectedAttendance', 'duration', 'eventDescription', 'estimatedValue', 'organizerName', 'organizerEmail', 'organizerPhone'],
    estimatedValue: '$5,000',
    duration: '1-3 days'
  }
];

const EventProposalTemplates: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ProposalTemplate | null>(null);
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});
  const [generatedProposal, setGeneratedProposal] = useState<string>('');
  const [activeTab, setActiveTab] = useState('templates');

  const handleTemplateSelect = (template: ProposalTemplate) => {
    setSelectedTemplate(template);
    setTemplateVariables({});
    setGeneratedProposal('');
  };

  const handleVariableChange = (variable: string, value: string) => {
    setTemplateVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const generateProposal = () => {
    if (!selectedTemplate) return;

    let content = selectedTemplate.content;
    selectedTemplate.variables.forEach(variable => {
      const value = templateVariables[variable] || `[${variable}]`;
      content = content.replace(new RegExp(`{${variable}}`, 'g'), value);
    });

    setGeneratedProposal(content);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedProposal);
    toast({
      title: "Proposal copied!",
      description: "The proposal has been copied to your clipboard.",
    });
  };

  const downloadProposal = () => {
    const blob = new Blob([generatedProposal], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate?.name || 'proposal'}-template.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Event Proposal Templates</h1>
        <p className="text-muted-foreground">
          Professional templates to streamline your sponsorship outreach
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {proposalTemplates.map((template) => (
              <Card 
                key={template.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <Badge variant="secondary">{template.category}</Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>Est. Value: {template.estimatedValue}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Duration: {template.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{template.variables.length} customizable fields</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customize" className="space-y-6">
          {selectedTemplate ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customize Template</CardTitle>
                  <CardDescription>
                    Fill in the details for your {selectedTemplate.name} proposal
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-[500px] pr-4">
                    {selectedTemplate.variables.map((variable) => (
                      <div key={variable} className="space-y-2 mb-4">
                        <Label htmlFor={variable} className="text-sm font-medium">
                          {variable.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Label>
                        <Input
                          id={variable}
                          value={templateVariables[variable] || ''}
                          onChange={(e) => handleVariableChange(variable, e.target.value)}
                          placeholder={`Enter ${variable.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </ScrollArea>
                  <Button onClick={generateProposal} className="w-full">
                    Generate Proposal
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Template Preview</CardTitle>
                  <CardDescription>
                    Preview of the {selectedTemplate.name} template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <pre className="text-sm whitespace-pre-wrap font-mono bg-muted p-4 rounded-md">
                      {selectedTemplate.content}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">
                  Select a template from the Templates tab to customize
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          {generatedProposal ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Proposal</CardTitle>
                    <CardDescription>
                      Your customized {selectedTemplate?.name} proposal
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadProposal}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <div className="prose prose-sm max-w-none">
                    <pre className="text-sm whitespace-pre-wrap font-mono bg-muted p-4 rounded-md">
                      {generatedProposal}
                    </pre>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">
                  Generate a proposal from the Customize tab to preview here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventProposalTemplates; 