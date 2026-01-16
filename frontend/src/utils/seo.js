/**
 * SEO Meta Tags Helper
 * Manages document meta tags for SEO optimization
 */

export const updateMetaTags = (config) => {
  const {
    title = 'Next Level Games - #1 Arcade Experience',
    description = 'The #1 arcade experience at festivals, corporate events, and schools. Premium gaming entertainment for all ages.',
    canonical = window.location.href,
    ogImage = '/assets/images/og-image.png',
    ogUrl = window.location.href,
    keywords = 'arcade games, gaming events, festivals, corporate events, entertainment',
  } = config;

  // Update title
  document.title = title;

  // Update or create meta tags
  updateMetaTag('name', 'description', description);
  updateMetaTag('name', 'keywords', keywords);
  updateMetaTag('name', 'viewport', 'width=device-width, initial-scale=1');
  updateMetaTag('name', 'theme-color', '#1a2847');
  
  // Open Graph (Social Media)
  updateMetaTag('property', 'og:title', title);
  updateMetaTag('property', 'og:description', description);
  updateMetaTag('property', 'og:image', ogImage);
  updateMetaTag('property', 'og:url', ogUrl);
  updateMetaTag('property', 'og:type', 'website');
  
  // Twitter Card
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:title', title);
  updateMetaTag('name', 'twitter:description', description);
  updateMetaTag('name', 'twitter:image', ogImage);

  // Canonical URL
  updateCanonical(canonical);
};

/**
 * Helper function to update or create a meta tag
 */
const updateMetaTag = (attribute, attributeValue, content) => {
  let tag = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
  
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, attributeValue);
    document.head.appendChild(tag);
  }
  
  tag.setAttribute('content', content);
};

/**
 * Update canonical URL
 */
const updateCanonical = (url) => {
  let link = document.querySelector('link[rel="canonical"]');
  
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  
  link.setAttribute('href', url);
};

/**
 * Schema.org Structured Data
 * Helps search engines understand your content
 */
export const getStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Next Level Games',
    description: 'The #1 arcade experience at festivals, corporate events, and schools',
    url: 'https://nextlevelgames.com',
    telephone: '+961-1-234-5678',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Tripoli, Lebanon',
      addressCountry: 'LB',
    },
    sameAs: [
      'https://www.facebook.com/share/1D5uGhWqMg/?mibextid=wwXIfr',
      'https://www.instagram.com/nextlevelgame_arcades',
    ],
  };
};

/**
 * Add structured data to page
 */
export const addStructuredData = (data) => {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(data);
  document.head.appendChild(script);
};
