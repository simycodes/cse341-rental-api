const validator = require('../helpers/validate');

// FUNCTION TO VALIDATE INCOMING POST DATA
const validateIncomingPostData = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    postCategory: 'required|string',
    userId: 'required|string',
    userEmail: 'required|email'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// FUNCTION TO VALIDATE INCOMING USER DATA - REGISTER USER
const validateIncomingUserDataForRegisteringUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    password: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// FUNCTION TO VALIDATE INCOMING USER DATA - LOGIN USER
const validateIncomingUserDataForLoginUser = (req, res, next) => {
  const validationRule = {
    email: 'required|email',
    password: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// FUNCTION TO VALIDATE INCOMING USER DATA - UPDATING USER
const validateIncomingUserDataForUpdatingUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    password: 'string',
    birthday: 'string',
    gender: 'string',
    favoriteQuote: 'string',
    country: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// FUNCTION TO VALIDATE INCOMING HOUSE DATA - ADD A HOUSE
const validateIncomingHouseDataForAddHouse = (req, res, next) => {
  const validationRule = {
    price: 'required|string',
    houseNumber: 'required|string',
    streetName: 'required|string',
    residentialAreaName: 'required|string',
    city: 'required|string',
    province: 'required|string',
    country: 'required|string',
    minimumStayMonths: 'string',
    maximumStayMonths: 'string',
    description: 'string',
    viewingTimePeriod: 'string',
    landlordEmail: 'required|email',
    landlordPhoneNumber: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// FUNCTION TO VALIDATE INCOMING HOUSE DATA - UPDATE A HOUSE
const validateIncomingHouseDataForUpdatingHouse = (req, res, next) => {
  const validationRule = {
    price: 'required|string',
    houseNumber: 'required|string',
    streetName: 'required|string',
    residentialAreaName: 'required|string',
    city: 'required|string',
    province: 'required|string',
    country: 'required|string',
    minimumStayMonths: 'string',
    maximumStayMonths: 'string',
    description: 'string',
    viewingTimePeriod: 'string',
    landlordEmail: 'required|email',
    landlordPhoneNumber: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// FUNCTION TO VALIDATE INCOMING HOUSE DATA - ADD A HOUSE
const validateIncomingApartmentDataForAddApartment = (req, res, next) => {
  const validationRule = {
    price: 'required|string',
    rentalType: 'required|string',
    apartmentPlotNumber: 'required|string',
    streetName: 'required|string',
    ApartmentBuildingName: 'required|string',
    residentialAreaName: 'required|string',
    city: 'required|string',
    province: 'required|string',
    country: 'string',
    minimumStayMonths: 'string',
    maximumStayMonths: 'string',
    description: 'string',
    viewingTimePeriod: 'string',
    landlordEmail: 'required|email',
    landlordPhoneNumber: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// FUNCTION TO VALIDATE INCOMING HOUSE DATA - UPDATE A HOUSE
const validateIncomingApartmentDataForUpdatingApartment = (req, res, next) => {
  const validationRule = {
    price: 'required|string',
    rentalType: 'required|string',
    apartmentPlotNumber: 'required|string',
    streetName: 'required|string',
    ApartmentBuildingName: 'required|string',
    residentialAreaName: 'required|string',
    city: 'required|string',
    province: 'required|string',
    country: 'string',
    minimumStayMonths: 'string',
    maximumStayMonths: 'string',
    description: 'string',
    viewingTimePeriod: 'string',
    landlordEmail: 'required|email',
    landlordPhoneNumber: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  validateIncomingPostData,
  validateIncomingUserDataForLoginUser,
  validateIncomingUserDataForRegisteringUser,
  validateIncomingUserDataForUpdatingUser,
  validateIncomingHouseDataForAddHouse,
  validateIncomingHouseDataForUpdatingHouse,
  validateIncomingApartmentDataForAddApartment,
  validateIncomingApartmentDataForUpdatingApartment
};
