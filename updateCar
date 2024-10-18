const Car = require('./models/Car');
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
    module.exports = { updateCar };
