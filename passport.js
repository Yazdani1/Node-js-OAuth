const GoogleStrategy = require("passport-google-oauth20").Strategy;

const passport = require("passport");

const User = require("./model/User");


require('dotenv').config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      scope: ["openid","profile", "email"] 
    },
     async (accessToken, refreshToken, profile, cb)=> {

        try {
            // Find or create the user in the database
            let user = await User.findOne({ googleId: profile.id });
            if (!user) {
              user = new User({
                googleId: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value,
                // teamname: req.body.teamname // add this line to store the teamname from the request
              });
              await user.save();
            }
            return cb(null, user);
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

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user, done) => {
//   done(null, user);
// });