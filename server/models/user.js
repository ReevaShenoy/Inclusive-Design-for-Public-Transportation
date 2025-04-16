module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    dob: {
      type: Sequelize.DATEONLY,
      allowNull: true
    },
    age: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    health_issues: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    address: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    device_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    last_seen: {
      type: Sequelize.DATE,
      allowNull: true
    },
    biometric_hash: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });

  return User;
};
