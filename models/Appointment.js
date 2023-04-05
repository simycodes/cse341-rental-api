const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  dateAndTime: {
    type: String,
    required: true
  },
  houseOrApartmentId: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
