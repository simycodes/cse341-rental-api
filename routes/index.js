// IMPORTING PACKAGES-DEPENDENCIES
const express = require('express');
// CREATING-DEFINING THE MAIN APP ROUTER VARIABLE
const router = express.Router();

// GETTING ALL DIFFERENT APP ROUTES
const homeRouter = require('./homeRoute.js');
const userRouter = require('./usersRoutes');
const houseRouter = require('./housesRoutes');
const apartmentRouter = require('./apartmentsRoutes');
// const appointmentRouter = require('./appointmentsRoutes');
const swaggerRouter = require('./swaggerConnectionRoutes');

// LINKING ALL DIFFERENT APP ROUTES TO SINGLE MAIN ROUTE
router.use('/', swaggerRouter);
router.use('/', homeRouter);
router.use('/users', userRouter);
router.use('/houses', houseRouter);
router.use('/apartments', apartmentRouter);
// router.use('/appointments', appointmentRouter);
//UNCOMMENT LINE 19 WHEN APPOINTMENTS ROUTES ARE DONE.

module.exports = router;
