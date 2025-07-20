import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const StudentEngagementChart = () => (
  <Card>
    <CardHeader>
      <CardTitle>Student Engagement (Demo)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-muted-foreground py-8">
        Demo data: 87% engagement rate
      </div>
    </CardContent>
  </Card>
);

export default StudentEngagementChart; 