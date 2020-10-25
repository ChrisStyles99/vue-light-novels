const {Router} = require('express');
const router = Router();
const dbConnection = require('../config/dbConnection');
const connection = dbConnection();
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.post('/register', (req, res) => {
  connection.query('SELECT email FROM users WHERE email = ?', [req.body.email], async(error, results) => {
    if(error) throw error;

    if(results.length > 0) {
      return res.json({error: true, msg: 'Email already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    }

    connection.query('INSERT INTO users SET ?', newUser, (error, result) => {
      if(error) throw error;

      return res.json({msg: 'User registered'});
    });
  });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if(err) throw err;
    if(!user) {
      res.json({error: true, msg: 'Email or password is incorrect'});
    } else {
      req.logIn(user, err => {
        if(err) throw err;
        res.json({msg: 'Welcome'});
      })
    }
  })(req, res, next);
});

router.get('/profile', (req, res) => {
  res.send('Profile');
});

module.exports = router;