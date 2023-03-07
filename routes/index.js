// IMPORTING PACKAGES-DEPENDENCIES
const express = require('express');
// CREATING-DEFINING THE MAIN APP ROUTER VARIABLE
const router = express.Router();

// GETTING ALL DIFFERENT APP ROUTES
const homeRouter = require('./homeRoute.js');
const userRouter = require('./usersRoutes');
const swaggerRouter = require('./swaggerConnectionRoutes');

// LINKING ALL DIFFERENT APP ROUTES TO SINGLE MAIN ROUTE
router.use('/', swaggerRouter);
router.use('/', homeRouter);
router.use('/users', userRouter);

module.exports = router;
