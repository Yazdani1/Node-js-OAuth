const express = require("express");
const cookieSession = require("cookie-session");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');
const passport = require("passport");
const passportSetup = require("./passport");
const passportSignin = require("./passportSignIn");

require("./model/db");


app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);


app.use(express.json({ limit: "4.5mb" }));


// app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth",require("./routes/auth"));
app.use("/auth",require("./routes/user"));
app.use("/auth",require("./routes/authSignIn"));

// app.use("/api",require("./router/ExpenseCategory"));
// app.use("/api",require("./router/ExpenseList"));


app.listen(port, (req, res) => {
  console.log("Server connected");
});
