const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/dashboard";



// to sign in

router.get("/google", passport.authenticate("google", { scope: ["openid","profile", "email"] }));

router.get(
  "/google/callback/signin",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "http://localhost:3000",
  })
);





module.exports = router