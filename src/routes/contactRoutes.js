'use strict';
const express = require('express');
const router = express.Router();
const { submit, getAll, getById, updateStatus, remove } = require('@controllers/contactController');
const auth = require('@middlewares/authMiddleware');

// Public
router.post('/', submit);

// Admin
router.get('/', auth('admin'), getAll);
router.get('/:id', auth('admin'), getById);
router.patch('/:id/status', auth('admin'), updateStatus);
router.delete('/:id', auth('admin'), remove);

module.exports = router;
