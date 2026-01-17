const express = require('express');
const router = express.Router();
const gamesController = require('../controllers/gamesController');
const { verifyAdmin } = require('../middleware/auth');
const multer = require('multer');

// Use memory storage for Imgur upload
const storage = multer.memoryStorage();

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
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB max (Imgur limit)
});

// Public routes
router.get('/', gamesController.getAllGames);
router.get('/:id', gamesController.getGame);

// Admin routes
router.post('/', verifyAdmin, upload.single('image'), gamesController.createGame);
router.put('/:id', verifyAdmin, upload.single('image'), gamesController.updateGame);
router.delete('/:id', verifyAdmin, gamesController.deleteGame);

module.exports = router;
