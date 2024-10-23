
//car controllers
const Car = require('../models/Car');
const { Op } = require('sequelize');
const { search } = require('../routes/bookingRoutes');

async function addNewCar(req, res) {
    const { Brand, Color, Model } = req.body;
    if (!Brand || !Color || !Model) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
      try {
        const newCar = await Car.create({
          Brand,
          Color,
          Model
        });
        res.status(201).json({ message: 'Car added successfully', car: newCar });
      } catch (err) {
        console.error('Error adding car:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    }

    
//deleteCar
async function deleteCarById(req, res) {
    try
    {
        const {id} = req.params;
        const car = await Car.findByPk(id);

        if (!car) {
        return res.status(404).json({ message: 'Car not found' });
        }

      await car.destroy();
      res.json({ message: 'Car deleted successfully' });
      
    }
    catch (err) {
    console.error('Error deleting car:', err);
    res.status(500).json({ error: 'Internal server error' });
}
}

//getAllCars
async function getAllCars(req, res){
    try 
    {
    const cars = await Car.findAll();
    res.json(cars);
    console.log('getAllCars function called');
    }
    catch(err)
    {
        console.error('Error retrieving cars:', err);
        res.status(500).json({ error: 'Interal server error'});
    }
}


//searchCarByName
async function searchCarByName(substring) {
        try {
            const cars = await Car.findAll({
                where: {
                    Brand: {
                        [Op.like]: `%${substring}%`, 
                    },
                },
            });
    
            if (cars.length > 0) {
                console.log(`Found ${cars.length} car(s) containing "${substring}":`);
                cars.forEach(car => {
                    console.log(`- ${car.Brand}`);
                });
            } else {
                console.log(`No cars found containing "${substring}".`);
            }
    
            return cars;
        } catch (error) {
            console.error('Error searching for cars:', error);
            throw error; 
        }
    }

async function searchCar(req, res) {
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
}    
async function updateCar(req, res) {
        try
        {
            const {id} = req.params;
            console.log('Updating car with ID:', id);
            const { Brand, Color, Model} = req.body;
            const car = await Car.findByPk(id);
    
            if (!car) {
            return res.status(404).json({ message: 'Car not found' });
            }
    
            car.Brand = Brand|| car.Brand;
            car.Color = Color || car.Color;
            car.Model = Model || car.Model;
            await car.save();
    
            res.json({ message: 'Car updated successfully', car });
    
        }
    
        catch (err) {
            console.error('Error updating car:', err);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
         
module.exports = { 
    addNewCar,
    deleteCarById,
    getAllCars,
    searchCarByName,
    updateCar,
    searchCar
 };