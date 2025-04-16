// controllers/route.controller.js
const db = require('..');
const Route = db.routes;
const User = db.users;
const { validateRouteInput } = require('../utils/validators');

// Create and Save a new Route
exports.create = async (req, res) => {
  try {
    // Validate request
    const validation = validateRouteInput(req.body);
    if (!validation.isValid) {
      return res.status(400).send({
        message: validation.message
      });
    }

    // Create a Route
    const route = {
      user_id: req.userId, // From auth middleware
      from_location: req.body.from_location,
      from_lat: req.body.from_lat,
      from_long: req.body.from_long,
      to_location: req.body.to_location,
      to_lat: req.body.to_lat,
      to_long: req.body.to_long,
      is_favourite: req.body.is_favourite || false,
      route_type: req.body.route_type || 'DEFAULT',
      notes: req.body.notes || '',
      travel_time_estimation: req.body.travel_time_estimation,
      distance_km: req.body.distance_km,
      created_at: new Date()
    };

    // Save Route in the database
    const data = await Route.create(route);
    
    res.status(201).send(data);
  } catch (err) {
    console.error('Error creating route:', err);
    res.status(500).send({
      message: "Some error occurred while creating the Route."
    });
  }
};

// Retrieve all Routes for a specific user
exports.findAll = async (req, res) => {
  try {
    const userId = req.userId;
    
    const data = await Route.findAll({ 
      where: { user_id: userId },
      order: [['created_at', 'DESC']]
    });
    
    res.send(data);
  } catch (err) {
    console.error('Error retrieving routes:', err);
    res.status(500).send({
      message: "Some error occurred while retrieving routes."
    });
  }
};

// Find all favorite routes for a user
exports.findFavorites = async (req, res) => {
  try {
    const userId = req.userId;
    
    const data = await Route.findAll({ 
      where: { 
        user_id: userId,
        is_favourite: true
      },
      order: [['created_at', 'DESC']]
    });
    
    res.send(data);
  } catch (err) {
    console.error('Error retrieving favorite routes:', err);
    res.status(500).send({
      message: "Some error occurred while retrieving favorite routes."
    });
  }
};

// Find a single Route with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await Route.findOne({
      where: { 
        id: id,
        user_id: req.userId // Ensure user can only access their own routes
      }
    });
    
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Route with id=${id} not found or you don't have access.`
      });
    }
  } catch (err) {
    console.error(`Error retrieving route with id=${req.params.id}:`, err);
    res.status(500).send({
      message: "Error retrieving Route with id=" + req.params.id
    });
  }
};

// Update a Route
exports.update = async (req, res) => {
  try {
    const id = req.params.id;

    // Validate request
    const validation = validateRouteInput(req.body);
    if (!validation.isValid) {
      return res.status(400).send({
        message: validation.message
      });
    }

    const [num] = await Route.update(req.body, {
      where: { 
        id: id,
        user_id: req.userId // Security check
      }
    });

    if (num === 1) {
      res.send({
        message: "Route was updated successfully."
      });
    } else {
      res.status(404).send({
        message: `Cannot update Route with id=${id}. Maybe Route was not found or you don't have access.`
      });
    }
  } catch (err) {
    console.error(`Error updating route with id=${req.params.id}:`, err);
    res.status(500).send({
      message: "Error updating Route with id=" + req.params.id
    });
  }
};

// Toggle favorite status of a route
exports.toggleFavorite = async (req, res) => {
  try {
    const id = req.params.id;
    
    // First, find the current route to get its favorite status
    const route = await Route.findOne({
      where: { 
        id: id,
        user_id: req.userId
      }
    });
    
    if (!route) {
      return res.status(404).send({
        message: `Route with id=${id} not found or you don't have access.`
      });
    }
    
    // Toggle the favorite status
    const [num] = await Route.update(
      { is_favourite: !route.is_favourite },
      { where: { id: id, user_id: req.userId } }
    );

    if (num === 1) {
      res.send({
        message: `Route favorite status updated to ${!route.is_favourite}.`
      });
    } else {
      res.status(500).send({
        message: `Error updating favorite status for Route with id=${id}.`
      });
    }
  } catch (err) {
    console.error(`Error toggling favorite for route with id=${req.params.id}:`, err);
    res.status(500).send({
      message: "Error updating favorite status for Route with id=" + req.params.id
    });
  }
};

// Delete a Route
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    const num = await Route.destroy({
      where: { 
        id: id,
        user_id: req.userId // Security check
      }
    });

    if (num === 1) {
      res.send({
        message: "Route was deleted successfully!"
      });
    } else {
      res.status(404).send({
        message: `Cannot delete Route with id=${id}. Maybe Route was not found or you don't have access.`
      });
    }
  } catch (err) {
    console.error(`Error deleting route with id=${req.params.id}:`, err);
    res.status(500).send({
      message: "Could not delete Route with id=" + req.params.id
    });
  }
};