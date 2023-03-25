const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
  price: {
    type: String,
    required: true
  },
  apartmentStatus: {
    type: String,
    required: true
  },
  rentalType: {
    type: String,
    enum: ['entire-apartment', 'Shared'],
    default: 'entire-apartment'
  },
  apartmentPlotNumber: {
    type: String,
    maxlength: 10,
    required: true
  },
  streetName: {
    type: String,
    trim: true,
    maxlength: 25,
    required: true
  },
  ApartmentBuildingName: {
    type: String,
    maxlength: 25
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
    type: String
  },
  maximumStayMonths: {
    type: String
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

module.exports = mongoose.model('Apartment', ApartmentSchema);
