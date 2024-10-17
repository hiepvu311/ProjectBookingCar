//getCars.js
const Car = require('./models/Car');

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
module.exports = {getAllCars};