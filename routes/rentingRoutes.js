//bookingRoutes
const express  =  require('express')
const {
    getAllRenting,
    deleteRenting,
    updateRenting,
    addRenting
}
= require('../controllers/rentingControllers')

const router = express.Router();

//Route to delete a renting
/**
 * @swagger
 * /rentings/deleteRenting/{idRenting}:
 *   delete:
 *     summary: Delete a renting by ID
 *     description: Deletes a renting from the database
 *     parameters:
 *       - in: path
 *         name: idRenting
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the renting to delete
 *     responses:
 *       200:
 *         description: Renting deleted successfully
 *       404:
 *         description: Renting not found
 *       500:
 *         description: Internal server error
 */
router.delete('/deleteRenting/:idRenting', deleteRenting);

//Route to get all renting
/**
 * @swagger
 * /rentings/getAllRenting:
 *   get:
 *     summary: Get all rentings
 *     description: Retrieve a list of all rentings
 *     responses:
 *       200:
 *         description: A list of rentings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   IDcar:
 *                     type: integer
 *                   IDbooking:
 *                     type: integer
 *                   timeStart:
 *                     type: string
 *                     format: date-time
 *                   timeStop:
 *                     type: string
 *                     format: date-time
 *                   kmStart:
 *                     type: number
 *                   kmStop:
 *                     type: number
 *                   feePerKm:
 *                     type: number
 *                   feePerHour:
 *                     type: number
 *                   IDdriver:
 *                     type: integer
 *                   isFninished:
 *                     type: boolean
 *       500:
 *         description: Internal server error
 */
router.get('/getAllRenting', getAllRenting);

//Route to update renting
/**
 * @swagger
 * /rentings/updateRenting/{idRenting}:
 *   put:
 *     summary: Update a renting
 *     description: Update details of a renting by its ID
 *     parameters:
 *       - in: path
 *         name: idRenting
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the renting to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               kmStart:
 *                 type: number
 *               kmStop:
 *                 type: number
 *               feePerKm:
 *                 type: number
 *               feePerHour:
 *                 type: number
 *               isFninished:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Renting updated successfully
 *       404:
 *         description: Renting not found
 *       500:
 *         description: Internal server error
 */
router.put('/updateRenting/:idRenting', updateRenting)

//route to add renting
/**
 * @swagger
 * /rentings/addRenting:
 *   post:
 *     summary: Add a new renting
 *     description: Create a new renting for a booking
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               IDbooking:
 *                 type: integer
 *                 description: ID of the booking to associate with the renting
 *               kmStart:
 *                 type: number
 *               kmStop:
 *                 type: number
 *               feePerKm:
 *                 type: number
 *               feePerHour:
 *                 type: number
 *     responses:
 *       201:
 *         description: Renting created successfully
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
router.post('/addRenting', addRenting)

module.exports = router;