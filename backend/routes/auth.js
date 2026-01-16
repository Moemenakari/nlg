const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { validateAuth } = require('../middleware/validation');

// Public routes
router.post('/login', validateAuth, authController.login);

// Protected routes
router.get('/me', verifyToken, authController.getCurrentUser);

module.exports = router;
