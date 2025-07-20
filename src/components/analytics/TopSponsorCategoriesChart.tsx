import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TopSponsorCategoriesChart = () => (
  <Card>
    <CardHeader>
      <CardTitle>Top Sponsor Categories (Demo)</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="text-center text-muted-foreground py-8">
        Demo data: Technology, Health, Business
      </div>
    </CardContent>
  </Card>
);

export default TopSponsorCategoriesChart; 