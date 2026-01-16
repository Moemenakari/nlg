/**
 * Input Validation Middleware
 * Validates request data for booking, game, and contact endpoints
 */

// Validate booking data
const validateBooking = (req, res, next) => {
  const { name, email, phone, eventDate } = req.body;

  // Required fields check
  if (!name || !email || !phone) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Name, email, and phone are required'
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Invalid email format'
    });
  }

  // Phone validation (at least 8 digits)
  const phoneDigits = phone.replace(/\D/g, '');
  if (phoneDigits.length < 8) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Phone number must have at least 8 digits'
    });
  }

  // Date validation (if provided, must be in future)
  if (eventDate) {
    const selectedDate = new Date(eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      return res.status(400).json({ 
        error: 'Validation failed',
        details: 'Event date must be in the future'
      });
    }
  }

  next();
};

// Validate game data
const validateGame = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || name.trim().length === 0) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Game name is required'
    });
  }

  if (!price || isNaN(parseFloat(price)) || parseFloat(price) < 0) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Valid price is required'
    });
  }

  next();
};

// Validate contact data
const validateContact = (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Name, email, and message are required'
    });
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Invalid email format'
    });
  }

  if (message.trim().length < 10) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Message must be at least 10 characters'
    });
  }

  next();
};

// Validate testimonial data
const validateTestimonial = (req, res, next) => {
  const { text, author, rating } = req.body;

  if (!text || !author) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Text and author are required'
    });
  }

  if (rating && (rating < 1 || rating > 5)) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Rating must be between 1 and 5'
    });
  }

  next();
};

// Validate auth data
const validateAuth = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      error: 'Validation failed',
      details: 'Username and password are required'
    });
  }

  next();
};

module.exports = {
  validateBooking,
  validateGame,
  validateContact,
  validateTestimonial,
  validateAuth
};
