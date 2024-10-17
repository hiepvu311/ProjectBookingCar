// models/Car.js
const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Car = sequelize.define('Car', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Brand: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  Color: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  Model: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
}, 

{
  tableName: 'Car',
  timestamps: false,
});

module.exports = Car;