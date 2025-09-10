// Main routes index
const express = require('express');
const router = express.Router();

// Import route modules
const anchorRoutes = require('./anchor');

// API routes
router.use('/anchor', anchorRoutes);

module.exports = router;