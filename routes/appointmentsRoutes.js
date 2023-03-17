// IMPORTING PACKAGES-DEPENDENCIES FOR THE SERVER
const express = require('express');

// GET THE USER AUTHENTICATION FUNCTION
const { authenticateUser } = require('../middleware/authentication.js');

// CREATING-DEFINING THE ROUTER VARIABLE
const appointmentsRouter = express.Router();

// GET THE VALIDATION FUNCTIONS
const {
  /*validateIncomingHouseDataForAddHouse,*/
  validateIncomingAppointmentDataForUpdatingAppointment
} = require('../middleware/validate');

const {
  getAppointments,
  getAppointmentById,
  putAppointmentById,
  deleteAppointmentById
} = require('../controllers/appointmentsController.js');

// UPDATE A HOUSE
appointmentsRouter.put(
  '/updateAppointment',
  authenticateUser,
  validateIncomingAppointmentDataForUpdatingAppointment,
  putAppointmentById
);

// GET AS SINGLE HOUSE
appointmentsRouter.get('/:id', authenticateUser, getAppointmentById);

// GET ALL USERS
appointmentsRouter.get('/', authenticateUser, getAppointments);

// DELETE A HOUSE
appointmentsRouter.delete('/:id', authenticateUser, deleteAppointmentById);

module.exports = appointmentsRouter;
