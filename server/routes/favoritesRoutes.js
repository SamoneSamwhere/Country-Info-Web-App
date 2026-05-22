const express = require('express');
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  updateFavorite,
  deleteFavorite
} = require('../controllers/favoritesController');
const authMiddleware = require('../middleware/authMiddleware');

// All favorites routes require authentication
router.use(authMiddleware);

// GET    /api/favorites       - Get all favorites for current user
router.get('/', getFavorites);

// POST   /api/favorites       - Add a new favorite
router.post('/', addFavorite);

// PATCH  /api/favorites/:id   - Update favorite note
router.patch('/:id', updateFavorite);

// DELETE /api/favorites/:id   - Remove a favorite
router.delete('/:id', deleteFavorite);

module.exports = router;
