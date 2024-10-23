//app.js  
const express = require('express');
const sequelize = require ('./db');
const bookingRoutes = require('./routes/bookingRoutes');
const carRoutes = require('./routes/carRoutes')
const rentingRoutes = require('./routes/rentingRoutes');
const driverRoutes = require('./routes/driverRoutes')
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./models/associations');

const app = express();
const port = 3000;

//Middleware parse JSON
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Car booking API',
      version: '1.0.0',
      description: 'API for managing cars and bookings',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./app.js', './routes/bookingRoutes.js', './routes/rentingRoutes.js', './routes/carRoutes.js' ], // Path to API doc annotations
};

// Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


//Create connection to database
sequelize.sync().then(() =>{
    console.log('Database connected...');
    console.log ('Table updated...')
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
});


//route APT car information
app.use('/cars', carRoutes)

//Route API booking
app.use('/bookings', bookingRoutes);

//Route API renting
app.use('/rentings', rentingRoutes);

//Route API driver
app.use('/drivers', driverRoutes);


app.listen (port, () => {
    console.log(`Server running on port ${port}`)
});
