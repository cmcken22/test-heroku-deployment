const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }
//   res.redirect('/login');
// }

// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/');
//   }
//   next()
// }


// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view

const initializePassport = require('./passport-config');
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  // secret: process.env.SESSION_SECRET,
  secret: 'test',
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, '/public')));

app.get('/test', (req, res) => {
  console.log('GET /test');
  res.render('register.ejs');
  res.end();
});

app.get('/test2', (req, res) => {
  console.log('GET /test2');
  res.send("hello");
});

app.use(routes);

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/mynewsnow", {
  useNewUrlParser: true
});

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
