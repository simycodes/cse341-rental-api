// GET THE USER MODEL
const House = require('../models/House');

// ROUTE FUNCTION TO ADD A HOUSE
const addHouse = async (req, res) => {
  try {
    // INDICATING THAT HOUSE WAS CREATED BY THE USER. req.user.userId IS GIVEN BY auth MIDDLEWARE
    req.body.createdBy = req.user.userId;
    // CREATE A NEW HOUSE
    const newHouse = await House.create(req.body);
    // SEND BACK THE RESPONSE TO THE FRONT-END
    res.status(200).json({ newHouse });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO GET A SINGLE HOUSE
const getSingleHouse = async (req, res) => {
  const { id: houseId } = req.params;
  try {
    // CHECK IF HOUSE IS IN DATABASE
    const house = await House.findOne({ _id: houseId });
    if (!house) {
      res.status(500).json({ message: 'House does not exist' });
    } else {
      res.status(200).json({ house });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO GET ALL HOUSES
const getAllHouses = async (req, res) => {
  try {
    const allHouses = await House.find();
    res.status(200).json({ allHouses });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO UPDATE A HOUSE
const updateHouse = async (req, res) => {
  const { id: houseId } = req.params;
  try {
    // CHECK IF JOB TO BE UPDATED IS IN THE DATABASE
    const house = await House.findOne({ _id: houseId });
    if (!house) {
      res.status(500).json({ message: 'House does not exist' });
    } else {
      // VERIFY USER IS UPDATING OWN HOUSE
      if (req.user.userId === house.createdBy.toString()) {
        // UPDATE THE HOUSE
        const updatedHouse = await House.findOneAndUpdate({ _id: houseId }, req.body, {
          new: true,
          runValidators: true // CHECK IF PROVIDED VALUES ARE OF THE RIGHT DATA TYPE - NOT INCLUDED PROPERTIES - CHECK ONLY SUBMITTED PROPERTIES
        });
        res.status(200).json({ updatedHouse });
      } else {
        res.status(500).json({ message: 'You can not update this house' });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE FUNCTION TO DELETE A HOUSE
const deleteHouse = async (req, res) => {
  const { id: houseId } = req.params;
  try {
    // CHECK IF HOUSE TO BE DELETED EXISTS
    const house = await House.findOne({ _id: houseId });
    if (!house) {
      res.status(500).json({ message: 'House does not exist' });
    } else {
      // CHECK PERMISSIONS - VERIFY USER IS USER DELETING OWN HOUSE
      if (req.user.userId === house.createdBy.toString()) {
        // DELETE ACTUAL HOUSE NOW
        await house.remove();
        res.status(200).json({ msg: 'House deleted successfully' });
      } else {
        res.status(500).json({ message: 'You not authorized to delete this house' });
      }
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  addHouse,
  getAllHouses,
  getSingleHouse,
  updateHouse,
  deleteHouse
};
