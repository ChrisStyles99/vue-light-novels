const express = require('express');
const cors = require('cors');

if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

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