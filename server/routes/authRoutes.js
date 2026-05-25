const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/me  (protected)
router.get('/me', authMiddleware, getMe);

// PATCH /api/auth/update  (protected)
router.patch('/update', authMiddleware, updateProfile);

module.exports = router;
