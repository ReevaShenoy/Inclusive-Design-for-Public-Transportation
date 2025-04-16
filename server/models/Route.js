const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from_location: { type: String, required: true },
  from_lat: { type: Number },
  from_long: { type: Number },
  to_location: { type: String, required: true },
  to_lat: { type: Number },
  to_long: { type: Number },
  created_at: { type: Date, default: Date.now },
  is_favourite: { type: Boolean, default: false },
  route_type: { type: String },
  notes: { type: String },
  travel_time_estimation: { type: Number },
  distance_km: { type: Number }
});

module.exports = mongoose.model('Route', routeSchema);
