//bookingRoutes
const express = require('express')
const {
    getAllDrivers,
    addDriver,
    updateDriver,
    deleteDriver
}
= require('../controllers/driverControllers');


const router = express.Router();

//Route to get all driver
router.get('/getAllDriver', getAllDrivers);
//Route to add driver
router.post('/addDriver', addDriver);
//Route to update a driver
router.put('/updateDriver/:idDriver', updateDriver);
//Route to delete a driver
router.delete('/deleteDriver/:idDriver', deleteDriver)


module.exports = router

