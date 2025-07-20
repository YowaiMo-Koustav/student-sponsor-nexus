import { Card } from "@/components/ui/card";
import { Star, Quote, TrendingUp, Award, Users, DollarSign } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Event Coordinator",
      organization: "Tech Students Alliance",
      content: "SponsorSync helped us secure $25,000 in sponsorships for our AI hackathon. The AI matching was incredible - we connected with TechCorp who provided both funding and mentorship. Our event attendance increased by 40%!",
      rating: 5,
      avatar: "SC",
      metrics: {
        sponsorship: "$25,000",
        attendance: "+40%",
        sponsors: 3
      },
      highlight: "AI Hackathon Success"
    },
    {
      name: "Marcus Rodriguez",
      role: "Marketing Director", 
      organization: "InnovateTech Corp",
      content: "We've sponsored 15 student events through SponsorSync this year. The ROI tracking shows 300% increase in student engagement and 25% boost in brand awareness. Best investment we've made in student marketing.",
      rating: 5,
      avatar: "MR",
      metrics: {
        events: 15,
        engagement: "+300%",
        awareness: "+25%"
      },
      highlight: "Corporate Success"
    },
    {
      name: "Emily Thompson",
      role: "Club President",
      organization: "Business Leaders Society",
      content: "The platform made finding sponsors effortless. We went from months of cold emails to $18,000 in sponsorships in just 3 weeks. Our career fair now attracts top-tier companies.",
      rating: 5,
      avatar: "ET",
      metrics: {
        sponsorship: "$18,000",
        time: "3 weeks",
        companies: 8
      },
      highlight: "Career Fair Success"
    },
    {
      name: "David Park",
      role: "Brand Partnerships Manager",
      organization: "Future Finance",
      content: "SponsorSync's analytics dashboard shows real impact. We can track everything from brand exposure to lead generation. Our student recruitment pipeline has grown by 200%.",
      rating: 5,
      avatar: "DP",
      metrics: {
        recruitment: "+200%",
        leads: 150,
        exposure: "2.3M"
      },
      highlight: "Recruitment Success"
    },
    {
      name: "Lisa Wang",
      role: "Events Manager",
      organization: "STEM Women United",
      content: "The quality of matches is incredible. Every sponsor we've connected with has been a perfect fit. We've secured $30,000 in sponsorships and created lasting partnerships.",
      rating: 5,
      avatar: "LW",
      metrics: {
        sponsorship: "$30,000",
        partnerships: 5,
        satisfaction: "100%"
      },
      highlight: "STEM Initiative Success"
    },
    {
      name: "Alex Johnson",
      role: "Corporate Relations",
      organization: "GreenTech Solutions",
      content: "We've increased our student engagement by 400% since using SponsorSync. The platform helps us find events that truly resonate with our sustainability mission.",
      rating: 5,
      avatar: "AJ",
      metrics: {
        engagement: "+400%",
        events: 12,
        impact: "15.2 tons CO2"
      },
      highlight: "Sustainability Success"
    }
  ];

  const successMetrics = [
    {
      icon: DollarSign,
      value: "$2M+",
      label: "Sponsorships Matched",
      color: "text-success"
    },
    {
      icon: Users,
      value: "500+",
      label: "Student Organizations",
      color: "text-primary"
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Success Rate",
      color: "text-accent"
    },
    {
      icon: Award,
      value: "1,200+",
      label: "Active Sponsors",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display text-foreground mb-6">
            Success Stories from{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Real Users
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how SponsorSync is transforming student-sponsor relationships with measurable results.
          </p>
        </div>

        {/* Success Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {successMetrics.map((metric, index) => (
            <Card 
              key={metric.label}
              className="p-6 text-center hover:shadow-floating transition-all duration-300 hover:scale-105 border hover:border-primary/20 bg-background/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">
                {metric.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {metric.label}
              </div>
            </Card>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="p-6 hover:shadow-floating transition-all duration-300 hover:scale-105 border hover:border-primary/20 bg-background/80 backdrop-blur-sm"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <Quote className="h-6 w-6 text-primary/60" />
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full mb-3">
                  {testimonial.highlight}
                </span>
              </div>
              
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {Object.entries(testimonial.metrics).map(([key, value]) => (
                  <div key={key} className="text-center p-2 bg-muted/50 rounded">
                    <div className="text-xs text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-sm font-semibold text-foreground">
                      {value}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                  <p className="text-sm text-primary font-medium">
                    {testimonial.organization}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <p className="text-muted-foreground mb-8">Trusted by leading universities and companies worldwide</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="px-6 py-3 bg-background/50 rounded-lg border">
              <span className="font-semibold text-lg">Stanford University</span>
            </div>
            <div className="px-6 py-3 bg-background/50 rounded-lg border">
              <span className="font-semibold text-lg">MIT</span>
            </div>
            <div className="px-6 py-3 bg-background/50 rounded-lg border">
              <span className="font-semibold text-lg">Google</span>
            </div>
            <div className="px-6 py-3 bg-background/50 rounded-lg border">
              <span className="font-semibold text-lg">Microsoft</span>
            </div>
            <div className="px-6 py-3 bg-background/50 rounded-lg border">
              <span className="font-semibold text-lg">TechCorp</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;