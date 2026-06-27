'use strict';
const express = require('express');
const router = express.Router();
const ctrl = require('@controllers/propertyTypeController');
const auth = require('@middlewares/authMiddleware');
const { upload } = require('@services/fileUpload');

// Public
router.get('/', ctrl.getAll);

// Admin
router.get('/admin/all', auth('admin'), ctrl.adminGetAll);
router.post('/', auth('admin'), upload.single('image'), ctrl.create);
router.put('/reorder', auth('admin'), ctrl.reorder);
router.put('/:id', auth('admin'), upload.single('image'), ctrl.update);
router.delete('/:id', auth('admin'), ctrl.remove);

module.exports = router;
