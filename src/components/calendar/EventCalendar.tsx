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
import { Calendar, Clock, MapPin, Users, ExternalLink, Download, Share2, Plus, Edit, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  attendees: string[];
  calendarType: 'google' | 'outlook' | 'ical';
  isRecurring: boolean;
  recurrencePattern?: string;
}

interface CalendarProvider {
  id: string;
  name: string;
  description: string;
  icon: string;
  supportedFeatures: string[];
}

const calendarProviders: CalendarProvider[] = [
  {
    id: 'google',
    name: 'Google Calendar',
    description: 'Integrate with Google Calendar for seamless scheduling',
    icon: '📅',
    supportedFeatures: ['Recurring events', 'Attendee management', 'Video conferencing', 'Reminders']
  },
  {
    id: 'outlook',
    name: 'Microsoft Outlook',
    description: 'Connect with Outlook for enterprise calendar management',
    icon: '📧',
    supportedFeatures: ['Team scheduling', 'Resource booking', 'Meeting rooms', 'Availability sharing']
  },
  {
    id: 'ical',
    name: 'iCal Integration',
    description: 'Universal calendar format for cross-platform compatibility',
    icon: '📋',
    supportedFeatures: ['Universal format', 'Offline support', 'Multiple platforms', 'Export/Import']
  }
];

const EventCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [activeTab, setActiveTab] = useState('calendar');

  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    attendees: '',
    calendarType: 'google' as 'google' | 'outlook' | 'ical',
    isRecurring: false,
    recurrencePattern: ''
  });

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEvent: CalendarEvent = {
      id: editingEvent?.id || Date.now().toString(),
      title: eventForm.title,
      description: eventForm.description,
      startDate: eventForm.startDate,
      endDate: eventForm.endDate,
      location: eventForm.location,
      attendees: eventForm.attendees.split(',').map(email => email.trim()).filter(Boolean),
      calendarType: eventForm.calendarType,
      isRecurring: eventForm.isRecurring,
      recurrencePattern: eventForm.recurrencePattern
    };

    if (editingEvent) {
      setEvents(prev => prev.map(event => event.id === editingEvent.id ? newEvent : event));
      toast({
        title: "Event updated!",
        description: "Your event has been updated successfully.",
      });
    } else {
      setEvents(prev => [...prev, newEvent]);
      toast({
        title: "Event created!",
        description: "Your event has been added to the calendar.",
      });
    }

    setShowEventForm(false);
    setEditingEvent(null);
    resetForm();
  };

  const resetForm = () => {
    setEventForm({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      location: '',
      attendees: '',
      calendarType: 'google',
      isRecurring: false,
      recurrencePattern: ''
    });
  };

  const editEvent = (event: CalendarEvent) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      location: event.location,
      attendees: event.attendees.join(', '),
      calendarType: event.calendarType,
      isRecurring: event.isRecurring,
      recurrencePattern: event.recurrencePattern || ''
    });
    setShowEventForm(true);
  };

  const deleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    toast({
      title: "Event deleted!",
      description: "The event has been removed from your calendar.",
    });
  };

  const exportToCalendar = (event: CalendarEvent) => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//SponsorSync//Event Calendar//EN
