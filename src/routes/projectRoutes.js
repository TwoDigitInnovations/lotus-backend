'use strict';
const express = require('express');
const router = express.Router();
const { getAll, getById, adminGetAll, adminGetById, create, update, remove } = require('@controllers/projectController');
const auth = require('@middlewares/authMiddleware');
const { mediaUpload } = require('@services/fileUpload');

// Public
router.get('/', getAll);
router.get('/:id', getById);

// Admin
router.get('/admin/all', auth('admin'), adminGetAll);
router.get('/admin/:id', auth('admin'), adminGetById);
router.post('/', auth('admin'), mediaUpload.any(), create);
router.put('/:id', auth('admin'), mediaUpload.any(), update);
router.delete('/:id', auth('admin'), remove);

module.exports = router;
