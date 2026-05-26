'use strict';
const express = require('express');
const router = express.Router();
const { stats } = require('@controllers/dashboardController');
const auth = require('@middlewares/authMiddleware');

router.get('/stats', auth('admin'), stats);

module.exports = router;
