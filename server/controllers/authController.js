const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username, email, and password are required.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters.'
      });
    }

    const existingUser = db.get('users').find({ email }).value();
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User with this email already exists.'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      createdAt: new Date().toISOString()
    };

    db.get('users').push(newUser).write();

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      token,
      user: { id: newUser.id, username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.'
      });
    }

    const user = db.get('users').find({ email }).value();
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful.',
      token,
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/me
const getMe = (req, res) => {
  const user = db.get('users').find({ id: req.user.id }).value();
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }
  return res.status(200).json({
    success: true,
    user: { id: user.id, username: user.username, email: user.email }
  });
};

// PATCH /api/auth/update
const updateProfile = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = db.get('users').find({ id: req.user.id }).value();
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    if (email && email !== user.email) {
      const existing = db.get('users').find({ email }).value();
      if (existing && existing.id !== user.id) {
        return res.status(409).json({ success: false, message: 'Email already in use.' });
      }
    }

    const updates = {};
    if (username) updates.username = username;
    if (email)    updates.email    = email;
    if (password) {
      if (password.length < 6) return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
      updates.password = await bcrypt.hash(password, 12);
    }

    db.get('users').find({ id: req.user.id }).assign(updates).write();

    const updated = db.get('users').find({ id: req.user.id }).value();
    return res.status(200).json({
      success: true,
      message: 'Profile updated.',
      user: { id: updated.id, username: updated.username, email: updated.email }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getMe, updateProfile };
