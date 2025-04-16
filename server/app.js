const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./db');

// Create Express app
const app = express();

// Set up middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Set up routes
require('./routes/users')(app);
require('./routes/reminders')(app);
require('./routes/routes')(app);
require('./routes/sos')(app);
require('./routes/settings')(app);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).send({
    status: 'UP',
    timestamp: new Date()
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).send({
    message: `Cannot ${req.method} ${req.path}`
  });
});

// Connect to database and start server
const PORT = process.env.PORT || 5501;
connectDB() // Connect to MySQL
  .then(() => {
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    logger.error('Failed to start server:', err);
    process.exit(1);
  });

module.exports = app;
