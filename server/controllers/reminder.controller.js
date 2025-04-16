// controllers/reminder.controller.js
const db = require('..');
const Reminder = db.medicineReminders;
const User = db.users;
const { validateReminderInput } = require('../utils/validators');

// Create and Save a new Reminder
exports.create = async (req, res) => {
  try {
    // Validate request
    const validation = validateReminderInput(req.body);
    if (!validation.isValid) {
      return res.status(400).send({
        message: validation.message
      });
    }

    // Create a Reminder
    const reminder = {
      user_id: req.userId, // From auth middleware
      medicine: req.body.medicine,
      reminder_time: req.body.time,
      recurring: req.body.recurring || false,
      created_at: new Date()
    };

    // Save Reminder in the database
    const data = await Reminder.create(reminder);
    
    res.status(201).send(data);
  } catch (err) {
    console.error('Error creating reminder:', err);
    res.status(500).send({
      message: "Some error occurred while creating the Reminder."
    });
  }
};

// Retrieve all Reminders for a specific user
exports.findAll = async (req, res) => {
  try {
    const data = await Reminder.findAll({ 
      where: { user_id: req.userId } 
    });
    
    res.send(data);
  } catch (err) {
    console.error('Error retrieving reminders:', err);
    res.status(500).send({
      message: "Some error occurred while retrieving reminders."
    });
  }
};

// Find a single Reminder with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Reminder.findOne({
      where: { 
        id: id,
        user_id: req.userId // Ensure user can only access their own reminders
      }
    });
    
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Reminder with id=${id} not found or you don't have access.`
      });
    }
  } catch (err) {
    console.error(`Error retrieving reminder with id=${req.params.id}:`, err);
    res.status(500).send({
      message: "Error retrieving Reminder with id=" + req.params.id
    });
  }
};

// Update a Reminder
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate request
    const validation = validateReminderInput(req.body);
    if (!validation.isValid) {
      return res.status(400).send({
        message: validation.message
      });
    }

    const [num] = await Reminder.update(req.body, {
      where: { 
        id: id,
        user_id: req.userId // Security check
      }
    });

    if (num === 1) {
      res.send({
        message: "Reminder was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update Reminder with id=${id}. Maybe Reminder was not found or you don't have access.`
      });
    }
  } catch (err) {
    console.error(`Error updating reminder with id=${req.params.id}:`, err);
    res.status(500).send({
      message: "Error updating Reminder with id=" + req.params.id
    });
  }
};

// Delete a Reminder
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const num = await Reminder.destroy({
      where: { 
        id: id,
        user_id: req.userId // Security check
      }
    });

    if (num === 1) {
      res.send({
        message: "Reminder was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Reminder with id=${id}. Maybe Reminder was not found or you don't have access.`
      });
    }
  } catch (err) {
    console.error(`Error deleting reminder with id=${req.params.id}:`, err);
    res.status(500).send({
      message: "Could not delete Reminder with id=" + req.params.id
    });
  }
};

// Delete all Reminders for a user
exports.deleteAll = async (req, res) => {
  try {
    const nums = await Reminder.destroy({
      where: { user_id: req.userId },
      truncate: false
    });
    
    res.send({ 
      message: `${nums} Reminders were deleted successfully!` 
    });
  } catch (err) {
    console.error('Error deleting all reminders:', err);
    res.status(500).send({
      message: "Some error occurred while removing all reminders."
    });
  }
};