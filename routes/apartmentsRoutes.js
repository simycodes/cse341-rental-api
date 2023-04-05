// IMPORTING PACKAGES-DEPENDENCIES FOR THE SERVER
const express = require('express');
// GET THE USER AUTHENTICATION FUNCTION
const { authenticateUser } = require('../middleware/authentication.js');
// CREATING-DEFINING THE ROUTER VARIABLE
const router = express.Router();

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
router.get('/', getAllApartments);

// GET AS SINGLE APARTMENT
router.get('/:id', getSingleApartment);

// ADD AN APARTMENT
router.post('/', authenticateUser, validateIncomingApartmentDataForAddApartment, addApartment);

// UPDATE AN APARTMENT
router.put(
  '/:id',
  authenticateUser,
  validateIncomingApartmentDataForUpdatingApartment,
  updateApartment
);

// DELETE AN APARTMENT
router.delete('/:id', authenticateUser, deleteApartment);

module.exports = router;
