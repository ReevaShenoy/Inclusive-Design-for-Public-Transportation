module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: 'vitbkt3y@reeva',
  DB: 'inclusive_design', // Your DB name here
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
