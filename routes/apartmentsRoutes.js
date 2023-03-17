// IMPORTING PACKAGES-DEPENDENCIES FOR THE SERVER
const express = require('express');
// GET THE USER AUTHENTICATION FUNCTION
const { authenticateUser } = require('../middleware/authentication.js');
// CREATING-DEFINING THE ROUTER VARIABLE
const apartmentRouter = express.Router();

// GET THE VALIDATION FUNCTIONS
const {
  validateIncomingApartmentDataForAddApartment,
  validateIncomingApartmentDataForUpdatingApartment
} = require('../middleware/validate');

const {
  getAllApartments,
  getSingleApartment,
  addApartment,
  updateApartment,
  deleteApartment
} = require('../controllers/apartmentsController.js');

// GET ALL APARTMENTS
apartmentRouter.get('/', getAllApartments);

// GET AS SINGLE APARTMENT
apartmentRouter.get('/:id', getSingleApartment);

// ADD AN APARTMENT
apartmentRouter.post(
  '/',
  authenticateUser,
  validateIncomingApartmentDataForAddApartment,
  addApartment
);

// UPDATE AN APARTMENT
apartmentRouter.put(
  '/:id',
  authenticateUser,
  validateIncomingApartmentDataForUpdatingApartment,
  updateApartment
);

// DELETE AN APARTMENT
apartmentRouter.delete('/:id', authenticateUser, deleteApartment);

module.exports = apartmentRouter;
