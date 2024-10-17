//addCars
const Car = require('./models/Car'); 
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
    
module.exports = { addNewCar };