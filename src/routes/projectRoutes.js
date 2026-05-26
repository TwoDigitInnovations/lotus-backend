'use strict';
const express = require('express');
const router = express.Router();
const { getAll, getById, adminGetAll, create, update, remove } = require('@controllers/projectController');
const auth = require('@middlewares/authMiddleware');
const { upload } = require('@services/fileUpload');

// Public
router.get('/', getAll);
router.get('/:id', getById);

// Admin
router.get('/admin/all', auth('admin'), adminGetAll);
router.post('/', auth('admin'), upload.single('image'), create);
router.put('/:id', auth('admin'), upload.single('image'), update);
router.delete('/:id', auth('admin'), remove);

module.exports = router;
