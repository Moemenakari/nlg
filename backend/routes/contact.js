const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { verifyAdmin } = require('../middleware/auth');
const { validateContact } = require('../middleware/validation');

// Public route
router.post('/', validateContact, contactController.createContact);

// Admin routes
router.get('/', verifyAdmin, contactController.getAllContacts);
router.get('/:id', verifyAdmin, contactController.getContact);
router.patch('/:id/status', verifyAdmin, contactController.updateContactStatus);

module.exports = router;
