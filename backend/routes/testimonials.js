const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');
const { verifyAdmin } = require('../middleware/auth');

// Public route
router.get('/', testimonialController.getAllTestimonials);

// Admin routes
router.post('/', verifyAdmin, testimonialController.createTestimonial);
router.delete('/:id', verifyAdmin, testimonialController.deleteTestimonial);

module.exports = router;
