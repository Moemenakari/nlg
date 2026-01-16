const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');
const { verifyToken, verifyAdmin } = require('../middleware/auth');
const { validateBooking } = require('../middleware/validation');

// Public routes
router.post('/', validateBooking, bookingsController.createBooking);

// Admin routes
router.get('/', verifyAdmin, bookingsController.getAllBookings);
router.get('/:id', verifyAdmin, bookingsController.getBooking);
router.patch('/:id/status', verifyAdmin, bookingsController.updateBookingStatus);

module.exports = router;
