import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ROITrackingChart = () => (
  <Card>
    <CardHeader>
      <CardTitle>ROI Tracking (Demo)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-muted-foreground py-8">
        Demo data: 4.2x average ROI
      </div>
    </CardContent>
  </Card>
);

export default ROITrackingChart; 