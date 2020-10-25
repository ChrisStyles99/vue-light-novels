const dbConnection = require('./config/dbConnection');
const connection = dbConnection();
const bcrypt = require('bcryptjs');
const localStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use(
    new localStrategy({usernameField: 'email', passwordField: 'password'}, async(email, password, done) => {
      connection.query('SELECT * FROM users WHERE email = ?', [email], async(error, user) => {

        if(error) throw error;
  
        if(user.length < 1) {
          return done(null, false);
        }
  
        const validPass = await bcrypt.compare(password, user[0].password);

        if(!validPass) {
          return done(null, false);
        }

        return done(null, user[0]);
      });
    })
  )
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    connection.query('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
      cb(err, user[0]);
    })
  });
}