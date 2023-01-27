const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');

const CLIENT_URL = "http://localhost:3000/dashboard";

router.get("/login/success", (req, res) => {
   // Generate a JWT containing the user's ID

  if (req.user) {
    // To generate the token and when user login then can store this token in the local storage
    const tokenss= jwt.sign({ id: req.user }, "dfsfds");

    res.status(200).json({
      user: req.user,
      token: tokenss
    });

  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("http://localhost:3000");
});

// to sign up

router.get("/google", passport.authenticate("google", { scope: ["openid","profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  }),


);



module.exports = router