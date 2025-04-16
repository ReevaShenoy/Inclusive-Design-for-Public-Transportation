const express = require('express');
const AccessibilitySetting = require('../models/AccessibilitySetting');
const router = express.Router();

// Get accessibility settings for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const settings = await AccessibilitySetting.findOne({ user_id: req.params.userId });
    if (!settings) {
      return res.status(404).json({ message: 'No accessibility settings found for this user' });
    }
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create or update accessibility settings
router.post('/user/:userId', async (req, res) => {
  try {
    // Check if settings already exist for this user
    let settings = await AccessibilitySetting.findOne({ user_id: req.params.userId });
    
    if (settings) {
      // Update existing settings
      if (req.body.text_size) settings.text_size = req.body.text_size;
      if (req.body.high_contrast_mode !== undefined) settings.high_contrast_mode = req.body.high_contrast_mode;
      if (req.body.haptic_feedback !== undefined) settings.haptic_feedback = req.body.haptic_feedback;
      if (req.body.screen_reader_mode !== undefined) settings.screen_reader_mode = req.body.screen_reader_mode;
      if (req.body.voice_assistance !== undefined) settings.voice_assistance = req.body.voice_assistance;
      
      settings.updated_at = Date.now();
      
      const updatedSettings = await settings.save();
      res.json(updatedSettings);
    } else {
      // Create new settings
      const newSettings = new AccessibilitySetting({
        user_id: req.params.userId,
        text_size: req.body.text_size || 'MEDIUM',
        high_contrast_mode: req.body.high_contrast_mode || false,
        haptic_feedback: req.body.haptic_feedback || false,
        screen_reader_mode: req.body.screen_reader_mode || false,
        voice_assistance: req.body.voice_assistance || false
      });
      
      const savedSettings = await newSettings.save();
      res.status(201).json(savedSettings);
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;