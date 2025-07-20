import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Users, Clock, FileText, Eye, Edit, Trash2, Plus, Search, Filter } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Sponsor {
  id: string;
  name: string;
  email: string;
  company: string;
  category: string;
  lastContact: string;
  status: 'active' | 'inactive' | 'pending';
}

interface MessageTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  category: string;
  variables: string[];
}

interface BulkMessage {
  id: string;
  subject: string;
  content: string;
  recipients: Sponsor[];
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  createdAt: string;
}

const mockSponsors: Sponsor[] = [
  { id: '1', name: 'John Smith', email: 'john@techcorp.com', company: 'TechCorp', category: 'Technology', lastContact: '2024-01-15', status: 'active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@innovate.com', company: 'Innovate Inc', category: 'Technology', lastContact: '2024-01-10', status: 'active' },
  { id: '3', name: 'Mike Davis', email: 'mike@finance.com', company: 'Finance Solutions', category: 'Finance', lastContact: '2024-01-20', status: 'pending' },
  { id: '4', name: 'Lisa Brown', email: 'lisa@marketing.com', company: 'Marketing Pro', category: 'Marketing', lastContact: '2024-01-05', status: 'active' },
  { id: '5', name: 'David Wilson', email: 'david@consulting.com', company: 'Consulting Group', category: 'Consulting', lastContact: '2024-01-12', status: 'inactive' },
];

const messageTemplates: MessageTemplate[] = [
  {
    id: 'event-invitation',
    name: 'Event Invitation',
    subject: 'Invitation to {eventName} - {eventDate}',
    content: `Dear {sponsorName},

We're excited to invite you to {eventName}, taking place on {eventDate} at {eventLocation}.

This event will bring together {expectedAttendance} attendees and offers excellent sponsorship opportunities for {companyName}.

Key sponsorship benefits include:
- Brand visibility and recognition
- Networking opportunities
- Lead generation potential
- Media coverage

Please let us know if you're interested in learning more about our sponsorship packages.

Best regards,
{organizerName}
{organizerEmail}`,
    category: 'Event',
    variables: ['sponsorName', 'eventName', 'eventDate', 'eventLocation', 'expectedAttendance', 'companyName', 'organizerName', 'organizerEmail']
  },
  {
    id: 'follow-up',
    name: 'Follow-up Message',
    subject: 'Following up on {eventName} sponsorship opportunity',
    content: `Hi {sponsorName},

I hope this message finds you well. I wanted to follow up on our recent discussion about {eventName} sponsorship opportunities.

We have several sponsorship packages available that could be a great fit for {companyName}:
- Platinum Sponsor: $10,000
- Gold Sponsor: $5,000
- Silver Sponsor: $2,500

Each package includes different levels of brand exposure and networking opportunities.

Would you be available for a brief call this week to discuss the details?

Best regards,
{organizerName}
{organizerEmail}`,
    category: 'Follow-up',
    variables: ['sponsorName', 'eventName', 'companyName', 'organizerName', 'organizerEmail']
  },
  {
    id: 'newsletter',
    name: 'Newsletter Update',
    subject: 'SponsorSync Newsletter - {month} {year}',
    content: `Dear {sponsorName},

Thank you for being part of our sponsor community. Here's what's happening this {month}:

Upcoming Events:
- {event1}: {date1}
- {event2}: {date2}
- {event3}: {date3}

Success Stories:
- {successStory1}
- {successStory2}

We'd love to hear about your recent activities and how we can support your goals.

Best regards,
The SponsorSync Team`,
    category: 'Newsletter',
    variables: ['sponsorName', 'month', 'year', 'event1', 'date1', 'event2', 'date2', 'event3', 'date3', 'successStory1', 'successStory2']
  }
];

