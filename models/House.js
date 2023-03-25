const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  price: {
    type: String,
    required: true
  },
  houseStatus: {
    type: String,
    required: true
  },
  houseNumber: {
    type: String,
    maxlength: 10,
    required: true
  },
  streetName: {
    type: String,
    trim: true,
    maxlength: 20,
    required: true
  },
  residentialAreaName: {
    type: String,
    maxlength: 20,
    required: true
  },
  city: {
    type: String,
    maxlength: 25,
    required: true
  },
  province: {
    type: String,
    maxlength: 25,
    required: true
  },
  country: {
    type: String,
    trim: true,
    maxlength: 25,
    default: 'Users Country'
  },
  minimumStayMonths: {
    type: String,
    maxlength: 20
  },
  maximumStayMonths: {
    type: String,
    maxlength: 20
  },
  description: {
    type: String,
    trim: true,
    maxlength: 250
  },
  viewingTimePeriod: {
    type: String
  },
  landlordEmail: {
    type: String,
    required: true
  },
  landlordPhoneNumber: {
    type: String,
    required: true
  },
  images: {
    type: Array
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('House', HouseSchema);
