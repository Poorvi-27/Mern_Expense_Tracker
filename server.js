const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db');
// require('dotenv').config();

dotenv.config({ path: './config/config.env' });

connectDB();

const transactions = require('./routes/transactions');

const app = express();

app.use(cors(
  {
    origin: [""],
    methods: ["GET", "POST", "DELETE"],
    credentials:true
  }
));

app.use(express.json());

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

app.use('/api/v1/transactions', transactions);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

//console.log(process.env.MONGO_URI); // This should print your MongoDB URI

// const PORT = process.env.PORT || 5000;
// const mode = process.env.NODE_ENV || 'development';

// app.listen(PORT, console.log(`Server running in ${mode} mode on port ${PORT}`.
//   yellow.bold));
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