const BulkMessaging: React.FC = () => {
  const [selectedSponsors, setSelectedSponsors] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<MessageTemplate | null>(null);
  const [messageForm, setMessageForm] = useState({
    subject: '',
    content: '',
    scheduledDate: '',
    scheduledTime: ''
  });
  const [templateVariables, setTemplateVariables] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('compose');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [bulkMessages, setBulkMessages] = useState<BulkMessage[]>([]);

  const filteredSponsors = mockSponsors.filter(sponsor => {
    const matchesSearch = sponsor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sponsor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterCategory || sponsor.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const handleSponsorToggle = (sponsorId: string) => {
    setSelectedSponsors(prev => 
      prev.includes(sponsorId) 
        ? prev.filter(id => id !== sponsorId)
        : [...prev, sponsorId]
    );
  };

  const handleSelectAll = () => {
    setSelectedSponsors(filteredSponsors.map(sponsor => sponsor.id));
  };

  const handleDeselectAll = () => {
    setSelectedSponsors([]);
  };

  const handleTemplateSelect = (template: MessageTemplate) => {
    setSelectedTemplate(template);
    setMessageForm({
      subject: template.subject,
      content: template.content,
      scheduledDate: '',
      scheduledTime: ''
    });
    setTemplateVariables({});
  };

  const handleVariableChange = (variable: string, value: string) => {
    setTemplateVariables(prev => ({
      ...prev,
      [variable]: value
    }));

    // Update subject and content with variables
    if (selectedTemplate) {
      let newSubject = selectedTemplate.subject;
      let newContent = selectedTemplate.content;
      
      selectedTemplate.variables.forEach(v => {
        const val = v === variable ? value : (templateVariables[v] || `[${v}]`);
        newSubject = newSubject.replace(new RegExp(`{${v}}`, 'g'), val);
        newContent = newContent.replace(new RegExp(`{${v}}`, 'g'), val);
      });

      setMessageForm(prev => ({
        ...prev,
        subject: newSubject,
        content: newContent
      }));
    }
  };

  const sendBulkMessage = () => {
    if (selectedSponsors.length === 0) {
      toast({
        title: "No recipients selected",
        description: "Please select at least one recipient.",
        variant: "destructive"
      });
      return;
    }

    if (!messageForm.subject || !messageForm.content) {
      toast({
        title: "Missing content",
        description: "Please fill in both subject and content.",
        variant: "destructive"
      });
      return;
    }

    const recipients = mockSponsors.filter(sponsor => selectedSponsors.includes(sponsor.id));
    const newMessage: BulkMessage = {
      id: Date.now().toString(),
      subject: messageForm.subject,
      content: messageForm.content,
      recipients,
      scheduledDate: messageForm.scheduledDate ? `${messageForm.scheduledDate}T${messageForm.scheduledTime}` : undefined,
      status: messageForm.scheduledDate ? 'scheduled' : 'sent',
      createdAt: new Date().toISOString()
    };

    setBulkMessages(prev => [newMessage, ...prev]);
    setSelectedSponsors([]);
    setMessageForm({ subject: '', content: '', scheduledDate: '', scheduledTime: '' });
    setSelectedTemplate(null);

    toast({
      title: messageForm.scheduledDate ? "Message scheduled!" : "Message sent!",
      description: `Your message has been ${messageForm.scheduledDate ? 'scheduled' : 'sent'} to ${recipients.length} recipients.`,
    });
  };

  const deleteMessage = (messageId: string) => {
    setBulkMessages(prev => prev.filter(msg => msg.id !== messageId));
    toast({
      title: "Message deleted!",
      description: "The message has been removed from your history.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Bulk Messaging</h1>
        <p className="text-muted-foreground">
          Send targeted messages to multiple sponsors efficiently
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="compose">Compose</TabsTrigger>
          <TabsTrigger value="recipients">Recipients</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Message Templates</CardTitle>
                <CardDescription>
                  Choose from pre-built templates or create your own
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ScrollArea className="h-[400px]">
                  {messageTemplates.map((template) => (
                    <Card 
                      key={template.id} 
                      className={`cursor-pointer transition-all hover:shadow-lg mb-3 ${
                        selectedTemplate?.id === template.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => handleTemplateSelect(template)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <Badge variant="secondary">{template.category}</Badge>
                        </div>
                        <CardDescription>{template.subject}</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Message Details</CardTitle>
                <CardDescription>
                  Customize your message content and scheduling
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedTemplate && (
                  <div className="space-y-3">
                    <div>
                      <Label>Template Variables</Label>
                      <ScrollArea className="h-[200px] border rounded-md p-3">
                        {selectedTemplate.variables.map((variable) => (
                          <div key={variable} className="mb-3">
                            <Label htmlFor={variable} className="text-sm">
                              {variable.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </Label>
                            <Input
                              id={variable}
                              value={templateVariables[variable] || ''}
                              onChange={(e) => handleVariableChange(variable, e.target.value)}
                              placeholder={`Enter ${variable.toLowerCase()}`}
                              className="mt-1"
                            />
                          </div>
                        ))}
                      </ScrollArea>
                    </div>
                  </div>
                )}

                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={messageForm.subject}
                    onChange={(e) => setMessageForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="Enter message subject"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Message Content</Label>
                  <Textarea
                    id="content"
                    value={messageForm.content}
                    onChange={(e) => setMessageForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Enter your message content"
                    rows={8}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduledDate">Schedule Date (Optional)</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={messageForm.scheduledDate}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="scheduledTime">Schedule Time (Optional)</Label>
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={messageForm.scheduledTime}
                      onChange={(e) => setMessageForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    />
                  </div>
                </div>

                <Button onClick={sendBulkMessage} className="w-full">
                  <Send className="h-4 w-4 mr-2" />
                  {messageForm.scheduledDate ? 'Schedule Message' : 'Send Message'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recipients" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Recipients</h2>
              <p className="text-muted-foreground">
                Select sponsors to receive your message
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={handleSelectAll}>
                Select All
              </Button>
              <Button variant="outline" onClick={handleDeselectAll}>
                Deselect All
              </Button>
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Sponsors</Label>
              <Input
                id="search"
                placeholder="Search by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Label htmlFor="filter">Filter by Category</Label>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Consulting">Consulting</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                Selected Recipients ({selectedSponsors.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-2">
                  {filteredSponsors.map((sponsor) => (
                    <div key={sponsor.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <Checkbox
                        checked={selectedSponsors.includes(sponsor.id)}
                        onCheckedChange={() => handleSponsorToggle(sponsor.id)}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{sponsor.name}</p>
                            <p className="text-sm text-muted-foreground">{sponsor.email}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{sponsor.company}</p>
                            <Badge variant="secondary" className="text-xs">
                              {sponsor.category}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Last contact: {sponsor.lastContact}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Message History</h2>
            <p className="text-muted-foreground">
              View your sent and scheduled messages
            </p>
          </div>

          <div className="space-y-4">
            {bulkMessages.map((message) => (
              <Card key={message.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{message.subject}</CardTitle>
                      <CardDescription>
                        {message.recipients.length} recipients • {message.status}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={
                        message.status === 'sent' ? 'default' :
                        message.status === 'scheduled' ? 'secondary' :
                        message.status === 'failed' ? 'destructive' : 'outline'
                      }>
                        {message.status}
                      </Badge>
                      <Button variant="outline" size="sm" onClick={() => deleteMessage(message.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <p className="text-sm">{message.content.substring(0, 200)}...</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{message.recipients.length} recipients</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{new Date(message.createdAt).toLocaleDateString()}</span>
                      </div>
                      {message.scheduledDate && (
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Scheduled: {new Date(message.scheduledDate).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BulkMessaging; 