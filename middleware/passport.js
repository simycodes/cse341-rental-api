const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');
const UserOauth = require('../models/UserOauth');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/users/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        console.log(accessToken);
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value
        };

        try {
          // CHECK IF USER HAS AN ACCOUNT ALREADY - IF NOT CREATE AN ACCOUNT THEN LOGIN
          let user = await UserOauth.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await UserOauth.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    UserOauth.findById(id, (err, user) => done(err, user));
  });
};
