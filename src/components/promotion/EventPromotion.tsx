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
import { Share2, Download, Copy, Eye, BarChart3, Mail, MessageSquare, Calendar, MapPin, Users, DollarSign, ExternalLink, Image, FileText, Video, Music, Plus, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface PromotionMaterial {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document' | 'social';
  description: string;
  url: string;
  downloads: number;
  shares: number;
  createdAt: string;
}

interface SocialPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'facebook' | 'instagram';
  content: string;
  image?: string;
  scheduledDate?: string;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
}

interface PromotionCampaign {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  budget: number;
  status: 'active' | 'paused' | 'completed';
  metrics: {
    reach: number;
    clicks: number;
    conversions: number;
    roi: number;
  };
}

const mockMaterials: PromotionMaterial[] = [
  {
    id: '1',
    name: 'Event Banner',
    type: 'image',
    description: 'High-resolution banner for social media and websites',
    url: '/materials/event-banner.png',
    downloads: 45,
    shares: 23,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Sponsor Prospectus',
    type: 'document',
    description: 'Detailed sponsorship opportunities and packages',
    url: '/materials/sponsor-prospectus.pdf',
    downloads: 67,
    shares: 34,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Event Video Trailer',
    type: 'video',
    description: 'Promotional video highlighting key speakers and topics',
    url: '/materials/event-trailer.mp4',
    downloads: 89,
    shares: 156,
    createdAt: '2024-01-08'
  }
];

const mockSocialPosts: SocialPost[] = [
  {
    id: '1',
    platform: 'linkedin',
    content: 'Join us for the biggest tech conference of the year! 🚀 Early bird tickets available now. #TechConference #Innovation',
    status: 'published',
    engagement: { likes: 234, shares: 45, comments: 23 }
  },
  {
    id: '2',
    platform: 'twitter',
    content: 'Excited to announce our keynote speakers for #TechConference2024! Check out the lineup 👇',
    status: 'scheduled',
    scheduledDate: '2024-02-01T10:00:00Z',
    engagement: { likes: 0, shares: 0, comments: 0 }
  }
];

const mockCampaigns: PromotionCampaign[] = [
  {
    id: '1',
    name: 'Early Bird Campaign',
    description: 'Promote early bird ticket sales with social media ads',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    budget: 5000,
    status: 'active',
    metrics: { reach: 50000, clicks: 1200, conversions: 89, roi: 2.4 }
  },
  {
    id: '2',
    name: 'Sponsor Outreach',
    description: 'Targeted email and social media campaign for potential sponsors',
    startDate: '2024-01-15',
    endDate: '2024-03-15',
    budget: 3000,
    status: 'active',
    metrics: { reach: 25000, clicks: 800, conversions: 34, roi: 1.8 }
  }
];

