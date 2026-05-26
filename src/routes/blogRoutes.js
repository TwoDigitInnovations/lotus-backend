'use strict';
const express = require('express');
const router = express.Router();
const { getAll, getBySlug, adminGetAll, create, update, remove } = require('@controllers/blogController');
const auth = require('@middlewares/authMiddleware');
const { upload } = require('@services/fileUpload');

// Public
router.get('/', getAll);
router.get('/:slug', getBySlug);

// Admin
router.get('/admin/all', auth('admin'), adminGetAll);
router.post('/', auth('admin'), upload.single('image'), create);
router.put('/:id', auth('admin'), upload.single('image'), update);
router.delete('/:id', auth('admin'), remove);

module.exports = router;
