const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true
}));
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(cookieParser(process.env.SECRET));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

// MySQL
const dbConnection = require('./config/dbConnection');

const connection = dbConnection();

connection.connect(error => {
  if(error) throw error;
  console.log('Database connected');
});

// Routes
app.use('/', require('./routes/novels'));
app.use('/user', require('./routes/users'));

// listen to app
app.listen(port, () => {
  console.log('Connected to Server on port ' + port);
});