//models/Bookings.js
const {DataTypes} =  require('sequelize');
const sequelize = require('../db');

const Bookings = sequelize.define('Bookings',{
    IDcar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },


    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    Date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
 
    Duration_min: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    timeStart: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    timeStop: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
    IDdriver: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    tableName: 'Bookings',
    timestamps:false,
});

module.exports = Bookings;