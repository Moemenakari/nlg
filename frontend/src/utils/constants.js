// Color Palette
export const COLORS = {
  primary: {
    navy: '#1a2332',
    red: '#E53935',
    yellow: '#FFD700',
    white: '#FFFFFF',
    lightGray: '#F5F5F5',
    darkGray: '#212121',
    mediumGray: '#666666',
    borderGray: '#E0E0E0',
  },
};

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    text: 'Best decision we made for our school festival!',
    author: 'Ahmad',
    role: 'School Principal',
    rating: 5,
  },
  {
    id: 2,
    text: 'The games were a huge hit at our corporate event.',
    author: 'Fatima',
    role: 'Event Manager',
    rating: 5,
  },
  {
    id: 3,
    text: 'Professional service and amazing customer support.',
    author: 'Hassan',
    role: 'Wedding Organizer',
    rating: 5,
  },
];

// Contact Information
export const CONTACT_INFO = {
  email: 'mouemenakkarie3@gmail.com',
  phone: '+96170420110',
  whatsapp: '+96170420110',
  address: 'Tripoli, Lebanon',
};

// FAQ Items - Lebanon SEO Optimized
export const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How much does it cost to rent arcade games in Lebanon?',
    answer: 'Arcade game rental prices in Lebanon vary by game type, event duration, and location. Contact Next Level Game – Arcades for a custom quote for your event. We serve all of Lebanon with competitive pricing for festivals, corporate events, schools, and universities.',
  },
  {
    id: 2,
    question: 'What areas in Lebanon do you serve?',
    answer: 'We deliver arcade games across all Lebanon including Beirut, Tripoli, Sidon, Tyre, Jounieh, Zahle, Baalbek, and all Lebanese cities and regions. Our mobile arcade service covers the entire country from north to south.',
  },
  {
    id: 3,
    question: 'What types of events can rent arcade games in Lebanon?',
    answer: 'Our arcade games are perfect for university festivals, school events, corporate gatherings, weddings, mall activations, public festivals, Eid celebrations, Christmas events, and any gathering in Lebanon that needs entertainment.',
  },
  {
    id: 4,
    question: 'Do you provide setup and operation for arcade games?',
    answer: 'Yes! We deliver, set up, and can provide operators for all our arcade games across Lebanon. Full-service event arcade rental with professional support throughout your event.',
  },
  {
    id: 5,
    question: 'What arcade games do you have available in Lebanon?',
    answer: 'We offer boxing arcade machines, King of the Hammer, basketball arcade games, cone games, classic arcade games, and complete event arcade setups throughout Lebanon. All games are professionally maintained and event-ready.',
  },
  {
    id: 6,
    question: 'How do I book arcade games for my event in Lebanon?',
    answer: 'Contact Next Level Game – Arcades via WhatsApp, phone, or our website booking form. We\'ll help you choose the perfect arcade games for your Lebanon event and provide a custom quote based on your needs.',
  },
  {
    id: 7,
    question: 'كيف أحجز ألعاب أركيد لإيفنت في لبنان؟',
    answer: 'تواصل معنا عبر واتساب أو الهاتف لحجز ألعاب الأركيد لإيفنتك في لبنان. نوفر جميع أنواع ألعاب الأركيد للمهرجانات والإيفنتات في كل المناطق اللبنانية.',
  },
];

// NOTE: All game data is now fetched from the backend API
// No static game data is stored in this file
// Frontend pages fetch from: http://localhost:5000/api/games
// Admin adds games through: POST http://localhost:5000/api/games
