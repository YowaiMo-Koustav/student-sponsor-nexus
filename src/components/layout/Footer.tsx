import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink,
  Heart,
  Shield,
  Users,
  Award
} from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const companyInfo = {
    name: 'SponsorSync',
    tagline: 'Connecting student events with perfect sponsors',
    description: 'The leading platform for AI-powered event-sponsor matching, helping student organizations and sponsors create meaningful partnerships.',
    address: '123 Innovation Drive, Tech City, TC 12345',
    phone: '+1 (555) 123-4567',
    email: 'hello@sponsorsync.com',
    founded: '2024'
  };

  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'Success Stories', href: '/success-stories' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
    { name: 'Support', href: '/support' }
  ];

  const productLinks = [
    { name: 'For Students', href: '/for-students' },
    { name: 'For Sponsors', href: '/for-sponsors' },
    { name: 'Event Templates', href: '/templates' },
    { name: 'Analytics', href: '/analytics' },
    { name: 'API Documentation', href: '/api' },
    { name: 'Integrations', href: '/integrations' }
  ];

  const resourceLinks = [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Research', href: '/research' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR Compliance', href: '/gdpr' },
    { name: 'Accessibility', href: '/accessibility' },
    { name: 'Security', href: '/security' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/sponsorsync' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/sponsorsync' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/sponsorsync' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/sponsorsync' }
  ];

  const stats = [
    { label: 'Events Created', value: '10,000+' },
    { label: 'Sponsors Connected', value: '5,000+' },
    { label: 'Successful Matches', value: '25,000+' },
    { label: 'Student Organizations', value: '2,000+' }
  ];

  return (
    <footer className="bg-background border-t">
      {/* Newsletter Section */}
      <div className="bg-muted/50">
        <div className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
              <p className="text-muted-foreground">
                Get the latest insights on event sponsorship, industry trends, and platform updates.
              </p>
            </div>
            <div className="flex space-x-2">
              <Input 
                placeholder="Enter your email address" 
                className="flex-1"
                type="email"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SS</span>
              </div>
              <h3 className="text-xl font-bold">{companyInfo.name}</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              {companyInfo.description}
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{companyInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{companyInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{companyInfo.email}</span>
              </div>
            </div>

            <div className="flex space-x-2 mt-6">
              {socialLinks.map((social) => (
                <Button key={social.name} variant="outline" size="sm" asChild>
                  <a href={social.href} target="_blank" rel="noopener noreferrer">
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-12">
          <Separator className="mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8">
          <div className="flex flex-wrap items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Shield className="h-4 w-4" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>Trusted by 2,000+ Organizations</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>© {currentYear} {companyInfo.name}. All rights reserved.</span>
              <span>•</span>
              <span>Founded {companyInfo.founded}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for the student community</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 