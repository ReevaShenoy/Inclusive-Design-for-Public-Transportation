const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Import Sequelize instance from db.js

const Route = sequelize.define('Route', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Reference to the Users table
      key: 'user_id'
    }
  },
  from_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  from_lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  from_long: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  to_location: {
    type: DataTypes.STRING,
    allowNull: false
  },
  to_lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  to_long: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  is_favourite: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  route_type: {
    type: DataTypes.STRING,
    allowNull: true
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true
  },
  travel_time_estimation: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  distance_km: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'routes', // Name of the table in MySQL
  timestamps: false, // Disable Sequelize's automatic `createdAt` and `updatedAt` fields
});

// Set up associations (if needed)
Route.associate = (models) => {
  Route.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

module.exports = Route;