BEGIN:VEVENT
UID:${event.id}@sponsorsync.com
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${event.startDate.replace(/[-:]/g, '').split('.')[0]}Z
DTEND:${event.endDate.replace(/[-:]/g, '').split('.')[0]}Z
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.title.replace(/\s+/g, '-')}.ics`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Calendar file exported!",
      description: "The event has been exported as an .ics file.",
    });
  };

  const shareEvent = (event: CalendarEvent) => {
    const shareUrl = `${window.location.origin}/event/${event.id}`;
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "Event link copied!",
      description: "The event link has been copied to your clipboard.",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Event Calendar</h1>
        <p className="text-muted-foreground">
          Schedule and manage your events with calendar integration
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Event Calendar</CardTitle>
                    <Button onClick={() => setShowEventForm(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Event
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="min-h-[400px] flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center space-y-2">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground" />
                      <p className="text-muted-foreground">Calendar view coming soon</p>
                      <p className="text-sm text-muted-foreground">
                        View your events in the Events tab
                      </p>
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
                    <Plus className="h-4 w-4 mr-2" />
                    Create Event
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export Calendar
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Calendar
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {events.length === 0 ? (
                    <p className="text-muted-foreground text-sm">
                      No upcoming events
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {events.slice(0, 3).map((event) => (
                        <div key={event.id} className="p-3 bg-muted rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{event.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(event.startDate).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {event.calendarType}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Events</h2>
              <p className="text-muted-foreground">
                Manage your scheduled events
              </p>
            </div>
            <Button onClick={() => setShowEventForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>

          {showEventForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleEventSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Event Title</Label>
                      <Input
                        id="title"
                        value={eventForm.title}
                        onChange={(e) => setEventForm(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter event title"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={eventForm.location}
                        onChange={(e) => setEventForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="Enter event location"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={eventForm.description}
                      onChange={(e) => setEventForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Enter event description"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="startDate">Start Date & Time</Label>
                      <Input
                        id="startDate"
                        type="datetime-local"
                        value={eventForm.startDate}
                        onChange={(e) => setEventForm(prev => ({ ...prev, startDate: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="endDate">End Date & Time</Label>
                      <Input
                        id="endDate"
                        type="datetime-local"
                        value={eventForm.endDate}
                        onChange={(e) => setEventForm(prev => ({ ...prev, endDate: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="attendees">Attendees (comma-separated emails)</Label>
                    <Input
                      id="attendees"
                      value={eventForm.attendees}
                      onChange={(e) => setEventForm(prev => ({ ...prev, attendees: e.target.value }))}
                      placeholder="email1@example.com, email2@example.com"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="calendarType">Calendar Type</Label>
                      <Select
                        value={eventForm.calendarType}
                        onValueChange={(value) => setEventForm(prev => ({ ...prev, calendarType: value as 'google' | 'outlook' | 'ical' }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="google">Google Calendar</SelectItem>
                          <SelectItem value="outlook">Microsoft Outlook</SelectItem>
                          <SelectItem value="ical">iCal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isRecurring"
                        checked={eventForm.isRecurring}
                        onChange={(e) => setEventForm(prev => ({ ...prev, isRecurring: e.target.checked }))}
                      />
                      <Label htmlFor="isRecurring">Recurring Event</Label>
                    </div>
                  </div>

                  {eventForm.isRecurring && (
                    <div>
                      <Label htmlFor="recurrencePattern">Recurrence Pattern</Label>
                      <Select
                        value={eventForm.recurrencePattern}
                        onValueChange={(value) => setEventForm(prev => ({ ...prev, recurrencePattern: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select recurrence pattern" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="yearly">Yearly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="flex space-x-2">
                    <Button type="submit" className="flex-1">
                      {editingEvent ? 'Update Event' : 'Create Event'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowEventForm(false);
                        setEditingEvent(null);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <Card key={event.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <Badge variant="secondary">{event.calendarType}</Badge>
                  </div>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(event.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(event.startDate).toLocaleTimeString()} - {new Date(event.endDate).toLocaleTimeString()}
                    </span>
                  </div>
                  {event.location && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                  )}
                  {event.attendees.length > 0 && (
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees.length} attendees</span>
                    </div>
                  )}
                  {event.isRecurring && (
                    <Badge variant="outline" className="text-xs">
                      Recurring: {event.recurrencePattern}
                    </Badge>
                  )}
                  
                  <Separator />
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => editEvent(event)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => exportToCalendar(event)}>
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => shareEvent(event)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteEvent(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Calendar Integration</h2>
            <p className="text-muted-foreground">
              Connect your events with popular calendar platforms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {calendarProviders.map((provider) => (
              <Card key={provider.id} className="cursor-pointer hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{provider.icon}</span>
                    <div>
                      <CardTitle>{provider.name}</CardTitle>
                      <CardDescription>{provider.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Supported Features:</p>
                    <div className="space-y-1">
                      {provider.supportedFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Connect {provider.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventCalendar; 