// Podcast routes
const express = require('express');
const router = express.Router();
const podcastController = require('../controllers/podcastController');
const episodeController = require('../controllers/episodeController');

// Podcast routes
router.get('/', podcastController.getAllPodcasts);
router.post('/', podcastController.createPodcast);
router.get('/:podcastId', podcastController.getPodcastById);
router.put('/:podcastId', podcastController.updatePodcast);
router.delete('/:podcastId', podcastController.deletePodcast);

// Episode routes
router.get('/:podcastId/episodes', episodeController.getEpisodes);
router.post('/:podcastId/episodes', episodeController.createEpisode);
router.get('/:podcastId/episodes/:episodeId', episodeController.getEpisodeById);
router.put('/:podcastId/episodes/:episodeId', episodeController.updateEpisode);
router.delete('/:podcastId/episodes/:episodeId', episodeController.deleteEpisode);
router.post('/:podcastId/episodes/:episodeId/publish', episodeController.publishEpisode);

module.exports = router;