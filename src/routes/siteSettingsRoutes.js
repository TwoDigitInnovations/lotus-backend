'use strict';
const express = require('express');
const router = express.Router();
const ctrl = require('@controllers/siteSettingsController');
const auth = require('@middlewares/authMiddleware');
const { upload } = require('@services/fileUpload');

// Public
router.get('/', ctrl.get);

// Admin
router.put('/welcome', auth('admin'), upload.array('images', 3), ctrl.updateWelcome);
router.put('/why-choose-us', auth('admin'), ctrl.updateWhyChooseUs);
router.put('/testimonials', auth('admin'), upload.any(), ctrl.updateTestimonials);
router.put('/footer', auth('admin'), ctrl.updateFooter);
router.put('/privacy-policy', auth('admin'), ctrl.updatePrivacyPolicy);
router.put('/terms', auth('admin'), ctrl.updateTerms);

module.exports = router;
