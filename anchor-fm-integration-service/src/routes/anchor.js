// Anchor.fm routes
const express = require('express');
const router = express.Router();
const anchorController = require('../controllers/anchorController');

// Integration management
router.post('/auth', anchorController.authenticate);
router.get('/status/:userId', anchorController.getStatus);
router.delete('/auth/:userId', anchorController.removeAuth);

// Publishing operations
router.post('/publish', anchorController.publishEpisode);
router.get('/publish/:jobId', anchorController.getPublishingStatus);
router.post('/webhook', anchorController.webhook);

module.exports = router;