const EventPromotion: React.FC = () => {
  const [activeTab, setActiveTab] = useState('materials');
  const [selectedMaterial, setSelectedMaterial] = useState<PromotionMaterial | null>(null);
  const [showPostForm, setShowPostForm] = useState(false);
  const [postForm, setPostForm] = useState({
    platform: 'linkedin' as const,
    content: '',
    image: '',
    scheduledDate: '',
    scheduledTime: ''
  });

  const shareMaterial = (material: PromotionMaterial) => {
    const shareUrl = `${window.location.origin}${material.url}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Link copied!",
      description: "The material link has been copied to your clipboard.",
    });
  };

  const downloadMaterial = (material: PromotionMaterial) => {
    // Simulate download
    toast({
      title: "Download started!",
      description: `${material.name} is being downloaded.`,
    });
  };

  const createSocialPost = () => {
    if (!postForm.content.trim()) {
      toast({
        title: "Content required",
        description: "Please enter content for your social post.",
        variant: "destructive"
      });
      return;
    }

    const newPost: SocialPost = {
      id: Date.now().toString(),
      platform: postForm.platform,
      content: postForm.content,
      image: postForm.image || undefined,
      scheduledDate: postForm.scheduledDate ? `${postForm.scheduledDate}T${postForm.scheduledTime}` : undefined,
      status: postForm.scheduledDate ? 'scheduled' : 'draft',
      engagement: { likes: 0, shares: 0, comments: 0 }
    };

    toast({
      title: postForm.scheduledDate ? "Post scheduled!" : "Post created!",
      description: `Your ${postForm.platform} post has been ${postForm.scheduledDate ? 'scheduled' : 'saved as draft'}.`,
    });

    setShowPostForm(false);
    setPostForm({ platform: 'linkedin', content: '', image: '', scheduledDate: '', scheduledTime: '' });
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return '🐦';
      case 'linkedin': return '💼';
      case 'facebook': return '📘';
      case 'instagram': return '📷';
      default: return '📱';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'twitter': return 'bg-blue-500';
      case 'linkedin': return 'bg-blue-600';
      case 'facebook': return 'bg-blue-700';
      case 'instagram': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Event Promotion</h1>
        <p className="text-muted-foreground">
          Promote your events with professional marketing tools and materials
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="materials">Materials</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Promotional Materials</h2>
              <p className="text-muted-foreground">
                Download and share professional marketing materials
              </p>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Upload Material
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMaterials.map((material) => (
              <Card key={material.id} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {material.type === 'image' && <Image className="h-5 w-5" />}
                      {material.type === 'video' && <Video className="h-5 w-5" />}
                      {material.type === 'document' && <FileText className="h-5 w-5" />}
                      {material.type === 'social' && <Share2 className="h-5 w-5" />}
                      <CardTitle className="text-lg">{material.name}</CardTitle>
                    </div>
                    <Badge variant="secondary">{material.type}</Badge>
                  </div>
                  <CardDescription>{material.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>Downloads: {material.downloads}</span>
                    <span>Shares: {material.shares}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => downloadMaterial(material)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => shareMaterial(material)}>
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Social Media</h2>
              <p className="text-muted-foreground">
                Create and schedule social media posts
              </p>
            </div>
            <Button onClick={() => setShowPostForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </div>

          {showPostForm && (
            <Card>
              <CardHeader>
                <CardTitle>Create Social Post</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="platform">Platform</Label>
                    <Select value={postForm.platform} onValueChange={(value) => setPostForm(prev => ({ ...prev, platform: value as any }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="linkedin">LinkedIn</SelectItem>
                        <SelectItem value="twitter">Twitter</SelectItem>
                        <SelectItem value="facebook">Facebook</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="image">Image URL (Optional)</Label>
                    <Input
                      id="image"
                      value={postForm.image}
                      onChange={(e) => setPostForm(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="content">Post Content</Label>
                  <Textarea
                    id="content"
                    value={postForm.content}
                    onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your post content..."
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="scheduledDate">Schedule Date (Optional)</Label>
                    <Input
                      id="scheduledDate"
                      type="date"
                      value={postForm.scheduledDate}
                      onChange={(e) => setPostForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="scheduledTime">Schedule Time (Optional)</Label>
                    <Input
                      id="scheduledTime"
                      type="time"
                      value={postForm.scheduledTime}
                      onChange={(e) => setPostForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button onClick={createSocialPost} className="flex-1">
                    {postForm.scheduledDate ? 'Schedule Post' : 'Create Draft'}
                  </Button>
                  <Button variant="outline" onClick={() => setShowPostForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-4">
            {mockSocialPosts.map((post) => (
              <Card key={post.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${getPlatformColor(post.platform)}`}>
                        {getPlatformIcon(post.platform)}
                      </div>
                      <div>
                        <CardTitle className="text-lg capitalize">{post.platform}</CardTitle>
                        <CardDescription>
                          {post.status === 'scheduled' && post.scheduledDate 
                            ? `Scheduled for ${new Date(post.scheduledDate).toLocaleString()}`
                            : `Published ${new Date().toLocaleDateString()}`
                          }
                        </CardDescription>
                      </div>
                    </div>
                    <Badge variant={
                      post.status === 'published' ? 'default' :
                      post.status === 'scheduled' ? 'secondary' :
                      post.status === 'failed' ? 'destructive' : 'outline'
                    }>
                      {post.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-3">{post.content}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <span>❤️</span>
                      <span>{post.engagement.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>🔄</span>
                      <span>{post.engagement.shares}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span>💬</span>
                      <span>{post.engagement.comments}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Marketing Campaigns</h2>
              <p className="text-muted-foreground">
                Track and manage your promotional campaigns
              </p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Campaign
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    <Badge variant={
                      campaign.status === 'active' ? 'default' :
                      campaign.status === 'paused' ? 'secondary' : 'outline'
                    }>
                      {campaign.status}
                    </Badge>
                  </div>
                  <CardDescription>{campaign.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Budget</p>
                      <p className="font-medium">${campaign.budget.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">ROI</p>
                      <p className="font-medium">{campaign.metrics.roi}x</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Reach</p>
                      <p className="font-medium">{campaign.metrics.reach.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Conversions</p>
                      <p className="font-medium">{campaign.metrics.conversions}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Promotion Analytics</h2>
            <p className="text-muted-foreground">
              Track the performance of your promotional activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">75,000</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.5%</div>
                <p className="text-xs text-muted-foreground">
                  +2.1% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">123</div>
                <p className="text-xs text-muted-foreground">
                  +18% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROI</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4x</div>
                <p className="text-xs text-muted-foreground">
                  +0.3x from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['LinkedIn', 'Twitter', 'Facebook', 'Instagram'].map((platform) => (
                  <div key={platform} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
                        {platform.charAt(0)}
                      </div>
                      <span className="font-medium">{platform}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <span>Reach: {Math.floor(Math.random() * 20000) + 5000}</span>
                      <span>Engagement: {(Math.random() * 10 + 2).toFixed(1)}%</span>
                      <span>Clicks: {Math.floor(Math.random() * 500) + 100}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventPromotion; 