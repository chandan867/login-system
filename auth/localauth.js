const passport = require('passport');
//const LocalStrategy = require('passport-google-oauth20').Strategy;
LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const dotenv=require('dotenv')
//const localStrategy=require('passport-local').Strategy
const User=require('../models/UserModel')


passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    User.findOne({ email:email }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Incorrect details.' }); }
        if(!user.isValidated) { return done(null, false, { message: 'please verify ur email' });}
        if (!(user.password===password)) { return done(null, false, { message: 'Incorrect details.' } );}
        return done(null, user);
      });
  
  }))
  
  module.exports=passport


// passport.use(new LocalStrategy(
//     function(email, password, done) {
//       User.findOne({ email:email }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) { return done(null, false, { message: 'Incorrect details.' }); }
//         if (!(user.password===password)) { return done(null, false, { message: 'Incorrect details.' } );}
//         return done(null, user);
//       });
//     }
//   ));