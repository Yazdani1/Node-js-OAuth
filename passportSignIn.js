const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("./model/User");

require('dotenv').config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback/signin",
      scope: ["openid","profile", "email"] 
    },
     async (accessToken, refreshToken, profile, cb)=> {

        try {
            // Find or create the user in the database
            let user = await User.findOne({ googleId: profile.id });
            if (user) {
                return cb(null, user);
            }
          } catch (err) {
            return cb(err);
          }
    }
  )
);


// Serialize the user for the session
passport.serializeUser((user, cb) => {
    cb(null, user._id);
  });
  
  // Deserialize the user from the session
  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await User.findById(id);
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  });

