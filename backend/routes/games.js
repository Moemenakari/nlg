const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const { verifyAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Multer setup for image upload with validation
const storage = multer.diskStorage({
  destination: 'uploads/games/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed (JPEG, PNG, GIF, WebP)'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// Public routes
router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGame);

// Admin routes
router.post('/', verifyAdmin, upload.single('image'), gamesController.createGame);
router.put('/:id', verifyAdmin, upload.single('image'), gamesController.updateGame);
router.delete('/:id', verifyAdmin, gamesController.deleteGame);

module.exports = router;
