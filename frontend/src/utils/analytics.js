// Google Analytics Utility Functions
// Measurement ID: G-FJ3E88HKNM

const GA_MEASUREMENT_ID = 'G-FJ3E88HKNM';

// Check if user has accepted cookies
export const hasAnalyticsConsent = () => {
  return localStorage.getItem('cookieConsent') === 'accepted';
};

// Initialize Google Analytics
export const initializeGA = () => {
  if (!hasAnalyticsConsent()) return;
  
  // Don't initialize twice
  if (window.gtag) return;
  
  // Load gtag.js script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  // Initialize dataLayer and gtag
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
  
  console.log('✅ Google Analytics initialized');
};

// Track page views
export const trackPageView = (pagePath, pageTitle) => {
  if (!window.gtag) return;
  
  window.gtag('event', 'page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
};

// Track custom events
export const trackEvent = (eventName, category, label, value) => {
  if (!window.gtag) return;
  
  window.gtag('event', eventName, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Specific trackers for important actions
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'contact', 'WhatsApp Button');
};

export const trackGameView = (gameName) => {
  trackEvent('game_view', 'games', gameName);
};

export const trackBookingIntent = () => {
  trackEvent('booking_intent', 'booking', 'Booking Page Viewed');
};

export const trackContactFormSubmit = () => {
  trackEvent('contact_submit', 'contact', 'Contact Form Submitted');
};
