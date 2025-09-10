// Episode controller
const { Episode, Podcast } = require('../models');
const Joi = require('joi');

// Validation schema
const episodeSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(null, ''),
  audioFileUrl: Joi.string().uri().allow(null, ''),
  duration: Joi.number().integer().min(0).allow(null),
  publishDate: Joi.date().allow(null),
  status: Joi.string().valid('draft', 'scheduled', 'published', 'failed'),
  tags: Joi.array().items(Joi.string())
});

// Get all episodes for a podcast
exports.getEpisodes = async (req, res) => {
  try {
    const { podcastId } = req.params;
    
    // Check if podcast exists
    const podcast = await Podcast.findByPk(podcastId);
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    const episodes = await Episode.findAll({
      where: { podcastId },
      order: [['createdAt', 'DESC']]
    });
    
    res.json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get episode by ID
exports.getEpisodeById = async (req, res) => {
  try {
    const { podcastId, episodeId } = req.params;
    
    // Check if podcast exists
    const podcast = await Podcast.findByPk(podcastId);
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    const episode = await Episode.findOne({
      where: { id: episodeId, podcastId }
    });
    
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    
    res.json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create episode
exports.createEpisode = async (req, res) => {
  try {
    const { podcastId } = req.params;
    
    // Check if podcast exists
    const podcast = await Podcast.findByPk(podcastId);
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    // Validate input
    const { error, value } = episodeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Add podcastId to the episode data
    value.podcastId = podcastId;
    
    const episode = await Episode.create(value);
    res.status(201).json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update episode
exports.updateEpisode = async (req, res) => {
  try {
    const { podcastId, episodeId } = req.params;
    
    // Check if podcast exists
    const podcast = await Podcast.findByPk(podcastId);
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    // Validate input
    const { error, value } = episodeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const episode = await Episode.findOne({
      where: { id: episodeId, podcastId }
    });
    
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    
    await episode.update(value);
    res.json(episode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete episode
exports.deleteEpisode = async (req, res) => {
  try {
    const { podcastId, episodeId } = req.params;
    
    // Check if podcast exists
    const podcast = await Podcast.findByPk(podcastId);
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    const episode = await Episode.findOne({
      where: { id: episodeId, podcastId }
    });
    
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    
    await episode.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Publish episode
exports.publishEpisode = async (req, res) => {
  try {
    const { podcastId, episodeId } = req.params;
    
    // Check if podcast exists
    const podcast = await Podcast.findByPk(podcastId);
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    const episode = await Episode.findOne({
      where: { id: episodeId, podcastId }
    });
    
    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }
    
    // Update episode status to published
    await episode.update({ status: 'published' });
    
    // In a real implementation, this would trigger the publishing workflow
    // For now, we'll just update the status
    
    res.json({
      message: 'Episode published successfully',
      episode
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};