module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      user_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_name: {
        type: Sequelize.STRING
      },
      biometric_enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      age: {
        type: Sequelize.INTEGER
      },
      health_issues: {
        type: Sequelize.TEXT
      },
      address: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      dob: {
        type: Sequelize.DATEONLY
      },
      phone_no: {
        type: Sequelize.STRING
      },
      device_id_hash: {
        type: Sequelize.STRING
      },
      last_seen: {
        type: Sequelize.DATE
      },
      last_login: {
        type: Sequelize.DATE
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      device_name: {
        type: Sequelize.STRING
      }
    });
  
    return User;
  };