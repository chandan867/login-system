const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User=require('./models/UserModel')
const mongoose = require('mongoose');
const dotenv=require('dotenv')
const localStrategy=require('passport-local').Strategy


  dotenv.config()

  passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
  passport.deserializeUser((id, done) => {
      User.findById(id).then(user => {
        done(null, user);
      });
    });
  
    passport.use(
      new GoogleStrategy({
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: process.env.CALLBACK_URL,
      }, (accessToken, refreshToken, profile, done) => {
          // passport callback function
          //check if user already exists in our db with the given profile ID
          console.log(profile)
          User.findOne({googleId: profile.id}).then((currentUser)=>{
            if(currentUser){
              //if we already have a record with the given profile ID
              done(null, currentUser);
            } else{
                 //if not, create a new user 
                new User({
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    googleId: profile.id,
  
                }).save().then((newUser) =>{
                  done(null, newUser);
                });
  
              
             } 
          })
        })
    );
  
   
  


