module.exports = (sequelize, Sequelize) => {
  const AccessibilitySetting = sequelize.define('AccessibilitySetting', {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // referencing the users table
        key: 'user_id',
      },
      primaryKey: true
    },
    text_size: {
      type: Sequelize.ENUM('small', 'medium', 'large'),
      defaultValue: 'medium',
    },
    color_theme: {
      type: Sequelize.STRING,
      defaultValue: 'warm_orange',
    },
    haptic_feedback: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    simplified_ui: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
  });

  return AccessibilitySetting;
};
