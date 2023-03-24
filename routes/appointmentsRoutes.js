// IMPORTING PACKAGES-DEPENDENCIES FOR THE SERVER
const express = require('express');

// GET THE USER AUTHENTICATION FUNCTION
const { authenticateUser } = require('../middleware/authentication.js');

// CREATING-DEFINING THE ROUTER VARIABLE
const appointmentsRouter = express.Router();

// GET THE VALIDATION FUNCTIONS
const {
  validateIncomingAppointmentDataForAddAppointment,
  validateIncomingAppointmentDataForUpdatingAppointment
} = require('../middleware/validate');

const {
  getAllAppointments,
  getSingleAppointment,
  addAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentsController.js');

// ADD AN APPOINTMENT
appointmentsRouter.post(
  '/',
  authenticateUser,
  validateIncomingAppointmentDataForAddAppointment,
  addAppointment
);

// UPDATE AN APPOINTMENT
appointmentsRouter.put(
  '/:id',
  authenticateUser,
  validateIncomingAppointmentDataForUpdatingAppointment,
  updateAppointment
);

// GET AS SINGLE APPOINTMENT
appointmentsRouter.get('/:id', authenticateUser, getSingleAppointment);

// GET ALL USERS
appointmentsRouter.get('/', authenticateUser, getAllAppointments);

// DELETE AN APPOINTMENT
appointmentsRouter.delete('/:id', authenticateUser, deleteAppointment);

module.exports = appointmentsRouter;
