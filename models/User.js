const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
    trim: true
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'Your Last Name'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false // this prevents the password from being returned to the user
  },
  birthday: {
    type: String,
    default: ''
  },
  gender: {
    type: String,
    default: ''
  },
  country: {
    type: String,
    trim: true,
    maxlength: 20,
    default: 'Your Country'
  }
});

// SET UP THE MIDDLEWARE - THE pre CALLS THE MIDDLEWARE TO PROCESS THE USER OBJECT/DOCUMENT
// BEFORE IT IS SAVED - SOME OF THESE MIDDLEWARE REFEREED AS pre HERE ARE User.findOne()
UserSchema.pre('save', async function () {
  // console.log(this.modifiedPaths()); // DISPLAY VALUES/PATH/FIELD BEING UPDATED IN THE UPDATE ROUTE
  // console.log(this.isModified('name')); // checks if a given path/field is being updated - in this case is name of user being updated
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// CREATING CUSTOM MONGOOSE MIDDLEWARE FOR CREATING JWT - .methods is a key word/property
// createJWT IS A USER DEFINED NAME FOR THE CUSTOM MIDDLEWARE
UserSchema.methods.createJWT = function () {
  // console.log(this); // THIS PRINTS THE NEWLY CREATED USER OBJECT WITH ENTERED USER DETAILS
  // USER ID,THE JWT SECRET KEY CODE AND THE EXPIRY TIME USED TO CREATE A JWT TOKEN
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME
  });
};

// FUNCTION TO COMPARE USER PASSWORD TO DATABASE PASSWORD ON LOGIN
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
