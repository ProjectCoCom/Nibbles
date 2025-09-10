// Podcast controller
const { Podcast, Episode } = require('../models');
const Joi = require('joi');

// Validation schemas
const podcastSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(null, ''),
  author: Joi.string().required(),
  imageUrl: Joi.string().uri().allow(null, ''),
  categories: Joi.array().items(Joi.string()),
  language: Joi.string().allow(null, ''),
  copyright: Joi.string().allow(null, ''),
  explicit: Joi.boolean()
});

const episodeSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(null, ''),
  audioFileUrl: Joi.string().uri().allow(null, ''),
  duration: Joi.number().integer().min(0).allow(null),
  publishDate: Joi.date().allow(null),
  status: Joi.string().valid('draft', 'scheduled', 'published', 'failed'),
  tags: Joi.array().items(Joi.string())
});

// Get all podcasts
exports.getAllPodcasts = async (req, res) => {
  try {
    const podcasts = await Podcast.findAll({
      include: [{
        model: Episode,
        as: 'episodes',
        attributes: ['id', 'title', 'status', 'createdAt']
      }]
    });
    res.json(podcasts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get podcast by ID
exports.getPodcastById = async (req, res) => {
  try {
    const { podcastId } = req.params;
    const podcast = await Podcast.findByPk(podcastId, {
      include: [{
        model: Episode,
        as: 'episodes'
      }]
    });
    
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    res.json(podcast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create podcast
exports.createPodcast = async (req, res) => {
  try {
    // Validate input
    const { error, value } = podcastSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const podcast = await Podcast.create(value);
    res.status(201).json(podcast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update podcast
exports.updatePodcast = async (req, res) => {
  try {
    const { podcastId } = req.params;
    
    // Validate input
    const { error, value } = podcastSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const podcast = await Podcast.findByPk(podcastId);
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    await podcast.update(value);
    res.json(podcast);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete podcast
exports.deletePodcast = async (req, res) => {
  try {
    const { podcastId } = req.params;
    const podcast = await Podcast.findByPk(podcastId);
    
    if (!podcast) {
      return res.status(404).json({ error: 'Podcast not found' });
    }
    
    await podcast.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};