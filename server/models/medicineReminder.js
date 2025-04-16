const mongoose = require('mongoose');

const medicineReminderSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    medicine: { type: String, required: true },
    reminder_time: { type: String, required: true },
    recurring: { type: Boolean, default: true },
    created_at: { type: Date, default: Date.now }
  });

  module.exports = mongoose.model('MedicineReminder', medicineReminderSchema);