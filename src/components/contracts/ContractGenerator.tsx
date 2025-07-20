import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Copy, Download, FileText, Calendar, DollarSign, Users, MapPin, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ContractTemplate {
  id: string;
  name: string;
  description: string;
  type: 'standard' | 'premium' | 'custom';
  content: string;
  variables: string[];
  legalNotes: string[];
}

const contractTemplates: ContractTemplate[] = [
  {
    id: 'standard-sponsorship',
    name: 'Standard Sponsorship Agreement',
    description: 'Basic sponsorship contract for small to medium events',
    type: 'standard',
    content: `SPONSORSHIP AGREEMENT

This Sponsorship Agreement (the "Agreement") is entered into on {effectiveDate} by and between:

{eventOrganizerName} ("Event Organizer")
{eventOrganizerAddress}
{eventOrganizerEmail}

and

{sponsorCompanyName} ("Sponsor")
{sponsorCompanyAddress}
{sponsorCompanyEmail}

1. EVENT DETAILS
Event Name: {eventName}
Event Date: {eventDate}
Event Location: {eventLocation}
Expected Attendance: {expectedAttendance}

2. SPONSORSHIP PACKAGE
Sponsorship Level: {sponsorshipLevel}
Sponsorship Amount: ${sponsorshipAmount}
Payment Terms: {paymentTerms}

3. SPONSOR BENEFITS
{sponsorBenefits}

4. PAYMENT SCHEDULE
{paymentSchedule}

5. EVENT ORGANIZER OBLIGATIONS
- Provide agreed-upon sponsor benefits
- Include sponsor logo in event materials
- Provide post-event report within 30 days
- Maintain event quality standards

6. SPONSOR OBLIGATIONS
- Provide payment according to schedule
- Provide logo and marketing materials by {materialsDeadline}
- Comply with event guidelines and policies

7. CANCELLATION POLICY
- Cancellation more than 30 days before event: 50% refund
- Cancellation less than 30 days before event: No refund
- Event cancellation: Full refund to sponsor

8. TERMINATION
Either party may terminate this agreement with 30 days written notice.

9. GOVERNING LAW
This agreement is governed by the laws of {governingLaw}.

10. SIGNATURES

Event Organizer: _________________
Date: _________________

Sponsor: _________________
Date: _________________`,
    variables: [
      'effectiveDate', 'eventOrganizerName', 'eventOrganizerAddress', 'eventOrganizerEmail',
      'sponsorCompanyName', 'sponsorCompanyAddress', 'sponsorCompanyEmail',
      'eventName', 'eventDate', 'eventLocation', 'expectedAttendance',
      'sponsorshipLevel', 'sponsorshipAmount', 'paymentTerms', 'sponsorBenefits',
      'paymentSchedule', 'materialsDeadline', 'governingLaw'
    ],
    legalNotes: [
      'This is a basic template and should be reviewed by legal counsel',
      'State-specific legal requirements may apply',
      'Consider adding force majeure clauses for COVID-19',
      'Include specific indemnification clauses'
    ]
  },
  {
    id: 'premium-sponsorship',
    name: 'Premium Sponsorship Agreement',
    description: 'Comprehensive contract for high-value sponsorships',
    type: 'premium',
    content: `PREMIUM SPONSORSHIP AGREEMENT

This Premium Sponsorship Agreement (the "Agreement") is entered into on {effectiveDate} by and between:

{eventOrganizerName} ("Event Organizer")
{eventOrganizerAddress}
{eventOrganizerEmail}

and

{sponsorCompanyName} ("Sponsor")
{sponsorCompanyAddress}
{sponsorCompanyEmail}

1. EVENT DETAILS
Event Name: {eventName}
Event Date: {eventDate}
Event Location: {eventLocation}
Expected Attendance: {expectedAttendance}
Event Website: {eventWebsite}

2. SPONSORSHIP PACKAGE
Sponsorship Level: {sponsorshipLevel}
Total Sponsorship Value: ${sponsorshipAmount}
Payment Terms: {paymentTerms}

3. SPONSOR BENEFITS
{sponsorBenefits}

4. EXCLUSIVITY CLAUSE
{exclusivityClause}

5. PAYMENT SCHEDULE
{paymentSchedule}

6. EVENT ORGANIZER OBLIGATIONS
- Provide all agreed-upon sponsor benefits
- Include sponsor logo in all event materials
- Provide detailed post-event analytics report
- Maintain high event quality standards
- Provide sponsor with attendee demographics
- Include sponsor in all promotional materials

7. SPONSOR OBLIGATIONS
- Provide payment according to schedule
- Provide high-resolution logo and marketing materials
- Comply with event guidelines and policies
- Provide sponsor representative for event
- Participate in pre-event promotional activities

8. INTELLECTUAL PROPERTY
- Sponsor grants event organizer license to use sponsor logo
- Event organizer grants sponsor license to use event branding
- Both parties retain ownership of their respective IP

9. CONFIDENTIALITY
Both parties agree to maintain confidentiality of proprietary information.

10. CANCELLATION POLICY
- Cancellation more than 60 days before event: 75% refund
- Cancellation 30-60 days before event: 50% refund
- Cancellation less than 30 days before event: No refund
- Event cancellation: Full refund to sponsor

11. FORCE MAJEURE
Neither party shall be liable for delays or failures due to circumstances beyond reasonable control.

12. DISPUTE RESOLUTION
Any disputes shall be resolved through mediation before legal action.

13. GOVERNING LAW
This agreement is governed by the laws of {governingLaw}.

14. SIGNATURES

Event Organizer: _________________
Date: _________________

Sponsor: _________________
Date: _________________`,
    variables: [
      'effectiveDate', 'eventOrganizerName', 'eventOrganizerAddress', 'eventOrganizerEmail',
      'sponsorCompanyName', 'sponsorCompanyAddress', 'sponsorCompanyEmail',
      'eventName', 'eventDate', 'eventLocation', 'expectedAttendance', 'eventWebsite',
      'sponsorshipLevel', 'sponsorshipAmount', 'paymentTerms', 'sponsorBenefits',
      'exclusivityClause', 'paymentSchedule', 'governingLaw'
    ],
    legalNotes: [
      'This template includes advanced legal protections',
      'Consider jurisdiction-specific requirements',
      'Include specific performance metrics',
      'Add liquidated damages clauses if appropriate'
    ]
  }
];

