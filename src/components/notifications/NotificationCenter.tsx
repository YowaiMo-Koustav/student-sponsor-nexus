import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { Button } from '../ui/button';

const NotificationCenter = () => {
  const { user, userRole } = useAuth();

  useEffect(() => {
    if (!user || !userRole) return;

    // Demo notifications - show a welcome notification
    const timer = setTimeout(() => {
      if (userRole === 'student') {
        toast.success('Welcome to SponsorSync!', {
          description: 'Start creating events and connecting with sponsors.',
          action: <Button size="sm">Get Started</Button>,
        });
      } else {
        toast.success('Welcome to SponsorSync!', {
          description: 'Discover events and connect with student organizations.',
          action: <Button size="sm">Explore Events</Button>,
        });
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, userRole]);

  return null; // This component doesn't render anything visible
};

export default NotificationCenter;