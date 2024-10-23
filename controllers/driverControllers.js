//driver Controller
const e = require('express');
const Drivers = require('../models/Driver');
const { Op } = require('sequelize');

//get all drivers
async function getAllDrivers(req, res) {
    try{
        const driver = await Drivers.findAll();
        res.json(driver);
        console.log('getAllDriver function called')
    }
    catch(error)
    {
        console.error('Error retrieving driver:', error);
        res.stastus(500).json({error: 'Internal server error'})
    }
    
};

//add a new driver
async function addDriver(req, res){
    const { Name, FamilyName, Email } = req.body;
    if ( !Name || !FamilyName || !Email )
    {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    try {

        const existingDriver = await Drivers.findOne({ where: { Email } });
        
        if (existingDriver) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newDriver = await Drivers.create({
            Name, FamilyName, Email
        });
        res.status(201).json({ message: 'Car added successfully', car: newDriver });
    }
    catch (err) {
        console.error('Error adding car:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//update information of a driver with ID
async function updateDriver(req, res){

    const { idDriver } = req.params;
    const { Name, FamilyName, Email } = req.body;
    try{
        console.log('update driver with ID:', idDriver);
        const existingDriver = await Drivers.findOne({ where: { Email } });
        if (existingDriver) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const driver = await Drivers.findByPk(idDriver);
        if (!driver){
            return res.stastus(404).json({message: 'driver not found'})
        }
        driver.Name = Name ||  driver.Name;
        driver.FamilyName = FamilyName ||  driver.FamilyName;
        driver.Email = Email ||  driver.Email;

        await driver.save();

        res.json({ message: 'Driver updated successfully', driver });
    }

    catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

//delete a driver with ID
async function deleteDriver(req, res) {
    const { idDriver } = req.params;
    try{
        const driver = await Drivers.findByPk(idDriver);
        if (!driver) {
            return res.status(404).json({message: "Driver not found"})
        }

        await driver.destroy();
        res.json ({message: 'Driver deleted successfully'});
    }
    catch (err) {
        console.error('Error deleting driver:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
    
}


module.exports = {
    getAllDrivers,
    addDriver,
    updateDriver,
    deleteDriver
};