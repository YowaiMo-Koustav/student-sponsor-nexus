import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecommendedEvents = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recommended Events (Demo)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-muted-foreground py-8">
        Demo data: Tech Innovation Summit, Health & Wellness Fair
      </div>
    </CardContent>
  </Card>
);

export default RecommendedEvents; 