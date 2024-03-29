const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User')
// const findOrCreate = require('mongoose-findorcreate');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://notebook-nglu.onrender.com/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {

    console.log(profile);

    const newUser = new User({
         googleId: profile.id,
         displayName: profile.displayName,
         firstName: profile.name.givenName,
         lastName: profile.name.familyName,
         image: profile.photos[0].value
        //  image: profile.picture
    });
   
    try {
        let user = await User.findOne({googleId: profile.id});
        if(user){
            done(null, user);
        }else{
            user = await User.create(newUser);
            done(null, user);
        }
    } catch (error) {
        console.log(error);
    }
  }
  
));

// accessing google login route
router.get('/auth/google',
  passport.authenticate('google', { scope: ['email','profile'] }));

// retrieving user data
router.get('/google/callback', 
  passport.authenticate('google', 
  { failureRedirect: '/login-failure',
    successRedirect: '/dashboard'
  }));

  //failure route
router.get('/login-failure',(req,res)=>{
    res.send('something went wrong...');
  });

//removing users session
router.get('/logout',(req,res)=>{
    req.session.destroy(error=>{
        if(error){
            console.log(error);
            res.send('error logging out');
        }else{
            res.redirect('/');
        }
    })
})

//persists users data after successful authentication
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

//retrieve user's data from sessions

// passport.deserializeUser(function (id, done) {
//     // User.findById(id, function(err, user){
//     //     done(err, user);
//     // })
//     User.findById(id)
//     .then(user =>{
//       done(null, user);
//     })
//     .catch(err=>{
//       console.log(err);
//     })
// })

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


module.exports = router;