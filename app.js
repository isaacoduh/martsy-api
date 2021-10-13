const express = require('express');
const colors = require('colors');
const morgan = require('morgan');
require('dotenv').config();
require('./config/mongoose');
const userRouter = require('./routers/user');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
  
app.use(express.json());
app.use('/api/v1/users/',userRouter);

module.exports = app;