const router = require("express").Router();
const passport = require("passport");
const jwt = require('jsonwebtoken');

const CLIENT_URL = "http://localhost:3000/dashboard";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
   
      user: req.user,
      token: req.token
      //   cookies: req.cookies
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
    successRedirect: "http://localhost:3000",
    failureRedirect: "/login/failed",
  }),


);



module.exports = router