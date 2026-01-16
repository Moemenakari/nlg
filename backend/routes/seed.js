const express = require('express');
const seedController = require('../controllers/seedController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');

const router = express.Router();

// Seed routes - only accessible to authenticated admins
router.post('/games', verifyAdmin, seedController.seedGames);
router.post('/testimonials', verifyAdmin, seedController.seedTestimonials);
router.post('/clear-all', verifyAdmin, seedController.clearAllData);

module.exports = router;
