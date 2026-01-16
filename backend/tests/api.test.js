/**
 * API Tests for Next Level Games Backend
 * Run with: npm test
 */

const request = require('supertest');

// Mock the database to avoid actual DB connections in tests
jest.mock('../config/db', () => ({
  getConnection: jest.fn().mockResolvedValue({
    execute: jest.fn().mockResolvedValue([[], []]),
    release: jest.fn()
  })
}));

// Import server after mocking
const express = require('express');
const app = express();
app.use(express.json());

// Import routes
const gamesRoutes = require('../routes/games');
const bookingsRoutes = require('../routes/bookings');
const contactRoutes = require('../routes/contact');
const authRoutes = require('../routes/auth');
const errorHandler = require('../middleware/errorHandler');

// Mount routes
app.use('/api/games', gamesRoutes);
app.use('/api/bookings', bookingsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Error handler
app.use(errorHandler);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

describe('API Health Check', () => {
  test('GET /api/health returns status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status');
  });
});

describe('Games API', () => {
  test('GET /api/games returns array', async () => {
    const response = await request(app).get('/api/games');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });
});

describe('Contact API', () => {
  test('POST /api/contact requires name, email, message', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({ name: 'Test' });
    
    // Should fail validation
    expect(response.status).toBe(400);
  });

  test('POST /api/contact validates email format', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({ 
        name: 'Test User',
        email: 'invalid-email',
        message: 'This is a test message'
      });
    
    expect(response.status).toBe(400);
  });
});

describe('Bookings API', () => {
  test('POST /api/bookings requires name, email, phone', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({ name: 'Test' });
    
    expect(response.status).toBe(400);
  });
});

describe('Auth API', () => {
  test('POST /api/auth/login requires username and password', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({});
    
    expect(response.status).toBe(400);
  });
});
