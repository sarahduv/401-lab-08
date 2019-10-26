'use strict';

require('dotenv').config();
const mongoose = require('mongoose');

console.log('starting', process.env);

const mongooseOptions = {
  useNewUrlParser:true,
  useCreateIndex: true,
};
mongoose.connect(process.env.MONGODB_URI, mongooseOptions);

require('./src/app.js').start(process.env.PORT);
