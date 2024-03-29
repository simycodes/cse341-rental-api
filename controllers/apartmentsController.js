// GET THE USER MODEL
const Apartment = require('../models/Apartment');

// ROUTE FUNCTION TO ADD AN APARTMENT
const addApartment = async (req, res) => {
  try {
    // INDICATING THAT APPARTMENT WAS CREATED BY THE USER. req.user.userId IS GIVEN BY auth MIDDLEWARE
    req.body.createdBy = req.user.userId;
    // CREATE A NEW APARTMENT
    const newApartment = await Apartment.create(req.body);
    // SEND BACK THE RESPONSE TO THE FRONT-END
    res.status(200).json({ newApartment });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO GET A SINGLE APARTMENT
const getSingleApartment = async (req, res) => {
  const { id: apartmentId } = req.params;
  try {
    // CHECK IF APARTMENT IS IN DATABASE
    const apartment = await Apartment.findOne({ _id: apartmentId });
    if (!apartment) {
      res.status(500).json({ message: 'Apartment does not exist' });
    } else {
      res.status(200).json({ apartment });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO GET ALL APARTMENTS
const getAllApartments = async (req, res) => {
  try {
    const allApartments = await Apartment.find();
    res.status(200).json({ allApartments });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO UPDATE A APARTMENT
const updateApartment = async (req, res) => {
  const { id: apartmentId } = req.params;
  try {
    // CHECK IF JOB TO BE UPDATED IS IN THE DATABASE
    const apartment = await Apartment.findOne({ _id: apartmentId });
    if (!apartment) {
      res.status(500).json({ message: 'Apartment does not exist' });
    } else {
      // VERIFY USER IS UPDATING OWN APARTMENT
      if (req.user.userId === apartment.createdBy.toString()) {
        // UPDATE THE APARTMENT
        const updatedApartment = await Apartment.findOneAndUpdate({ _id: apartmentId }, req.body, {
          new: true,
          runValidators: true // CHECK IF PROVIDED VALUES ARE OF THE RIGHT DATA TYPE - NOT INCLUDED PROPERTIES - CHECK ONLY SUBMITTED PROPERTIES
        });
        res.status(200).json({ updatedApartment });
      } else {
        res.status(500).json({ message: 'You can not update this Apartment' });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO DELETE A APARTMENT
const deleteApartment = async (req, res) => {
  const { id: apartmentId } = req.params;
  try {
    // CHECK IF APARTMENT TO BE DELETED EXISTS
    const apartment = await Apartment.findOne({ _id: apartmentId });
    if (!apartment) {
      res.status(500).json({ message: 'Apartment does not exist' });
    } else {
      // CHECK PERMISSIONS - VERIFY USER IS USER DELETING OWN APARTMENT
      if (req.user.userId === apartment.createdBy.toString()) {
        // DELETE ACTUAL APARTMENT NOW
        await apartment.remove();
        res.status(200).json({ msg: 'Apartment deleted successfully' });
      } else {
        res.status(500).json({ message: 'You not authorized to delete this Apartment' });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  addApartment,
  getSingleApartment,
  getAllApartments,
  updateApartment,
  deleteApartment
};
