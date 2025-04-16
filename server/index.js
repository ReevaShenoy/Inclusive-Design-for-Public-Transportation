// models/index.js
const dbConfig = require('../config/db.config.js');
const Sequelize = require('sequelize');

// Create Sequelize instance
const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    },
    logging: msg => console.debug(msg)
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Initialize models
db.users = require('./models/user.js')(sequelize, Sequelize);
db.sosSettings = require('./models/sosSettings.js')(sequelize, Sequelize);
db.accessibilitySettings = require('./models/accesibilitySettings.js')(sequelize, Sequelize);
db.medicineReminders = require('./models/medicineReminder.js')(sequelize, Sequelize);
db.routes = require('./models/Route.js')(sequelize, Sequelize);
db.sosTriggerLog = require('./models/sosTriggerLog.js')(sequelize, Sequelize);

// Set up associations

// User has many SOS contacts
db.users.hasMany(db.sosSettings, { foreignKey: 'user_id' });
db.sosSettings.belongsTo(db.users, { foreignKey: 'user_id' });

// User has one accessibility settings record
db.users.hasOne(db.accessibilitySettings, { foreignKey: 'user_id' });
db.accessibilitySettings.belongsTo(db.users, { foreignKey: 'user_id' });

// User has many medicine reminders
db.users.hasMany(db.medicineReminders, { foreignKey: 'user_id' });
db.medicineReminders.belongsTo(db.users, { foreignKey: 'user_id' });

// User has many routes
db.users.hasMany(db.routes, { foreignKey: 'user_id' });
db.routes.belongsTo(db.users, { foreignKey: 'user_id' });

// User has many SOS trigger logs
db.users.hasMany(db.sosTriggerLog, { foreignKey: 'user_id' });
db.sosTriggerLog.belongsTo(db.users, { foreignKey: 'user_id' });

// SOS contact has many trigger logs
db.sosSettings.hasMany(db.sosTriggerLog, { foreignKey: 'contact_id' });
db.sosTriggerLog.belongsTo(db.sosSettings, { foreignKey: 'contact_id' });

module.exports = db;