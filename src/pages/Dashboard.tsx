import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  MessageSquare,
  Search,
  FileText,
  Megaphone,
  Award,
  Star,
  Target,
  Zap,
  BarChart3,
  Activity,
  CheckCircle,
  Clock,
  AlertCircle,
  Building2,
  User
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { demoEvents } from "@/data/demoEvents";
import { demoSponsors } from "@/data/demoSponsors";
import { demoMatches } from "@/data/demoConversations";
import { demoConversations } from "@/data/demoConversations";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user, userRole } = useAuth();

  // Redirect if no user or role
  if (!user || !userRole) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Loading...</h2>
            <p className="text-muted-foreground">Please wait while we load your dashboard.</p>
          </div>
        </Card>
      </div>
    );
  }

  const isStudent = userRole === 'student';
  const isSponsor = userRole === 'sponsor';

  const studentStats = [
    {
      title: "My Events",
      value: "3",
      change: "+1 this month",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Active Sponsors",
      value: "45",
      change: "+12 this quarter",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Funding Secured",
      value: "$15K",
      change: "+25% this year",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "Response Rate",
      value: "78%",
      change: "+8% improvement",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const sponsorStats = [
    {
      title: "Events Sponsored",
      value: "8",
      change: "+2 this month",
      icon: Calendar,
      color: "text-blue-600"
    },
    {
      title: "Student Organizations",
      value: "24",
      change: "+6 this quarter",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Total Investment",
      value: "$42K",
      change: "+18% this year",
      icon: DollarSign,
      color: "text-purple-600"
    },
    {
      title: "ROI",
      value: "4.2x",
      change: "+0.8x improvement",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  const stats = isStudent ? studentStats : sponsorStats;
  const recentMatches = demoMatches.slice(0, 4);
  const recentEvents = demoEvents.slice(0, 3);
  const recentConversations = demoConversations.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {isStudent ? (
              <User className="h-8 w-8 text-blue-600" />
            ) : (
              <Building2 className="h-8 w-8 text-green-600" />
            )}
            <h1 className="text-3xl font-bold text-foreground">
              {isStudent ? 'Student' : 'Sponsor'} Dashboard
            </h1>
            <Badge variant="outline" className="ml-2">
              {isStudent ? 'Student Organizer' : 'Sponsor'}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {isStudent 
              ? 'Manage your events and connect with sponsors' 
              : 'Discover events and connect with student organizations'
            } - Demo Mode
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-600">
                      {stat.change}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">{isStudent ? 'My Events' : 'Events'}</TabsTrigger>
            <TabsTrigger value="sponsors">{isStudent ? 'Sponsors' : 'My Profile'}</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Matches */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Recent AI Matches
                  </CardTitle>
                  <CardDescription>
                    Latest AI-powered {isStudent ? 'sponsor' : 'event'} matches
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentMatches.map((match) => (
                      <div key={match.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">
                            {isStudent 
                              ? demoEvents.find(e => e.id === match.event_id)?.title
                              : demoSponsors.find(s => s.id === match.sponsor_id)?.company_name
                            }
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {isStudent 
                              ? demoSponsors.find(s => s.id === match.sponsor_id)?.company_name
                              : demoEvents.find(e => e.id === match.event_id)?.title
                            }
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary" className="mb-1">
                            {match.match_score}% Match
                          </Badge>
                          <p className="text-xs text-muted-foreground">
                            {match.estimated_value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest platform activity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-sm font-medium">
                          {isStudent ? 'New sponsorship secured' : 'New event sponsored'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isStudent 
                            ? 'TechCorp → Tech Innovation Summit'
                            : 'StartupHub → Pitch Competition'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium">New conversation started</p>
                        <p className="text-xs text-muted-foreground">
                          {isStudent 
                            ? 'StartupHub → Pitch Competition'
                            : 'TechCorp → Tech Innovation Summit'
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                      <Calendar className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-sm font-medium">
                          {isStudent ? 'Event created' : 'Event discovered'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          AI for Social Good Hackathon
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {isStudent ? 'My Events' : 'Available Events'}
              </h2>
              {isStudent && (
                <Button asChild>
                  <Link to="/events/create">Create Event</Link>
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <Badge variant={event.status === 'active' ? 'default' : 'secondary'}>
                        {event.status}
                      </Badge>
                    </div>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">{event.budget_range}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Audience:</span>
                        <span className="font-medium">{event.audience_size}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{event.event_date}</span>
                      </div>
                      {event.success_metrics && (
                        <div className="pt-3 border-t">
                          <p className="text-xs text-muted-foreground mb-2">Success Metrics:</p>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Funding:</span>
                              <span className="ml-1 font-medium">{event.success_metrics.total_funding}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Attendees:</span>
                              <span className="ml-1 font-medium">{event.success_metrics.attendees}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Sponsors Tab */}
          <TabsContent value="sponsors" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {isStudent ? 'Available Sponsors' : 'My Profile'}
              </h2>
              {isStudent ? (
                <Button asChild>
                  <Link to="/sponsors/discover">Discover More</Link>
                </Button>
              ) : (
                <Button asChild>
                  <Link to="/sponsors/profile">Edit Profile</Link>
                </Button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {demoSponsors.slice(0, 6).map((sponsor) => (
                <Card key={sponsor.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{sponsor.company_name}</CardTitle>
                      <Badge variant="outline">{sponsor.industry}</Badge>
                    </div>
                    <CardDescription>{sponsor.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">{sponsor.budget_range}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Events Sponsored:</span>
                        <span className="font-medium">{sponsor.success_metrics?.events_sponsored}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Investment:</span>
                        <span className="font-medium">{sponsor.success_metrics?.total_investment}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Matches Tab */}
          <TabsContent value="matches" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">AI Matches</h2>
              <Button asChild>
                <Link to="/search">Advanced Search</Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {demoMatches.map((match) => {
                const event = demoEvents.find(e => e.id === match.event_id);
                const sponsor = demoSponsors.find(s => s.id === match.sponsor_id);
                
                return (
                  <Card key={match.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {isStudent ? event?.title : sponsor?.company_name}
                          </CardTitle>
                          <CardDescription>
                            {isStudent ? sponsor?.company_name : event?.title}
                          </CardDescription>
                        </div>
                        <Badge variant={match.status === 'active' ? 'default' : 'secondary'}>
                          {match.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Match Score:</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-muted rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full" 
                                style={{ width: `${match.match_score}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{match.match_score}%</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Estimated Value:</span>
                          <span className="font-medium">{match.estimated_value}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tier:</span>
                          <span className="font-medium">{match.sponsorship_tier}</span>
                        </div>
                        <p className="text-xs text-muted-foreground bg-muted/50 p-3 rounded">
                          {match.ai_recommendation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Conversations</h2>
              <Button asChild>
                <Link to="/bulk-messaging">Bulk Messaging</Link>
              </Button>
            </div>
            <div className="space-y-4">
              {recentConversations.map((conversation) => {
                const event = demoEvents.find(e => e.id === conversation.event_id);
                const sponsor = demoSponsors.find(s => s.id === conversation.sponsor_id);
                const lastMessage = conversation.messages[conversation.messages.length - 1];
                
                return (
                  <Card key={conversation.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">
                            {isStudent ? event?.title : sponsor?.company_name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {isStudent 
                              ? `${sponsor?.company_name} • ${conversation.student_org}`
                              : `${event?.title} • ${conversation.student_org}`
                            }
                          </p>
                        </div>
                        <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
                          {conversation.status}
                        </Badge>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg mb-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          {lastMessage.sender === 'student' ? conversation.student_org : sponsor?.company_name}
                        </p>
                        <p className="text-sm">{lastMessage.content}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(lastMessage.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {conversation.messages.length} messages
                        </span>
                        <Button size="sm" asChild>
                          <Link to={`/chat/${conversation.id}`}>View Chat</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Premium Features Tab */}
          <TabsContent value="premium" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Premium Features</h2>
              <Badge className="bg-gradient-to-r from-accent to-primary text-white">
                Premium
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    <CardTitle>Proposal Templates</CardTitle>
                  </div>
                  <CardDescription>
                    Professional templates for various event types
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/proposals">Create Proposal</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    <CardTitle>Contract Generator</CardTitle>
                  </div>
                  <CardDescription>
                    Automated contract generation with legal compliance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/contracts">Generate Contract</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-accent" />
                    <CardTitle>Calendar Integration</CardTitle>
                  </div>
                  <CardDescription>
                    Sync with Google Calendar, Outlook, and iCal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/calendar">Manage Calendar</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    <CardTitle>Bulk Messaging</CardTitle>
                  </div>
                  <CardDescription>
                    Send targeted messages to multiple {isStudent ? 'sponsors' : 'organizations'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/bulk-messaging">Send Messages</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-accent" />
                    <CardTitle>Advanced Search</CardTitle>
                  </div>
                  <CardDescription>
                    Powerful search with saved filters and scoring
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/search">Search Now</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-accent" />
                    <CardTitle>Event Promotion</CardTitle>
                  </div>
                  <CardDescription>
                    Marketing materials and social media tools
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full">
                    <Link to="/promotion">Promote Event</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;