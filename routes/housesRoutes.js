// IMPORTING PACKAGES-DEPENDENCIES FOR THE SERVER
const express = require('express');

// GET THE USER AUTHENTICATION FUNCTION
const { authenticateUser } = require('../middleware/authentication.js');

// CREATING-DEFINING THE ROUTER VARIABLE
const housesRouter = express.Router();

// GET THE VALIDATION FUNCTIONS
const {
  /*validateIncomingHouseDataForAddHouse,*/
  validateIncomingHouseDataForUpdatingHouse,
} = require('../middleware/validate');

const {
    getHouses,
    getHouseById,
    putHouseById,
    deleteHouseById
  } = require('../controllers/housesController.js');

  // UPDATE A HOUSE
housesRouter.put(
  '/updatehouse',
  authenticateUser,
  validateIncomingHouseDataForUpdatingHouse,
  putHouseById
);
  
// GET AS SINGLE HOUSE
housesRouter.get('/:id', authenticateUser, getHouseById);
  
// GET ALL USERS
housesRouter.get('/', authenticateUser, getHouses);

// DELETE A HOUSE
housesRouter.delete('/:id', authenticateUser, deleteHouseById);

module.exports = housesRouter;