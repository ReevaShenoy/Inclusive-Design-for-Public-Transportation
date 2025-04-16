const mongoose = require('mongoose');

const accessibilitySettingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text_size: { type: String, enum: ['SMALL', 'MEDIUM', 'LARGE'], default: 'MEDIUM' },
  high_contrast_mode: { type: Boolean, default: false },
  haptic_feedback: { type: Boolean, default: false },
  screen_reader_mode: { type: Boolean, default: false },
  voice_assistance: { type: Boolean, default: false },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AccessibilitySetting', accessibilitySettingSchema);