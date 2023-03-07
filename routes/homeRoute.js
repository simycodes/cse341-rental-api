// IMPORTING PACKAGES-DEPENDENCIES FOR THE SERVER
const express = require('express');

// CREATING-DEFINING THE ROUTER VARIABLE
const homeRouter = express.Router();

const { displayHome } = require('../controllers/index.js');

// HOME DEFAULT ROUTE
homeRouter.get('/', displayHome);

module.exports = homeRouter;
