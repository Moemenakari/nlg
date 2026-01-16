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

// FAQ Items
export const FAQ_ITEMS = [
  {
    id: 1,
    question: 'How do I book?',
    answer: 'Simply contact us through WhatsApp, phone, or email with your event details. Our team will provide a quote and confirm availability.',
  },
  {
    id: 2,
    question: 'What is the price?',
    answer: 'Prices vary based on game selection and rental duration. Contact us for a customized quote.',
  },
  {
    id: 3,
    question: 'Is setup included?',
    answer: 'Yes, professional setup and installation are included in all rental packages.',
  },
  {
    id: 4,
    question: 'Which areas do you cover?',
    answer: 'We serve all of Lebanon with delivery and setup services.',
  },
];

// NOTE: All game data is now fetched from the backend API
// No static game data is stored in this file
// Frontend pages fetch from: http://localhost:5000/api/games
// Admin adds games through: POST http://localhost:5000/api/games
