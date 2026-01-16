require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const rateLimit = require('express-rate-limit');

const db = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Routes
const authRoutes = require('./routes/auth');
const gamesRoutes = require('./routes/games');
const bookingsRoutes = require('./routes/bookings');
const contactRoutes = require('./routes/contact');
const testimonialRoutes = require('./routes/testimonials');
const seedRoutes = require('./routes/seed');

const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' }
});

app.use('/api/', limiter);

// Create upload directories if they don't exist
const uploadDirs = [
  path.join(__dirname, 'uploads'),
  path.join(__dirname, 'uploads', 'games'),
];

uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

// Middleware - CORS configuration for multiple origins
// In production, set CORS_ORIGIN env variable (comma-separated if multiple)
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [
    'http://localhost:3000',
    'http://localhost:4000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:4000'
  ];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('🚫 CORS Blocked Origin:', origin);
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Welcome page for root
app.get('/', (req, res) => {
  res.json({
    message: '🎮 Next Level Games API',
    status: 'Running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      games: '/api/games',
      bookings: '/api/bookings',
      contact: '/api/contact',
      testimonials: '/api/testimonials',
      auth: '/api/auth/login'
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  const uploadsExist = fs.existsSync(path.join(__dirname, 'uploads', 'games'));
  res.json({
    status: 'Backend is running!',
    uploads: uploadsExist ? 'Directory exists' : 'Directory missing'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gamesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/seed', seedRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`\n✅ Backend Server Running on http://localhost:${PORT}`);
  console.log(`✅ CORS enabled for: ${process.env.CORS_ORIGIN}`);
  console.log(`✅ Database: ${process.env.DB_NAME}`);
  
  try {
    const [rows] = await db.query('SHOW TABLES');
    console.log(`✅ Tables found: ${rows.length}`);
    rows.forEach(row => console.log(`   - ${Object.values(row)[0]}`));
  } catch (err) {
    console.error(`❌ DB Verify Error: ${err.message}`);
  }
  console.log('\n');
});
