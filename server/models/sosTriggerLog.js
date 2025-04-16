const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Import Sequelize instance from db.js

const SosTriggerLog = sequelize.define('SosTriggerLog', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Reference to the Users table
      key: 'user_id'
    }
  },
  contact_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'SosSettings', // Reference to the SosSettings table
      key: 'contact_id'
    }
  },
  method: {
    type: DataTypes.STRING,
    allowNull: true
  },
  triggered_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  location_lat: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  location_long: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  tableName: 'sos_trigger_log', // Table name in MySQL
  timestamps: false, // Disable Sequelize's automatic `createdAt` and `updatedAt` fields
});

// Set up associations (if needed)
SosTriggerLog.associate = (models) => {
  SosTriggerLog.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });

  SosTriggerLog.belongsTo(models.SosSetting, {
    foreignKey: 'contact_id',
    as: 'contact'
  });
};

module.exports = SosTriggerLog;
