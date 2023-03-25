// GET THE USER MODEL
const Appointment = require('../models/Appointment');

// ROUTE FUNCTION TO ADD AN APPOINTMENT
const addAppointment = async (req, res) => {
  try {
    // INDICATING THAT APPOINTMENT WAS CREATED BY THE USER. req.user.userId IS GIVEN BY auth MIDDLEWARE
    req.body.createdBy = req.user.userId;
    // CHECK THAT DATE STRING IS VALID
    if (req.body.dateAndTime) {
      let validateDateAndTime = Date.parse(req.body.dateAndTime);
      console.log(validateDateAndTime);
      if (isNaN(validateDateAndTime)) {
        res.status(412).send({
          success: false,
          message: 'Validation failed, dateAndTime is not valid'
        });
      }
    }
    // CREATE A NEW APPOINTMENT
    const newAppointment = await Appointment.create(req.body);
    // SEND BACK THE RESPONSE TO THE FRONT-END
    res.status(200).json({ newAppointment });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO GET A SINGLE APPOINTMENT
const getSingleAppointment = async (req, res) => {
  const { id: appointmentId } = req.params;
  try {
    // CHECK IF APPOINTMENT IS IN DATABASE
    const appointment = await Appointment.findOne({ _id: appointmentId });
    if (!appointment) {
      res.status(500).json({ message: 'Appointment does not exist' });
    } else {
      res.status(200).json({ appointment });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO GET ALL APPOINTMENTS
const getAllAppointments = async (req, res) => {
  try {
    const allAppointments = await Appointment.find();
    res.status(200).json({ allAppointments });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO UPDATE AN APPOINTMENT
const updateAppointment = async (req, res) => {
  const { id: appointmentId } = req.params;
  // CHECK THAT DATE STRING IS VALID
  if (req.body.dateAndTime) {
    let validateDateAndTime = Date.parse(req.body.dateAndTime);
    console.log(validateDateAndTime);
    if (isNaN(validateDateAndTime)) {
      res.status(412).send({
        success: false,
        message: 'Validation failed, dateAndTime is not valid'
      });
    }
  }
  try {
    // CHECK IF APPOINTMENT TO BE UPDATED IS IN THE DATABASE
    const appointment = await Appointment.findOne({ _id: appointmentId });
    if (!appointment) {
      res.status(500).json({ message: 'Appointment does not exist' });
    } else {
      // VERIFY USER IS UPDATING OWN APPOINTMENT
      if (req.user.userId === appointment.createdBy.toString()) {
        // UPDATE THE APPOINTMENT
        const updatedAppointment = await Appointment.findOneAndUpdate(
          { _id: appointmentId },
          req.body,
          {
            new: true,
            runValidators: true // CHECK IF PROVIDED VALUES ARE OF THE RIGHT DATA TYPE - NOT INCLUDED PROPERTIES - CHECK ONLY SUBMITTED PROPERTIES
          }
        );
        res.status(200).json({ updatedAppointment });
      } else {
        res.status(500).json({ message: 'You can not update this Appointment' });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO DELETE AN APPOINTMENT
const deleteAppointment = async (req, res) => {
  const { id: appointmentId } = req.params;
  // CHECK THAT DATE STRING IS VALID
  if (req.body.dateAndTime) {
    let validateDateAndTime = new Date(req.body.dateAndTime);
    if (!validateDateAndTime) {
      res.status(412).send({
        success: false,
        message: 'Validation failed, dateAndTime is not valid'
      });
    }
  }
  try {
    // CHECK IF APPOINTMENT TO BE DELETED EXISTS
    const appointment = await Appointment.findOne({ _id: appointmentId });
    if (!appointment) {
      res.status(500).json({ message: 'Appointment does not exist' });
    } else {
      // CHECK PERMISSIONS - VERIFY USER IS USER DELETING OWN APPOINTMENT
      if (req.user.userId === appointment.createdBy.toString()) {
        // DELETE ACTUAL APPOINTMENT NOW
        await appointment.remove();
        res.status(200).json({ msg: 'Appointment deleted successfully' });
      } else {
        res.status(500).json({ message: 'You not authorized to delete this Appointment' });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getSingleAppointment,
  getAllAppointments,
  addAppointment,
  updateAppointment,
  deleteAppointment
};
