

require('dotenv').config();
const express = require("express"),
	app = express(),
	authRoute = require("./routes/authRoute"),
	testRoute = require("./routes/testRoute"),
	auth = require('./middleware/auth.js')(),
	mongoose = require("mongoose"),
	passport = require("passport"),
	localStrategy = require("passport-local"),
	User = require("./models/user"),
	bodyParser = require("body-parser"),
	cors = require("cors");

// set cors config
var corsOptions = {
	//origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

//set db connection
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//set urlencoded and json body parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(auth.initialize());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// passport config
passport.use(new localStrategy(User.authenticate()));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//set routes
app.use(authRoute);
app.use(testRoute);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});