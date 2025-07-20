import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Event {
  id: string;
  title: string;
  event_date: string;
}

const EventCalendar = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('id, title, event_date')
        .eq('organizer_id', user.id);
        
      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const eventDates = events.map(event => new Date(event.event_date));

  if (loading) return <LoadingSpinner />;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
          modifiers={{
            events: eventDates,
          }}
          modifiersStyles={{
            events: {
              color: 'white',
              backgroundColor: '#8884d8',
            },
          }}
        />
      </CardContent>
    </Card>
  );
};

export default EventCalendar; 