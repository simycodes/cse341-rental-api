// IMPORTING PACKAGES-DEPENDENCIES FOR THE SERVER
const express = require('express');
const passport = require('passport');
// CREATING-DEFINING THE ROUTER VARIABLE
const userRouter = express.Router();

// GET THE USER AUTHENTICATION FUNCTION
const { authenticateUser } = require('../middleware/authentication.js');
// GET THE VALIDATION FUNCTIONS
const {
  validateIncomingUserDataForLoginUser,
  validateIncomingUserDataForUpdatingUser,
  validateIncomingUserDataForRegisteringUser
} = require('../middleware/validate');

const {
  registerUser,
  googleOAuth,
  login,
  updateUser,
  getSingleUser,
  getAllUsers
} = require('../controllers/usersController.js');

// AUTHENTICATION WITH GOOGLE AUTH - LOGIN START
userRouter.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// REGISTER A USER
userRouter.post('/registerUser', validateIncomingUserDataForRegisteringUser, registerUser);

// GOOGLE AUTH CALLBACK - LOGIN CONTINUATION
userRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  googleOAuth
);

// LOGIN A USER
userRouter.post('/login', validateIncomingUserDataForLoginUser, login);

// UPDATE A USER
userRouter.put(
  '/updateUser',
  authenticateUser,
  validateIncomingUserDataForUpdatingUser,
  updateUser
);

// GET AS SINGLE USER
userRouter.get('/:id', authenticateUser, getSingleUser);

// GET ALL USERS
userRouter.get('/', authenticateUser, getAllUsers);

module.exports = userRouter;
