// IMPORTING PACKAGES-DEPENDENCIES FOR THE SERVER
const express = require('express');

// GET THE USER AUTHENTICATION FUNCTION
const { authenticateUser } = require('../middleware/authentication.js');

// CREATING-DEFINING THE ROUTER VARIABLE
const apartmentsRouter = express.Router();

// GET THE VALIDATION FUNCTIONS
const {
  /*validateIncomingHouseDataForAddHouse,*/
  validateIncomingApartmentDataForUpdatingApartment,
} = require('../middleware/validate');

const {
    getApartments,
    getApartmentById,
    putApartmentById,
    deleteApartmentById
  } = require('../controllers/apartmentsController.js');

  // UPDATE A HOUSE
apartmentsRouter.put(
  '/updateApartment',
  authenticateUser,
  validateIncomingApartmentDataForUpdatingApartment,
  putApartmentById
);
  
// GET AS SINGLE HOUSE
apartmentsRouter.get('/:id', authenticateUser, getApartmentById);
  
// GET ALL USERS
apartmentsRouter.get('/', authenticateUser, getApartments);

// DELETE A HOUSE
apartmentsRouter.delete('/:id', authenticateUser, deleteApartmentById);

module.exports = apartmentsRouter;