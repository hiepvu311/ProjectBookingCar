//carRoutes
const express = require('express')
const {
    addNewCar,
    deleteCarById,
    getAllCars,
    searchCar,
    updateCar
    
}
 = require('../controllers/carControllers')
 const router = express.Router();

 // Route to get all 
 /**
 * @swagger
 * /cars/getAllCars:
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
router.get('/getAllCars', getAllCars);

// Route to delete a car
// Call API DeleteCar
/**
 * @swagger
 * /cars/deleteCar/{id}:
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
router.delete('/deleteCar/:id', deleteCarById);

// Route to update a car
// Call API updateCar
/**
 * @swagger
 * /cars/updateCar/{id}:
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
router.put('/updateCar/:id', updateCar);

//route to add a car
// Call API AddCar
/**
 * @swagger
 * /cars/addCar:
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
router.post('/addNewCar', addNewCar);

 // Route to get all car
 /**
 * @swagger
 * /cars/searchCarByName:
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
 router.get('/searchCarByName', searchCar);

 module.exports = router;