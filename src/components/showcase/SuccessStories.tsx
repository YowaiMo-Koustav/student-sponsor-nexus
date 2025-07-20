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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Star, Heart, Share2, MessageSquare, Eye, Calendar, MapPin, Users, DollarSign, Award, TrendingUp, Target, Users2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface SuccessStory {
  id: string;
  title: string;
  description: string;
  eventName: string;
  sponsorName: string;
  category: string;
  date: string;
  location: string;
  attendance: number;
  revenue: number;
  metrics: {
    sponsorSatisfaction: number;
    attendeeEngagement: number;
    mediaCoverage: number;
    leadGeneration: number;
  };
  highlights: string[];
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  images: string[];
  tags: string[];
  featured: boolean;
}

const mockSuccessStories: SuccessStory[] = [
  {
    id: '1',
    title: 'TechCorp & University Innovation Summit',
    description: 'A groundbreaking partnership that brought together 500+ tech professionals and students for a day of innovation and networking.',
    eventName: 'University Innovation Summit 2024',
    sponsorName: 'TechCorp Solutions',
    category: 'Technology',
    date: '2024-01-15',
    location: 'San Francisco, CA',
    attendance: 500,
    revenue: 75000,
    metrics: {
      sponsorSatisfaction: 95,
      attendeeEngagement: 88,
      mediaCoverage: 12,
      leadGeneration: 156
    },
    highlights: [
      'Featured keynote from TechCorp CEO',
      'Live product demonstrations',
      'Student startup pitch competition',
      'Networking mixer with industry leaders'
    ],
    testimonial: {
      quote: 'The Innovation Summit exceeded our expectations. We generated 50+ qualified leads and strengthened our brand presence in the student community.',
      author: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechCorp Solutions'
    },
    images: ['/stories/techcorp-summit-1.jpg', '/stories/techcorp-summit-2.jpg'],
    tags: ['technology', 'innovation', 'networking', 'startup'],
    featured: true
  },
  {
    id: '2',
    title: 'FinancePro & Business Leadership Conference',
    description: 'A successful collaboration that connected finance professionals with business students through workshops and mentorship programs.',
    eventName: 'Business Leadership Conference 2024',
    sponsorName: 'FinancePro Group',
    category: 'Finance',
    date: '2024-02-20',
    location: 'New York, NY',
    attendance: 300,
    revenue: 45000,
    metrics: {
      sponsorSatisfaction: 92,
      attendeeEngagement: 85,
      mediaCoverage: 8,
      leadGeneration: 89
    },
    highlights: [
      'Interactive financial planning workshops',
      'Mentorship program with 20+ professionals',
      'Career fair with top finance firms',
      'Panel discussion on fintech trends'
    ],
    testimonial: {
      quote: 'The Business Leadership Conference provided us with exceptional access to talented students and valuable networking opportunities.',
      author: 'Michael Chen',
      role: 'VP of Talent Acquisition',
      company: 'FinancePro Group'
    },
    images: ['/stories/financepro-conference-1.jpg'],
    tags: ['finance', 'leadership', 'mentorship', 'career'],
    featured: false
  },
  {
    id: '3',
    title: 'MarketingMax & Digital Marketing Bootcamp',
    description: 'An intensive 3-day bootcamp that equipped students with practical digital marketing skills and industry insights.',
    eventName: 'Digital Marketing Bootcamp 2024',
    sponsorName: 'MarketingMax Agency',
    category: 'Marketing',
    date: '2024-03-10',
    location: 'Los Angeles, CA',
    attendance: 200,
    revenue: 35000,
    metrics: {
      sponsorSatisfaction: 89,
      attendeeEngagement: 92,
      mediaCoverage: 15,
      leadGeneration: 134
    },
    highlights: [
      'Hands-on digital marketing workshops',
      'Live campaign creation sessions',
      'Industry expert Q&A panels',
      'Portfolio building workshops'
    ],
    testimonial: {
      quote: 'The bootcamp format allowed us to deeply engage with students and showcase our expertise while building meaningful relationships.',
      author: 'Lisa Rodriguez',
      role: 'Creative Director',
      company: 'MarketingMax Agency'
    },
    images: ['/stories/marketingmax-bootcamp-1.jpg', '/stories/marketingmax-bootcamp-2.jpg'],
    tags: ['marketing', 'digital', 'workshop', 'skills'],
    featured: true
  }
];

