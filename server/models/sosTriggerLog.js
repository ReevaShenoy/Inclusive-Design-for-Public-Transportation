const mongoose = require('mongoose');

const sosTriggerLogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  contact_id: { type: mongoose.Schema.Types.ObjectId, ref: 'SosSetting' },
  method: { type: String },
  triggered_at: { type: Date, default: Date.now },
  location: {
    lat: { type: Number },
    long: { type: Number }
  }
});

module.exports = mongoose.model('SosTriggerLog', sosTriggerLogSchema);