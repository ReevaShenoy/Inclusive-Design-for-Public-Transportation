// middleware/auth.jwt.js
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config.js');
const db = require('../index.js');
const User = db.users;
const logger = require('../utils/logger');

verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  
  // Remove Bearer prefix if present
  if (token && token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({
      message: 'No token provided!'
    });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      logger.error('Token verification failed:', err);
      return res.status(401).send({
        message: 'Unauthorized!'
      });
    }
    
    req.userId = decoded.id;
    
    // Update last_seen timestamp for the user
    User.update(
      { last_seen: new Date() },
      { where: { user_id: decoded.id } }
    ).catch(err => {
      logger.error('Error updating user last_seen:', err);
    });
    
    next();
  });
};

const authJwt = {
  verifyToken
};

module.exports = authJwt;