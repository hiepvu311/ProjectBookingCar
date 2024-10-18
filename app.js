//app.js  
const express = require('express');
const sequelize = require ('./db');
const searchCarByName = require('./searchCars');
const {getAllCars} =  require('./getAllCars');
const { deleteCarById } = require('./deleteCars');
const { addNewCar } = require('./addCars');
const { updateCar } = require('./updateCar');

const app = express();
const port = 3000;

//Middleware parse JSON
app.use(express.json());


//Create connection to database
sequelize.sync().then(() =>{
    console.log('Database connected...');
    console.log ('Table updated...')
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
});

//Call API getAllCars
app.get('/getAllCars', getAllCars);

//Call API getAllCars searchCarByName
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
app.delete('/deleteCar/:id', deleteCarById);
// Call API AddCar
app.post('/addCar', addNewCar);
// Định nghĩa route API UpdateCar
app.put('/updateCar/:id', updateCar);


app.listen (port, () => {
    console.log(`Server running on port ${port}`)
});