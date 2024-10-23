// Import models
const Bookings = require('./Booking');
const Car = require('./Car');
const Rentings =  require('./Renting');
const Drivers = require('./Driver')


Bookings.belongsTo(Car, { foreignKey: 'IDcar'});
Bookings.hasOne(Rentings, {foreignKey: 'IDbooking'});
Bookings.belongsTo(Drivers, {foreignKey: 'IDdriver'})

module.exports = { Bookings, Car, Rentings, Drivers };

//gọi association trong app.js require('./association');