// IMPORTING PACKAGES-DEPENDENCIES FOR THE SERVER
const express = require('express');
// GET THE USER AUTHENTICATION FUNCTION
const { authenticateUser } = require('../middleware/authentication.js');
// CREATING-DEFINING THE ROUTER VARIABLE
const houseRouter = express.Router();

// GET THE VALIDATION FUNCTIONS
const {
  validateIncomingHouseDataForAddHouse,
  validateIncomingHouseDataForUpdatingHouse
} = require('../middleware/validate');

const {
  getAllHouses,
  getSingleHouse,
  addHouse,
  updateHouse,
  deleteHouse
} = require('../controllers/housesController.js');

// GET ALL HOUSES
houseRouter.get('/', getAllHouses);

// GET AS SINGLE HOUSE
houseRouter.get('/:id', getSingleHouse);

// ADD A HOUSE
houseRouter.post('/', authenticateUser, validateIncomingHouseDataForAddHouse, addHouse);

// UPDATE A HOUSE
houseRouter.put('/:id', authenticateUser, validateIncomingHouseDataForUpdatingHouse, updateHouse);

// DELETE A HOUSE
houseRouter.delete('/:id', authenticateUser, deleteHouse);

module.exports = houseRouter;
