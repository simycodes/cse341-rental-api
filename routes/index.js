// IMPORTING PACKAGES-DEPENDENCIES
const express = require('express');
// CREATING-DEFINING THE MAIN APP ROUTER VARIABLE
const router = express.Router();

// GETTING ALL DIFFERENT APP ROUTES
const homeRouter = require('./homeRoute.js');
const userRouter = require('./usersRoutes');
const housesRouter = require('./housesRoutes');
const apartmentsRouter = require('./apartmentsRoutes');
const appointmentsRouter = require('./appointmentsRoutes');
const swaggerRouter = require('./swaggerConnectionRoutes');

// LINKING ALL DIFFERENT APP ROUTES TO SINGLE MAIN ROUTE
router.use('/', swaggerRouter);
router.use('/', homeRouter);
router.use('/users', userRouter);
/*router.use('/houses', housesRouter);
router.use('/apartments', apartmentsRouter);
router.use('/appointments', appointmentsRouter);*/ 
//UNCOMMENT ABOVE 3 STATMENTS WHEN HOUSES, APARTMENTS, AND APPOINTMENTS ROUTES ARE DONE.


module.exports = router;
