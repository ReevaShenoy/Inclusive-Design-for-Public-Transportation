module.exports = (sequelize, Sequelize) => {
    const SOSSettings = sequelize.define("sos_settings", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'user_id'
        }
      },
      contact_name: {
        type: Sequelize.STRING
      },
      contact_phone: {
        type: Sequelize.STRING
      },
      relationship: {
        type: Sequelize.STRING
      },
      priority: {
        type: Sequelize.INTEGER
      }
    });
  
    return SOSSettings;
  };