const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

// Set JWT as HttpOnly cookie
const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  };
  
  res.cookie('token', token, cookieOptions);
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    // Generate token
    const token = generateToken(user._id);
    
    // Set HttpOnly cookie
    setTokenCookie(res, token);
    
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      message: 'Registration successful'
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Check password
  const isPasswordMatch = await user.comparePassword(password);
  
  if (!isPasswordMatch) {
    res.status(401);
    throw new Error('Invalid credentials');
  }

  // Generate token
  const token = generateToken(user._id);
  
  // Set HttpOnly cookie
  setTokenCookie(res, token);
  
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    message: 'Login successful'
  });
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  
  res.json({ message: 'Logged out successfully' });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email
  });
});

module.exports = {
  register,
  login,
  logout,
  getMe
};