// Import models
const Bookings = require('./Bookings');
const Car = require('./Car');
const Rentings =  require('./Rentings');


// connection between Bookings and Car
Bookings.belongsTo(Car, { foreignKey: 'ID' });
Rentings.hasone(Bookings, {foreignKey: 'ID'});


//gọi association trong app.js require('./association');