'use strict';

const mongoose = require('mongoose');

// What fields and constraints do we want?
const products = mongoose.Schema({
  _id: {type: String},
  name: { type: String, required: true },
  description: { type: String, required: false },
});

module.exports = mongoose.model('products', products);