const { genSalt } = require('bcryptjs');
const {Router} = require('express');
const router = Router();
const dbConnection = require('../config/dbConnection');
const connection = dbConnection();
const bcrypt = require('bcryptjs');

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

router.post('/login', async(req, res) => {
  try {
    const {email, password} = req.body;

    connection.query('SELECT * FROM users WHERE email = ?', [email], async(error, result) => {

      if(error) throw error;

      if(result.length < 1) {
        return res.json({error: true, msg: 'The email or the password is incorrect'});
      }

      if(!(await bcrypt.compare(password, result[0].password))) {
        return res.json({error: true, msg: 'The email or the password is incorrect'});
      }

      res.json({msg: 'Welcome!'});
    });
  } catch (error) {
    console.log(error);
  }
});

router.get('/profile', (req, res) => {
  res.send('Profile');
});

module.exports = router;