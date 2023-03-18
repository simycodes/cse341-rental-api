// IMPORTING PACKAGES-DEPENDENCIES (FOR THE SERVER) & OTHER APP FILES
const express = require('express');
const bodyParser = require('body-parser'); // help send post requests
const router = require('./routes/');
const connectToDatabase = require('./db/connectionToDatabase');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
// CREATING THE SERVER APP VARIABLE
const app = express();

// IMPORTING THE .env FILE SO ITS VALUES CAN BE ACCESSED AND USED
require('dotenv').config();
// Passport config
require('./middleware/passport')(passport); // PASSING IMPORTED password AS AN ARGUMENT
// SETTING THE PORT
const PORT = process.env.PORT | 3000; //removed port 3000 because it conflicts with the ports

// VALIDATING BY PARSING INCOMING DATA-JSON FROM APP THROUGH THE BODY IN REQUEST ARGUMENT
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
// HANDLE ERROR EXCEPTIONS
process.on('uncaughtException', (error, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${error}\n` + `Exception origin: ${origin}`);
});

// IMPLEMENTING BASIC SESSION - FOR AUTH GOOGLE LOG IN SUPPORT
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL })
  })
);

// USING PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// SERVER APP AND ALL APP ROUTES CONNECTION
app.use('/', router);

// // RUN THE SERVER (AFTER CONNECTING TO THE DATABASE)
// const start = async (done) => {
//   try {
//     await connectToDatabase(process.env.MONGO_URL);
//     app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
//     done();
//   } catch (error) {
//     console.log(error);
//   }
// };

// // CALL THE START FUNCTION TO START THE SERVER TO DATABASE CONNECTION
// start();
// RUN THE SERVER (AFTER CONNECTING TO THE DATABASE)
const start = async (done) => {
  try {
    await connectToDatabase(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
      done();
    });
  } catch (error) {
    console.log(error);
  }
};

// CALL THE START FUNCTION TO START THE SERVER TO DATABASE CONNECTION
if (process.env.NODE_ENV !== 'test') {
  start(() => {});
}

module.exports = app;
