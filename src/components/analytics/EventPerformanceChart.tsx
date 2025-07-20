import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EventPerformanceChart = () => (
  <Card>
    <CardHeader>
      <CardTitle>Event Performance (Demo)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-muted-foreground py-8">
        Demo data: 95% event success rate
      </div>
    </CardContent>
  </Card>
);

export default EventPerformanceChart; 