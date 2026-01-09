const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'diamond-filter-secret-key-change-in-production', {
    expiresIn: '30d',
  });
};

// @route   POST /api/auth/register
// @desc    Register a new admin (for initial setup)
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // Check if admin exists
    const adminExists = await Admin.findOne({ $or: [{ email }, { username }] });
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    // Create admin
    const admin = await Admin.create({
      username,
      email,
      password,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Check for admin
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await admin.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current admin
// @access  Private
router.get('/me', require('../middleware/auth').protect, async (req, res) => {
  try {
    const admin = await Admin.findById(req.admin._id);
    res.json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