const ContractGenerator: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [contractVariables, setContractVariables] = useState<Record<string, string>>({});
  const [generatedContract, setGeneratedContract] = useState<string>('');
  const [activeTab, setActiveTab] = useState('templates');

  const handleTemplateSelect = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setContractVariables({});
    setGeneratedContract('');
  };

  const handleVariableChange = (variable: string, value: string) => {
    setContractVariables(prev => ({
      ...prev,
      [variable]: value
    }));
  };

  const generateContract = () => {
    if (!selectedTemplate) return;

    let content = selectedTemplate.content;
    selectedTemplate.variables.forEach(variable => {
      const value = contractVariables[variable] || `[${variable}]`;
      content = content.replace(new RegExp(`{${variable}}`, 'g'), value);
    });

    setGeneratedContract(content);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContract);
    toast({
      title: "Contract copied!",
      description: "The contract has been copied to your clipboard.",
    });
  };

  const downloadContract = () => {
    const blob = new Blob([generatedContract], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedTemplate?.name || 'contract'}-agreement.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const validateContract = () => {
    const requiredFields = selectedTemplate?.variables || [];
    const missingFields = requiredFields.filter(field => !contractVariables[field]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return false;
    }
    return true;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Contract Generator</h1>
        <p className="text-muted-foreground">
          Generate professional sponsorship contracts with legal compliance
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="customize">Customize</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contractTemplates.map((template) => (
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
                    <Badge variant={template.type === 'premium' ? 'default' : 'secondary'}>
                      {template.type}
                    </Badge>
                  </div>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{template.variables.length} customizable fields</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    <span>{template.legalNotes.length} legal considerations</span>
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
                  <CardTitle>Contract Details</CardTitle>
                  <CardDescription>
                    Fill in the details for your {selectedTemplate.name}
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
                          value={contractVariables[variable] || ''}
                          onChange={(e) => handleVariableChange(variable, e.target.value)}
                          placeholder={`Enter ${variable.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </ScrollArea>
                  <div className="flex space-x-2">
                    <Button onClick={generateContract} className="flex-1">
                      Generate Contract
                    </Button>
                    <Button variant="outline" onClick={validateContract}>
                      Validate
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legal Notes</CardTitle>
                  <CardDescription>
                    Important considerations for this contract type
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-3">
                      {selectedTemplate.legalNotes.map((note, index) => (
                        <div key={index} className="flex items-start space-x-2 p-3 bg-muted rounded-md">
                          <AlertCircle className="h-4 w-4 mt-0.5 text-yellow-600" />
                          <p className="text-sm">{note}</p>
                        </div>
                      ))}
                    </div>
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
          {generatedContract ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Generated Contract</CardTitle>
                    <CardDescription>
                      Your customized {selectedTemplate?.name}
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={copyToClipboard}>
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={downloadContract}>
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
                      {generatedContract}
                    </pre>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-32">
                <p className="text-muted-foreground">
                  Generate a contract from the Customize tab to preview here
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContractGenerator; 