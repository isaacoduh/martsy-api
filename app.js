const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
  
app.use(express.json());
module.exports = app;