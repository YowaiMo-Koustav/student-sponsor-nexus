import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'event';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'SponsorSync - AI-Powered Event-Sponsor Matching Platform',
  description = 'Connect student events with perfect sponsors using AI-powered matching. Streamline event sponsorship with professional tools and analytics.',
  keywords = [
    'event sponsorship',
    'student events',
    'sponsor matching',
    'AI matching',
    'event management',
    'sponsorship platform',
    'student organizations',
    'event planning',
    'sponsor discovery',
    'event analytics'
  ],
  image = '/og-image.png',
  url = typeof window !== 'undefined' ? window.location.href : 'https://sponsorsync.com',
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'SponsorSync',
  section,
  tags = [],
  noindex = false,
  nofollow = false
}) => {
  const fullTitle = title.includes('SponsorSync') ? title : `${title} | SponsorSync`;
  const fullDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  const fullKeywords = [...keywords, 'SponsorSync', 'event sponsorship', 'AI matching'].join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      <meta name="keywords" content={fullKeywords} />
      <meta name="author" content={author} />
      
      {/* Robots Meta */}
      <meta name="robots" content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="SponsorSync" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@sponsorsync" />
      <meta name="twitter:creator" content="@sponsorsync" />
      
      {/* Article Specific Meta Tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Event Specific Meta Tags */}
      {type === 'event' && (
        <>
          {publishedTime && <meta property="event:start_time" content={publishedTime} />}
          {modifiedTime && <meta property="event:end_time" content={modifiedTime} />}
        </>
      )}
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      
      {/* Additional Meta Tags for Better SEO */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="SponsorSync" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "SponsorSync",
          "description": fullDescription,
          "url": "https://sponsorsync.com",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web Browser",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "author": {
            "@type": "Organization",
            "name": "SponsorSync",
            "url": "https://sponsorsync.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "SponsorSync",
            "url": "https://sponsorsync.com"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "1250"
          }
        })}
      </script>
      
      {/* Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "SponsorSync",
          "url": "https://sponsorsync.com",
          "logo": "https://sponsorsync.com/logo.png",
          "description": fullDescription,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "123 Innovation Drive",
            "addressLocality": "Tech City",
            "addressRegion": "TC",
            "postalCode": "12345",
            "addressCountry": "US"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-123-4567",
            "contactType": "customer service",
            "email": "hello@sponsorsync.com"
          },
          "sameAs": [
            "https://facebook.com/sponsorsync",
            "https://twitter.com/sponsorsync",
            "https://linkedin.com/company/sponsorsync",
            "https://instagram.com/sponsorsync"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead; 