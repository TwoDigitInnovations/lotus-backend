'use strict';
const express = require('express');
const router = express.Router();
const {
  register,
  login,
  sendOTP,
  verifyOTP,
  resendOTP,
  changePassword,
  myProfile,
  updateProfile,
  getAllUsers,
  getUserById,
  deleteUser,
  blockUser,
} = require('@controllers/authController');
const auth = require('@middlewares/authMiddleware');
const { upload } = require('@services/fileUpload');

// Public
router.post('/register', register);
router.post('/login', login);
router.post('/send-otp', sendOTP);
router.post('/verify-otp', verifyOTP);
router.post('/resend-otp', resendOTP);
router.post('/change-password', changePassword);

// User (protected)
router.get('/profile', auth(), myProfile);
router.put('/profile', auth(), upload.single('image'), updateProfile);

// Admin
router.get('/users', auth('admin'), getAllUsers);
router.get('/users/:id', auth('admin'), getUserById);
router.delete('/users/:id', auth('admin'), deleteUser);
router.put('/users/block', auth('admin'), blockUser);

module.exports = router;
