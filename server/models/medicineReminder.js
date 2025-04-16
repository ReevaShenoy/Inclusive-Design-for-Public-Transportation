const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db'); // Import Sequelize instance from db.js

const MedicineReminder = sequelize.define('MedicineReminder', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', // Reference to the Users table
      key: 'user_id'
    }
  },
  medicine: {
    type: DataTypes.STRING,
    allowNull: false
  },
  reminder_time: {
    type: DataTypes.STRING,
    allowNull: false
  },
  recurring: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'medicine_reminders', // Name of the table in MySQL
  timestamps: false, // Disable Sequelize's automatic `createdAt` and `updatedAt` fields
});

// Set up associations (if needed)
MedicineReminder.associate = (models) => {
  MedicineReminder.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user'
  });
};

module.exports = MedicineReminder;
