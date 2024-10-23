const { Sequelize } = require('sequelize');

// Create connection with database
const sequelize = new Sequelize('bookingcardatabase', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;


