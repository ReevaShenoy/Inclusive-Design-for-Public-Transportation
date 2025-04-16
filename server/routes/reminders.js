// routes/reminders.js
const express = require('express');
const router = express.Router();

// Define routes here
router.get('/', (req, res) => {
  res.status(200).send({ message: 'Reminder Route' });
});

module.exports = router;
