//app.js  
const express = require('express');
const sequelize = require ('./db');
const searchCarByName = require('./searchCars');
const {getAllCars} =  require('./getAllCars');
const { deleteCarById } = require('./deleteCars');
const { addNewCar } = require('./addCars');
const { updateCar } = require('./updateCar');
const bookingRoutes = require('./routes/bookingRoutes');
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
  apis: ['./app.js', './routes/bookingRoutes.js', './routes/rentingRoutes.js' ], // Path to API doc annotations
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


// Call API getAllCars
/**
 * @swagger
 * /getAllCars:
 *   get:
 *     summary: Get all cars
 *     description: Returns a list of all cars
 *     responses:
 *       200:
 *         description: A list of cars
 *       500:
 *         description: Interal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   Brand:
 *                     type: string
 *                   Color:
 *                     type: string
 *                   Model:
 *                     type: string
 */
app.get('/getAllCars', getAllCars);

//Call API  searchCarByName
/**
 * @swagger
 * /searchCarByName:
 *   get:
 *     summary: Search car by name
 *     description: Returns a list of cars based on search query
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Name of the car to search
 *     responses:
 *       200:
 *         description: A list of cars matching the name
 *       400:
 *         description: Missing search parameter "name"
 *       500:
 *         description: Internal server error
  *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   Brand:
 *                     type: string
 *                   Color:
 *                     type: string
 *                   Model:
 *                     type: string
 */
app.get('/searchCarByName', async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: 'Missing search parameter "name"' });
  }

  try {
    const cars = await searchCarByName(name);
    res.json(cars);
  } catch (err) {
    console.error('Error searching for cars:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Call API DeleteCar
/**
 * @swagger
 * /deleteCar/{id}:
 *   delete:
 *     summary: Delete a car by ID
 *     description: Deletes a car from the database
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the car to delete
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       404:
 *         description: Car not found
 */
app.delete('/deleteCar/:id', deleteCarById);

// Call API AddCar
/**
 * @swagger
 * /addCar:
 *   post:
 *     summary: Add a new car
 *     description: Adds a new car to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Brand:
 *                 type: string
 *               Color:
 *                 type: string
 *               Model:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Car added successfully
 *       400:
 *         description: Invalid input 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   Brand:
 *                     type: string
 *                   Color:
 *                     type: string
 *                   Model:
 *                     type: string
 */
app.post('/addCar', addNewCar);

// Call API updateCar
/**
 * @swagger
 * /updateCar/{id}:
 *   put:
 *     summary: Update a car by ID
 *     description: Updates car information based on the provided ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the car to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Brand:
 *                 type: string
 *               Color:
 *                 type: string
 *               Model:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       404:
 *         description: Car not found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   Brand:
 *                     type: string
 *                   Color:
 *                     type: string
 *                   Model:
 *                     type: string
 */
app.put('/updateCar/:id', updateCar);

//Route API booking
app.use('/bookings', bookingRoutes);

//Route API renting
app.use('/rentings', rentingRoutes);

//Route API driver
app.use('/drivers', driverRoutes);


app.listen (port, () => {
    console.log(`Server running on port ${port}`)
});
