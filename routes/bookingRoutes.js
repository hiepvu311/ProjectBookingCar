//bookingRoutes
const express  =  require('express')
const {
    getAllBookings,
    deleteBooking,
    updateBooking,
    addBooking,
    getBookingSlots,
    getBookingByIDCarAndDate,
    getBookingsByIDdriver
}
 = require('../controllers/bookingControllers')

 const router = express.Router();

// Route to get all bookings
/**
 * @swagger
 * /bookings/getAllBookings:
 *   get:
 *     summary: Get all bookings
 *     description: Retrieve a list of all bookings
 *     responses:
 *       200:
 *         description: A list of bookings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   IDCar:
 *                     type: integer
 *                   IDdriver:
 *                     type: integer
 *                   Date:
 *                     type: string
 *                     format: date
 *                   Duration_min:
 *                     type: integer
 *                   timeStar:
 *                     type: string
 *                     format: date-time 
 *                   timeStop:
 *                     type: string
 *                     format: date-time 
 */
router.get('/getAllBookings', getAllBookings);

// Route to delete a booking
/**ad
 * @swagger
 * /bookings/deleteBooking/{idBooking}:
 *   delete:
 *     summary: Delete a booking by ID
 *     description: Deletes a booking from the database
 *     parameters:
 *       - in: path
 *         name: idBooking
 *         schema:
 *           type: integers
 *         required: true
 *         description: ID of the booking to delete
 *     responses:
 *       200:
 *         description:  Booking deleted successfully
 *       404:
 *         description: Booking not found
 */
router.delete('/deleteBooking/:idBooking', deleteBooking);

// Route to update a booking
/**
 * @swagger
 * /bookings/updateBooking/{idBooking}:
 *   put:
 *     summary: Update a booking
 *     description: Update the details of a booking
 *     parameters:
 *       - in: path
 *         name: idBooking
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the booking to update
 *       - in: body
 *         name: booking
 *         description: The booking details to update
 *         schema:
 *           type: object
 *           required:
 *             - IDcar
 *             - Date
 *             - timeStart
 *             - timeStop
 *             - IDdriver
 *           properties:
 *             IDcar:
 *               type: integer
 *             Date:
 *               type: string
 *               format: date
 *             Duration_min:
 *               type: integer
 *             timeStart:
 *               type: string
 *               format: date-time 
 *             timeStop:
 *               type: string
 *               format: date-time 
 *             IDdriver:
 *               type: integer
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       400:
 *         description: Overlapping booking time
 *       404:
 *         description: Booking not found
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   IDCar:
 *                     type: integer
 *                   IDdriver:
 *                     type: integer
 *                   Date:
 *                     type: string
 *                     format: date
 *                   Duration_min:
 *                     type: integer
 *                   timeStar:
 *                     type: string
 *                     format: date-time 
 *                   timeStop:
 *                     type: string
 *                     format: date-time 
 */
router.put('/updateBooking/:idBooking', updateBooking);

//route to add a booking
/**
 * @swagger
 * /bookings/addBooking:
 *   post:
 *     summary: Add a new booking
 *     description: Create a new booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - IDcar
 *               - Date
 *               - Duration_min
 *               - timeStart
 *               - timeStop
 *               - IDdriver
 *           properties:
 *             IDcar:
 *               type: integer
 *             Date:
 *               type: string
 *               format: date
 *             Duration_min:
 *               type: integer
 *             timeStart:
 *               type: string
 *               format: date-time 
 *             timeStop:
 *               type: string
 *               format: date-time 
 *             IDdriver:
 *               type: integer  
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Missing required fields or invalid booking time
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   IDCar:
 *                     type: integer
 *                   IDdriver:
 *                     type: integer
 *                   Date:
 *                     type: string
 *                     format: date
 *                   Duration_min:
 *                     type: integer
 *                   timeStar:
 *                     type: string
 *                     format: date-time 
 *                   timeStop:
 *                     type: string
 *                     format: date-time 
 */
router.post('/addBooking', addBooking);

//route to get a booking by IDcar and starting date
/**
 * @swagger
 * /bookings/getBookingSlots/{IDCar}:
 *   get:
 *     summary: Get booking slots by car ID and optional starting date
 *     parameters:
 *       - in: path
 *         name: IDCar
 *         required: true
 *         description: The ID of the car to fetch booking slots for
 *         schema:
 *           type: string
 *       - in: query
 *         name: startingDate
 *         required: false
 *         description: The starting date to fetch bookings from (YYYY-MM-DD)
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: A list of booking slots for the specified car
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                   IDcar:
 *                     type: string
 *                   Date:
 *                     type: string
 *                     format: date
 *                   timeStart:
 *                     type: string
 *                   timeEnd:
 *                     type: string
 *       404:
 *         description: No bookings found for this car and date
 *       500:
 *         description: Internal server error
 */
router.get('/getBookingSlots/:IDCar', getBookingByIDCarAndDate);

//route to get all bookings by IDdriver
router.get('/getBookingsByIDdriver/:idDriver', getBookingsByIDdriver);


module.exports = router;