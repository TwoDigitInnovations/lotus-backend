'use strict';
const express = require('express');
const router = express.Router();
const { getAll, adminGetAll, create, update, remove, reorder } = require('@controllers/heroBannerController');
const auth = require('@middlewares/authMiddleware');
const { mediaUpload } = require('@services/fileUpload');

// Public
router.get('/', getAll);

// Admin
router.get('/admin/all', auth('admin'), adminGetAll);
router.post('/', auth('admin'), mediaUpload.single('media'), create);
router.put('/reorder', auth('admin'), reorder);
router.put('/:id', auth('admin'), mediaUpload.single('media'), update);
router.delete('/:id', auth('admin'), remove);

module.exports = router;
