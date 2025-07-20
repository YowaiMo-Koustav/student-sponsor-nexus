import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Brain, 
  Users, 
  TrendingUp, 
  Shield, 
  Zap, 
  Calendar,
  Star,
  Target,
  BarChart3,
  FileText,
  MessageSquare,
  Search,
  Megaphone,
  Award,
  Clock,
  CheckCircle
} from "lucide-react";

const FeaturesSection = () => {
  const coreFeatures = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our intelligent algorithm analyzes event types, audience demographics, and sponsor preferences to create perfect matches with 95% accuracy.",
      color: "text-primary",
      highlight: "95% Match Accuracy"
    },
    {
      icon: Users,
      title: "Smart Event Discovery",
      description: "Comprehensive event showcases with audience insights, past performance metrics, and engagement analytics for informed decisions.",
      color: "text-accent",
      highlight: "Real-time Analytics"
    },
    {
      icon: TrendingUp,
      title: "ROI Tracking",
      description: "Real-time performance monitoring with detailed analytics to measure sponsorship success and impact across all campaigns.",
      color: "text-success",
      highlight: "Performance Insights"
    }
  ];

  const premiumFeatures = [
    {
      icon: FileText,
      title: "Proposal Templates",
      description: "Professional event proposal templates for conferences, hackathons, workshops, and more with customizable variables.",
      link: "/proposals",
      badge: "Premium"
    },
    {
      icon: FileText,
      title: "Contract Generator",
      description: "Automated sponsorship contract generation with standard and premium templates, variable filling, and legal compliance.",
      link: "/contracts",
      badge: "Premium"
    },
    {
      icon: Calendar,
      title: "Calendar Integration",
      description: "Seamless calendar integration with Google Calendar, Outlook, and iCal for event scheduling and management.",
      link: "/calendar",
      badge: "Premium"
    },
    {
      icon: MessageSquare,
      title: "Bulk Messaging",
      description: "Efficient bulk messaging system with template selection, recipient filtering, and scheduled campaigns.",
      link: "/bulk-messaging",
      badge: "Premium"
    },
    {
      icon: Search,
      title: "Advanced Search",
      description: "Powerful search with saved filters, comprehensive criteria, real-time results, and intelligent scoring.",
      link: "/search",
      badge: "Premium"
    },
    {
      icon: Megaphone,
      title: "Event Promotion",
      description: "Marketing materials, social media post creation, campaign management, and promotion analytics.",
      link: "/promotion",
      badge: "Premium"
    }
  ];

  const benefits = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Find perfect matches in minutes, not months"
    },
    {
      icon: Shield,
      title: "Verified Partners",
      description: "All organizations and sponsors are thoroughly vetted"
    },
    {
      icon: Clock,
      title: "Streamlined Process",
      description: "From discovery to contract signing in one platform"
    },
    {
      icon: Star,
      title: "Quality Matches",
      description: "95% match satisfaction rate from our users"
    },
    {
      icon: Target,
      title: "Targeted Reach",
      description: "Connect with your exact target demographic"
    },
    {
      icon: CheckCircle,
      title: "Success Guaranteed",
      description: "Proven track record with $2M+ in sponsorships"
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              SponsorSync
            </span>
            ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The most advanced sponsorship platform designed for the modern digital age. 
            Powered by AI, enhanced with premium features, trusted by thousands.
          </p>
        </div>

        {/* Core Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Core Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coreFeatures.map((feature, index) => (
              <Card 
                key={feature.title} 
                className="p-8 border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-card hover:scale-105 bg-gradient-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-xl bg-gradient-primary flex items-center justify-center mb-6 ${feature.color}`}>
                  <feature.icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <div className="inline-block bg-primary/10 text-primary text-xs font-medium px-3 py-1 rounded-full">
                    {feature.highlight}
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium Features */}
        <div className="mb-20">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Premium Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumFeatures.map((feature, index) => (
              <Card 
                key={feature.title}
                className="p-6 hover:shadow-card transition-all duration-300 hover:scale-105 border hover:border-accent/20 group"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold text-foreground">
                        {feature.title}
                      </h4>
                      <span className="bg-accent/10 text-accent text-xs font-medium px-2 py-1 rounded-full">
                        {feature.badge}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {feature.description}
                    </p>
                    <Button variant="ghost" size="sm" className="p-0 h-auto text-accent hover:text-accent/80" asChild>
                      <Link to={feature.link}>
                        Learn More →
                      </Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Why It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card 
                key={benefit.title}
                className="p-6 hover:shadow-card transition-all duration-300 hover:scale-105 border hover:border-primary/20"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-hero rounded-2xl p-12 shadow-hero">
          <h3 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Sponsorship Game?
          </h3>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of organizations and sponsors who've found their perfect match.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="accent" size="xl" className="group" asChild>
              <Link to="/for-students">
                Start For Students
                <Users className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
            <Button variant="professional" size="xl" className="group" asChild>
              <Link to="/for-sponsors">
                Start For Sponsors
                <Target className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="group" asChild>
              <Link to="/dashboard">
                View Demo
                <Award className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;