const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance and connect to MySQL
const sequelize = new Sequelize({
  host: process.env.DB_HOST || 'localhost', // Set your MySQL host
  dialect: 'mysql',
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false // Set to true if you want to log SQL queries
});

// Test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate(); // Verify connection
    console.log('MySQL Connected successfully!');
  } catch (error) {
    console.error('Error: Could not connect to MySQL', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
