//models/Rentings.js
const {DataTypes} = require('sequelize');
const sequelize = require('../db');

const Rentings = sequelize.define('Rentings',
    {
    IDcar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        },

    IDbooking: {
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

    kmStart: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    kmStop: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    feePerKm: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    feePerHour: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    
    IDdriver: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isFninished: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    },
    {
        tableName: 'Rentings',
        timestamps: false,
    }
);

module.exports = Rentings;