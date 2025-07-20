import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RevenueChart = () => (
  <Card>
    <CardHeader>
      <CardTitle>Revenue Tracking (Demo)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-muted-foreground py-8">
        Demo data: $42,000 revenue this quarter
      </div>
    </CardContent>
  </Card>
);

export default RevenueChart; 