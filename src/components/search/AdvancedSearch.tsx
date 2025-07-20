import React, { useState, useEffect } from 'react';
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
import { Search, Filter, Save, Bookmark, X, Plus, Edit, Trash2, Star, MapPin, Calendar, Users, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { demoEvents } from '@/data/demoEvents';
import { demoSponsors } from '@/data/demoSponsors';

interface SearchFilter {
  id: string;
  name: string;
  description: string;
  filters: SearchCriteria;
  isDefault?: boolean;
  createdAt: string;
}

interface SearchCriteria {
  keywords: string;
  categories: string[];
  dateRange: {
    start: string;
    end: string;
  };
  location: string;
  budgetRange: {
    min: number;
    max: number;
  };
  attendanceRange: {
    min: number;
    max: number;
  };
  status: string[];
  tags: string[];
}

interface SearchResult {
  id: string;
  type: 'event' | 'sponsor';
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  budget: number;
  attendance: number;
  status: string;
  tags: string[];
  matchScore: number;
}

const getAllDemoResults = () => {
  // Map demoEvents to SearchResult
  const eventResults: SearchResult[] = demoEvents.map(event => ({
    id: event.id,
    type: 'event',
    title: event.title,
    description: event.description,
    category: event.category,
    location: event.location,
    date: event.event_date,
    budget: parseInt(event.budget_range.replace(/[^\d]/g, '')) || 0,
    attendance: event.audience_size,
    status: event.status,
    tags: event.tags,
    matchScore: Math.floor(Math.random() * 21) + 80 // 80-100
  }));
  // Map demoSponsors to SearchResult
  const sponsorResults: SearchResult[] = demoSponsors.map(sponsor => ({
    id: sponsor.id,
    type: 'sponsor',
    title: sponsor.company_name,
    description: sponsor.description,
    category: sponsor.industry,
    location: sponsor.contact_info && 'location' in sponsor.contact_info ? (sponsor.contact_info.location as string) : 'N/A',
    date: '2024-01-01',
    budget: parseInt(sponsor.budget_range.replace(/[^\d]/g, '')) || 0,
    attendance: 0,
    status: 'active',
    tags: sponsor.marketing_goals ? [sponsor.marketing_goals] : [],
    matchScore: Math.floor(Math.random() * 21) + 80 // 80-100
  }));
  return [...eventResults, ...sponsorResults];
};

const defaultFilters: SearchFilter[] = [
  {
    id: 'default',
    name: 'Default Search',
    description: 'Basic search with minimal filters',
    filters: {
      keywords: '',
      categories: [],
      dateRange: { start: '', end: '' },
      location: '',
      budgetRange: { min: 0, max: 50000 },
      attendanceRange: { min: 0, max: 10000 },
      status: ['active'],
      tags: []
    },
    isDefault: true,
    createdAt: new Date().toISOString()
  }
];

const AdvancedSearch: React.FC = () => {
  const [searchFilters, setSearchFilters] = useState<SearchFilter[]>(defaultFilters);
  const [currentFilter, setCurrentFilter] = useState<SearchCriteria>(defaultFilters[0].filters);
  const [searchResults, setSearchResults] = useState<SearchResult[]>(getAllDemoResults());
  const [savedFilters, setSavedFilters] = useState<SearchFilter[]>([]);
  const [activeTab, setActiveTab] = useState('search');
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [filterName, setFilterName] = useState('');
  const [filterDescription, setFilterDescription] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const categories = ['Technology', 'Marketing', 'Finance', 'Healthcare', 'Education', 'Entertainment', 'Sports', 'Non-profit'];
  const statuses = ['active', 'pending', 'completed', 'cancelled'];
  const popularTags = ['tech', 'conference', 'networking', 'startup', 'enterprise', 'digital', 'innovation'];

  const performSearch = async () => {
    setIsSearching(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Filter results based on current criteria
    let results = getAllDemoResults();

    if (currentFilter.keywords) {
      results = results.filter(result => 
        result.title.toLowerCase().includes(currentFilter.keywords.toLowerCase()) ||
        result.description.toLowerCase().includes(currentFilter.keywords.toLowerCase())
      );
    }

    if (currentFilter.categories.length > 0) {
      results = results.filter(result => currentFilter.categories.includes(result.category));
    }

    if (currentFilter.location) {
      results = results.filter(result => result.location.toLowerCase().includes(currentFilter.location.toLowerCase()));
    }

    if (currentFilter.dateRange.start) {
      results = results.filter(result => new Date(result.date) >= new Date(currentFilter.dateRange.start));
    }
    if (currentFilter.dateRange.end) {
      results = results.filter(result => new Date(result.date) <= new Date(currentFilter.dateRange.end));
    }

    if (currentFilter.budgetRange.min > 0 || currentFilter.budgetRange.max < 50000) {
      results = results.filter(result => result.budget >= currentFilter.budgetRange.min && result.budget <= currentFilter.budgetRange.max);
    }

    if (currentFilter.attendanceRange.min > 0 || currentFilter.attendanceRange.max < 10000) {
      results = results.filter(result => result.attendance >= currentFilter.attendanceRange.min && result.attendance <= currentFilter.attendanceRange.max);
    }

    if (currentFilter.status.length > 0) {
      results = results.filter(result => currentFilter.status.includes(result.status));
    }

    if (currentFilter.tags.length > 0) {
      results = results.filter(result => result.tags.some(tag => currentFilter.tags.includes(tag)));
    }

    // Calculate match scores
    const scoredResults = results.map(result => ({
      ...result,
      matchScore: Math.floor(Math.random() * 30) + 70 // Simulate scoring
    }));

    setSearchResults(scoredResults.sort((a, b) => b.matchScore - a.matchScore));
    setIsSearching(false);
  };

  const saveFilter = () => {
    if (!filterName.trim()) {
      toast({
        title: "Filter name required",
        description: "Please enter a name for your saved filter.",
        variant: "destructive"
      });
      return;
    }

    const newFilter: SearchFilter = {
      id: Date.now().toString(),
      name: filterName,
      description: filterDescription,
      filters: { ...currentFilter },
      createdAt: new Date().toISOString()
    };

    setSavedFilters(prev => [...prev, newFilter]);
    setShowSaveDialog(false);
    setFilterName('');
    setFilterDescription('');

    toast({
      title: "Filter saved!",
      description: "Your search filter has been saved successfully.",
    });
  };

  const loadFilter = (filter: SearchFilter) => {
    setCurrentFilter(filter.filters);
    toast({
      title: "Filter loaded!",
      description: `Applied "${filter.name}" filter to your search.`,
    });
  };

  const deleteFilter = (filterId: string) => {
    setSavedFilters(prev => prev.filter(f => f.id !== filterId));
    toast({
      title: "Filter deleted!",
      description: "The saved filter has been removed.",
    });
  };

  const clearFilters = () => {
    setCurrentFilter(defaultFilters[0].filters);
    toast({
      title: "Filters cleared!",
      description: "All search filters have been reset to default.",
    });
  };

  useEffect(() => {
    performSearch();
  }, [currentFilter]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Advanced Search</h1>
        <p className="text-muted-foreground">
          Find events and sponsors with powerful search filters
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="filters">Saved Filters</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Search Criteria</CardTitle>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={clearFilters}>
                        Clear All
                      </Button>
                      <Button variant="outline" onClick={() => setShowSaveDialog(true)}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Filter
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="keywords">Keywords</Label>
                    <Input
                      id="keywords"
                      placeholder="Search for events, sponsors, or topics..."
                      value={currentFilter.keywords}
                      onChange={(e) => setCurrentFilter(prev => ({ ...prev, keywords: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Categories</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              checked={currentFilter.categories.includes(category)}
                              onCheckedChange={(checked) => {
                                setCurrentFilter(prev => ({
                                  ...prev,
                                  categories: checked 
                                    ? [...prev.categories, category]
                                    : prev.categories.filter(c => c !== category)
                                }));
                              }}
                            />
                            <Label className="text-sm">{category}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label>Status</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {statuses.map((status) => (
                          <div key={status} className="flex items-center space-x-2">
                            <Checkbox
                              checked={currentFilter.status.includes(status)}
                              onCheckedChange={(checked) => {
                                setCurrentFilter(prev => ({
                                  ...prev,
                                  status: checked 
                                    ? [...prev.status, status]
                                    : prev.status.filter(s => s !== status)
                                }));
                              }}
                            />
                            <Label className="text-sm capitalize">{status}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, State, or Country"
                        value={currentFilter.location}
                        onChange={(e) => setCurrentFilter(prev => ({ ...prev, location: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label>Date Range</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input
                          type="date"
                          value={currentFilter.dateRange.start}
                          onChange={(e) => setCurrentFilter(prev => ({ 
                            ...prev, 
                            dateRange: { ...prev.dateRange, start: e.target.value }
                          }))}
                        />
                        <Input
                          type="date"
                          value={currentFilter.dateRange.end}
                          onChange={(e) => setCurrentFilter(prev => ({ 
                            ...prev, 
                            dateRange: { ...prev.dateRange, end: e.target.value }
                          }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Budget Range ($)</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={currentFilter.budgetRange.min}
                          onChange={(e) => setCurrentFilter(prev => ({ 
                            ...prev, 
                            budgetRange: { ...prev.budgetRange, min: parseInt(e.target.value) || 0 }
                          }))}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={currentFilter.budgetRange.max}
                          onChange={(e) => setCurrentFilter(prev => ({ 
                            ...prev, 
                            budgetRange: { ...prev.budgetRange, max: parseInt(e.target.value) || 50000 }
                          }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Attendance Range</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={currentFilter.attendanceRange.min}
                          onChange={(e) => setCurrentFilter(prev => ({ 
                            ...prev, 
                            attendanceRange: { ...prev.attendanceRange, min: parseInt(e.target.value) || 0 }
                          }))}
                        />
                        <Input
                          type="number"
                          placeholder="Max"
                          value={currentFilter.attendanceRange.max}
                          onChange={(e) => setCurrentFilter(prev => ({ 
                            ...prev, 
                            attendanceRange: { ...prev.attendanceRange, max: parseInt(e.target.value) || 10000 }
                          }))}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Popular Tags</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {popularTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant={currentFilter.tags.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => {
                            setCurrentFilter(prev => ({
                              ...prev,
                              tags: prev.tags.includes(tag)
                                ? prev.tags.filter(t => t !== tag)
                                : [...prev.tags, tag]
                            }));
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Search className="h-4 w-4 mr-2" />
                    Search Events
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Search Sponsors
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Search Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Results found:</span>
                    <span className="font-medium">{searchResults.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Active filters:</span>
                    <span className="font-medium">
                      {Object.values(currentFilter).filter(v => 
                        Array.isArray(v) ? v.length > 0 : v && v !== '' && v !== 0
                      ).length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Saved filters:</span>
                    <span className="font-medium">{savedFilters.length}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="filters" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Saved Filters</h2>
              <p className="text-muted-foreground">
                Manage your saved search filters
              </p>
            </div>
            <Button onClick={() => setShowSaveDialog(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Save Current Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedFilters.map((filter) => (
              <Card key={filter.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{filter.name}</CardTitle>
                    <div className="flex space-x-1">
                      <Button variant="outline" size="sm" onClick={() => loadFilter(filter)}>
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => deleteFilter(filter.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardDescription>{filter.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Categories:</span>
                      <span>{filter.filters.categories.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span>{filter.filters.location || 'Any'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Budget:</span>
                      <span>${filter.filters.budgetRange.min}-${filter.filters.budgetRange.max}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Created:</span>
                      <span>{new Date(filter.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Search Results</h2>
              <p className="text-muted-foreground">
                {searchResults.length} results found
              </p>
            </div>
            <div className="flex space-x-2">
              <Select>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Sort" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="attendance">Attendance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            {isSearching ? (
              <div className="flex items-center justify-center h-32">
                <div className="text-center space-y-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground">Searching...</p>
                </div>
              </div>
            ) : searchResults.length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center h-32">
                  <div className="text-center space-y-2">
                    <Search className="h-12 w-12 mx-auto text-muted-foreground" />
                    <p className="text-muted-foreground">No results found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search criteria
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              searchResults.map((result) => (
                <Card key={result.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant={result.type === 'event' ? 'default' : 'secondary'}>
                          {result.type}
                        </Badge>
                        <div>
                          <CardTitle className="text-lg">{result.title}</CardTitle>
                          <CardDescription>{result.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {result.matchScore}% match
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{result.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{new Date(result.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${result.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{result.attendance} attendees</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {result.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Save Filter Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Save Search Filter</CardTitle>
              <CardDescription>
                Save your current search criteria for future use
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="filterName">Filter Name</Label>
                <Input
                  id="filterName"
                  value={filterName}
                  onChange={(e) => setFilterName(e.target.value)}
                  placeholder="Enter filter name"
                />
              </div>
              <div>
                <Label htmlFor="filterDescription">Description (Optional)</Label>
                <Textarea
                  id="filterDescription"
                  value={filterDescription}
                  onChange={(e) => setFilterDescription(e.target.value)}
                  placeholder="Describe this filter"
                  rows={3}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={saveFilter} className="flex-1">
                  Save Filter
                </Button>
                <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearch; 