//models/Bookings.js
const {DataTypes, STRING} =  require('sequelize');
const sequelize = require('../db');

const Drivers = sequelize.define('Drivers',{
    ID:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    Name:{
        type: STRING(30),
        allowNull: false,
    },

    FamilyName: {
        type: STRING(30),
        allowNull: false,
    },

    Email: {
        type: STRING(30),
        allowNull: false,
        unique: true 
    },
},

{
    tableName: 'Drivers',
    timestamps:false,
});

module.exports = Drivers;