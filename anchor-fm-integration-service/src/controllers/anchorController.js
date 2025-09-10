// Anchor.fm controller
const { AnchorAuth, AnchorPublishingJob } = require('../models');
const Joi = require('joi');

// Validation schemas
const authSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  accessToken: Joi.string().required(),
  refreshToken: Joi.string().allow(null, ''),
  expiresAt: Joi.date().allow(null)
});

const publishSchema = Joi.object({
  publishingJobId: Joi.string().uuid().required(),
  anchorEpisodeId: Joi.string().allow(null, ''),
  status: Joi.string().valid('pending', 'uploading', 'processing', 'published', 'failed'),
  progress: Joi.number().integer().min(0).max(100),
  errorMessage: Joi.string().allow(null, '')
});

// Authenticate with Anchor.fm
exports.authenticate = async (req, res) => {
  try {
    // Validate input
    const { error, value } = authSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Check if user already has auth
    let anchorAuth = await AnchorAuth.findOne({
      where: { userId: value.userId }
    });
    
    if (anchorAuth) {
      // Update existing auth
      await anchorAuth.update(value);
    } else {
      // Create new auth
      anchorAuth = await AnchorAuth.create(value);
    }
    
    res.status(201).json(anchorAuth);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Anchor.fm integration status
exports.getStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const anchorAuth = await AnchorAuth.findOne({
      where: { userId }
    });
    
    if (!anchorAuth) {
      return res.status(404).json({ error: 'Anchor.fm authentication not found' });
    }
    
    res.json({
      authenticated: true,
      userId: anchorAuth.userId,
      expiresAt: anchorAuth.expiresAt
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Remove Anchor.fm authentication
exports.removeAuth = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const anchorAuth = await AnchorAuth.findOne({
      where: { userId }
    });
    
    if (!anchorAuth) {
      return res.status(404).json({ error: 'Anchor.fm authentication not found' });
    }
    
    await anchorAuth.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Publish episode to Anchor.fm
exports.publishEpisode = async (req, res) => {
  try {
    // Validate input
    const { error, value } = publishSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Create publishing job
    const publishingJob = await AnchorPublishingJob.create(value);
    
    // In a real implementation, this would trigger the actual publishing to Anchor.fm
    // For now, we'll just create the job record
    
    res.status(201).json(publishingJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get publishing job status
exports.getPublishingStatus = async (req, res) => {
  try {
    const { jobId } = req.params;
    
    const publishingJob = await AnchorPublishingJob.findByPk(jobId);
    
    if (!publishingJob) {
      return res.status(404).json({ error: 'Publishing job not found' });
    }
    
    res.json(publishingJob);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Webhook endpoint for Anchor.fm callbacks
exports.webhook = async (req, res) => {
  try {
    // In a real implementation, this would process callbacks from Anchor.fm
    // For now, we'll just log the webhook data
    
    console.log('Anchor.fm webhook received:', req.body);
    
    // Update publishing job status based on webhook data
    if (req.body.jobId && req.body.status) {
      await AnchorPublishingJob.update(
        { status: req.body.status, progress: req.body.progress || 0 },
        { where: { id: req.body.jobId } }
      );
    }
    
    res.status(200).json({ message: 'Webhook processed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};