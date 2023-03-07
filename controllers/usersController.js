// GET THE USER MODEL
const User = require('../models/User');
const UserOauth = require('../models/UserOauth');
const ObjectId = require('mongodb').ObjectId;

// ROUTE TO REGISTER A USER
const registerUser = async (req, res) => {
  try {
    // VALIDATE VALUES (EMPTY) IN CONTROLLER COMING FROM THE USER
    const { firstName, lastName, email, password } = req.body;
    // VALIDATE IF EMAIL IS UNIQUE
    const userEmailAlreadyExists = await User.findOne({ email });
    if (userEmailAlreadyExists) {
      throw new Error('The email is already in use. Please use another email');
    }
    // CREATE A NEW USER IN THE DATABASE - SAVING IS DONE WITH MIDDLEWARE IN User.js
    const user = await User.create({ firstName, lastName, email, password });
    // CREATE JWT - FUNCTION IS IN User.js
    const token = user.createJWT();
    // SENDING BACK RESPONSE
    res.status(200).json({
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        location: user.location
      },
      token,
      location: user.location
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE TO LOGIN A USER VIA GOOGLE AUTH
const googleOAuth = async (req, res) => {
  try {
    let firstName = req.user.firstName;
    let lastName = req.user.lastName;
    res.status(200).send(`You are now logged in as ${firstName} ${lastName}`);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ROUTE TO LOGIN A USER
const login = async (req, res) => {
  try {
    // GET THE USER LOGIN DETAILS
    const { email, password } = req.body;
    console.log(req.body);
    // GET THE USER FROM THE DATABASE USING THE EMAIL ENTERED -
    // .select('+password'); HELPS GET RETURN PWD FROM DB AS IT RESTRICTED BY DEFAULT +, SET BY select in user model
    const user = await User.findOne({ email }).select('+password');
    // CHECK IF THE USER EXISTS IN THE DATABASE (IS REGISTERED USER)
    if (!user) {
      throw new Error('Invalid Credentials');
    }

    // COMPARE USER ENTERED PASSWORD WITH DB DATABASE
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid Credentials');
    }

    // CREATE SESSION USER TOKEN - user.createJWT(); CALLS UserSchema.methods.createJWT = function () {} IN user model
    const token = user.createJWT();
    // REMOVE THE PASSWORD FROM THE CLIENT SIDE AFTER COMPARING IS DONE
    user.password = undefined;
    // SEND BACK THE REQUEST STATUS AND USER DATA TO THE FRONT END
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// ROUTE TO UPDATE A USER
const updateUser = async (req, res) => {
  try {
    console.log(req.user); // THIS NOW HOLDS USER ID - AFTER AUTHENTICATION WITH jwt.verify() - { userId: '63e69ee471eea96576349459' }
    // res.send("update user working");
    console.log(req.body);
    const { firstName, lastName, email, birthday, gender, favoriteQuote, country } = req.body;
    // FIND THE USER IN THE DB USING HIS USER ID
    const user = await User.findOne({ _id: req.user.userId });
    // MAKE THE UPDATE TO THE USER DETAILS WITH NEW INCOMING DATA
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.birthday = birthday;
    user.gender = gender;
    user.location = country;
    // UPDATE THE NEW USER DETAILS - user.save(); CALLS UserSchema.pre('save',) middleware
    // that may cause some update errors, hence use of if(!this.isModified('password')) expression in the middleware
    await user.save();
    // CREATE NEW token
    const token = user.createJWT();
    // SEND BACK NEW UPDATED USER INFORMATION TO THE FRONTEND
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET A SINGLE USER
const getSingleUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Please provide a valid user id to get the user wanted.');
  }
  try {
    const user = (await User.findById(req.params.id)) || (await UserOauth.findById(req.params.id));
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    const users2 = await UserOauth.find();
    let allUsers = [...users, ...users2];
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  googleOAuth,
  login,
  updateUser,
  getSingleUser,
  getAllUsers
};