const SuccessStories: React.FC = () => {
  const [activeTab, setActiveTab] = useState('showcase');
  const [selectedStory, setSelectedStory] = useState<SuccessStory | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStories = mockSuccessStories.filter(story => {
    const matchesSearch = story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         story.sponsorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = !filterCategory || story.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const shareStory = (story: SuccessStory) => {
    const shareUrl = `${window.location.origin}/success-story/${story.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Story shared!",
      description: "The success story link has been copied to your clipboard.",
    });
  };

  const getSatisfactionColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getSatisfactionIcon = (score: number) => {
    if (score >= 90) return '⭐';
    if (score >= 80) return '👍';
    return '😐';
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Success Stories</h1>
        <p className="text-muted-foreground">
          Discover how events and sponsors create impactful partnerships
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="showcase">Showcase</TabsTrigger>
          <TabsTrigger value="stories">All Stories</TabsTrigger>
          <TabsTrigger value="submit">Submit Story</TabsTrigger>
        </TabsList>

        <TabsContent value="showcase" className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Featured Success Stories</h2>
            <p className="text-muted-foreground">
              Highlighting the most impactful event-sponsor partnerships
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {mockSuccessStories.filter(story => story.featured).map((story) => (
              <Card key={story.id} className="relative overflow-hidden">
                {story.featured && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}
                <div className="relative h-48 bg-gradient-to-br from-blue-500 to-purple-600">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{story.title}</h3>
                    <p className="text-sm opacity-90">{story.eventName}</p>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{story.sponsorName}</CardTitle>
                      <CardDescription>{story.category} • {story.location}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1">
                        <span className={getSatisfactionColor(story.metrics.sponsorSatisfaction)}>
                          {getSatisfactionIcon(story.metrics.sponsorSatisfaction)}
                        </span>
                        <span className="text-sm font-medium">
                          {story.metrics.sponsorSatisfaction}%
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{story.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{story.attendance} attendees</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>${story.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(story.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="h-4 w-4 text-muted-foreground" />
                      <span>{story.metrics.leadGeneration} leads</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Key Highlights:</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {story.highlights.slice(0, 3).map((highlight, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Separator />

                  <div className="bg-muted p-3 rounded-lg">
                    <p className="text-sm italic">"{story.testimonial.quote}"</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      — {story.testimonial.author}, {story.testimonial.role} at {story.testimonial.company}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedStory(story)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => shareStory(story)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="stories" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">All Success Stories</h2>
              <p className="text-muted-foreground">
                Browse all event-sponsor success stories
              </p>
            </div>
            <div className="flex space-x-4">
              <Input
                placeholder="Search stories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story) => (
              <Card key={story.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{story.title}</CardTitle>
                    {story.featured && (
                      <Badge variant="secondary">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {story.sponsorName} • {story.category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm">{story.description.substring(0, 120)}...</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{story.attendance}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <DollarSign className="h-3 w-3" />
                      <span>${story.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-3 w-3" />
                      <span>{story.metrics.leadGeneration} leads</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-3 w-3" />
                      <span>{story.metrics.sponsorSatisfaction}%</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {story.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => setSelectedStory(story)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => shareStory(story)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="submit" className="space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Submit Your Success Story</h2>
            <p className="text-muted-foreground">
              Share your successful event-sponsor partnership with the community
            </p>
          </div>

          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Story Details</CardTitle>
              <CardDescription>
                Tell us about your successful event-sponsor collaboration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input id="eventName" placeholder="Enter event name" />
                </div>
                <div>
                  <Label htmlFor="sponsorName">Sponsor Name</Label>
                  <Input id="sponsorName" placeholder="Enter sponsor name" />
                </div>
              </div>

              <div>
                <Label htmlFor="storyTitle">Story Title</Label>
                <Input id="storyTitle" placeholder="Enter a compelling title for your story" />
              </div>

              <div>
                <Label htmlFor="description">Story Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the partnership, key achievements, and outcomes..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="attendance">Attendance</Label>
                  <Input id="attendance" type="number" placeholder="Number of attendees" />
                </div>
                <div>
                  <Label htmlFor="revenue">Revenue Generated</Label>
                  <Input id="revenue" type="number" placeholder="Total revenue" />
                </div>
                <div>
                  <Label htmlFor="satisfaction">Sponsor Satisfaction (%)</Label>
                  <Input id="satisfaction" type="number" placeholder="0-100" />
                </div>
              </div>

              <div>
                <Label htmlFor="testimonial">Sponsor Testimonial</Label>
                <Textarea
                  id="testimonial"
                  placeholder="Include a quote from the sponsor about the partnership..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="highlights">Key Highlights</Label>
                <Textarea
                  id="highlights"
                  placeholder="List the main achievements and highlights of the partnership..."
                  rows={3}
                />
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1">
                  <Award className="h-4 w-4 mr-2" />
                  Submit Story
                </Button>
                <Button variant="outline">
                  Save Draft
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Story Detail Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">{selectedStory.title}</CardTitle>
                  <CardDescription>
                    {selectedStory.sponsorName} • {selectedStory.eventName}
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedStory(null)}>
                  ✕
                </Button>
              </div>
            </CardHeader>
            <ScrollArea className="h-[70vh]">
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Event Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span>{new Date(selectedStory.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedStory.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span>{selectedStory.attendance} attendees</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>${selectedStory.revenue.toLocaleString()} revenue</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Performance Metrics</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {selectedStory.metrics.sponsorSatisfaction}%
                          </div>
                          <div className="text-xs text-muted-foreground">Satisfaction</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">
                            {selectedStory.metrics.attendeeEngagement}%
                          </div>
                          <div className="text-xs text-muted-foreground">Engagement</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            {selectedStory.metrics.leadGeneration}
                          </div>
                          <div className="text-xs text-muted-foreground">Leads Generated</div>
                        </div>
                        <div className="text-center p-3 bg-muted rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">
                            {selectedStory.metrics.mediaCoverage}
                          </div>
                          <div className="text-xs text-muted-foreground">Media Mentions</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Description</h3>
                      <p className="text-sm text-muted-foreground">{selectedStory.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Key Highlights</h3>
                      <ul className="space-y-2">
                        {selectedStory.highlights.map((highlight, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Sponsor Testimonial</h3>
                      <div className="bg-muted p-4 rounded-lg">
                        <p className="text-sm italic mb-2">"{selectedStory.testimonial.quote}"</p>
                        <p className="text-xs text-muted-foreground">
                          — {selectedStory.testimonial.author}, {selectedStory.testimonial.role} at {selectedStory.testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={() => shareStory(selectedStory)}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Story
                  </Button>
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Organizer
                  </Button>
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SuccessStories; 