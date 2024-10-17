// searchCars.js
const { Op } = require('sequelize');
const Car = require('./models/Car'); 


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

module.exports = searchCarByName;