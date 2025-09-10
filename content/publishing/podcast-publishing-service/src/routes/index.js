// Main routes index
const express = require('express');
const router = express.Router();

// Import route modules
const podcastRoutes = require('./podcasts');

// API routes
router.use('/podcasts', podcastRoutes);

module.exports = router;