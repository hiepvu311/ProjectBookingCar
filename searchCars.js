// searchCars.js
const { Op } = require('sequelize');
const Car = require('./models/Car'); // Đảm bảo điều chỉnh đường dẫn nếu cần


async function searchCarByName(substring) {
    try {
        const cars = await Car.findAll({
            where: {
                Brand: {
                    [Op.like]: `%${substring}%`, // Dùng SQL LIKE để tìm kiếm chuỗi chứa.
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
        throw error; // Ném lại lỗi sau khi log
    }
}

module.exports = searchCarByName;