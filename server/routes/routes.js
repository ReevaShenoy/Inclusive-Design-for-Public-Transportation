const express = require('express');
const Route = require('../models/Route');
const router = express.Router();

// Get all routes for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const routes = await Route.find({ user_id: req.params.userId });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get favorite routes for a user
router.get('/user/:userId/favorites', async (req, res) => {
  try {
    const routes = await Route.find({ user_id: req.params.userId, is_favourite: true });
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create route
router.post('/', async (req, res) => {
  const route = new Route({
    user_id: req.body.user_id,
    from_location: req.body.from_location,
    from_lat: req.body.from_lat,
    from_long: req.body.from_long,
    to_location: req.body.to_location,
    to_lat: req.body.to_lat,
    to_long: req.body.to_long,
    is_favourite: req.body.is_favourite || false,
    route_type: req.body.route_type,
    notes: req.body.notes,
    travel_time_estimation: req.body.travel_time_estimation,
    distance_km: req.body.distance_km
  });

  try {
    const newRoute = await route.save();
    res.status(201).json(newRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update route
router.patch('/:id', getRoute, async (req, res) => {
  // Update all fields that are sent in the request
  Object.keys(req.body).forEach(key => {
    if (key !== '_id' && key !== 'user_id' && key !== 'created_at') {
      res.route[key] = req.body[key];
    }
  });
  
  try {
    const updatedRoute = await res.route.save();
    res.json(updatedRoute);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete route
router.delete('/:id', getRoute, async (req, res) => {
  try {
    await res.route.remove();
    res.json({ message: 'Route deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get route by ID
async function getRoute(req, res, next) {
  let route;
  try {
    route = await Route.findById(req.params.id);
    if (route == null) {
      return res.status(404).json({ message: 'Route not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.route = route;
  next();
}

module.exports = router;