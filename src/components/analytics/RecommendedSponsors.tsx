import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RecommendedSponsors = () => (
  <Card>
    <CardHeader>
      <CardTitle>Recommended Sponsors (Demo)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-muted-foreground py-8">
        Demo data: TechCorp, HealthPlus, StartupHub
      </div>
    </CardContent>
  </Card>
);

export default RecommendedSponsors; 