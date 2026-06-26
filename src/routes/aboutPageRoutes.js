'use strict';
const express = require('express');
const router = express.Router();
const ctrl = require('@controllers/aboutPageController');
const auth = require('@middlewares/authMiddleware');
const { upload } = require('@services/fileUpload');

// Public
router.get('/', ctrl.get);

// Admin
router.put('/hero', auth('admin'), ctrl.updateHero);
router.put('/story', auth('admin'), upload.single('image'), ctrl.updateStory);
router.put('/commitments', auth('admin'), ctrl.updateCommitments);
router.put('/leaders', auth('admin'), upload.any(), ctrl.updateLeaders);

module.exports = router;
