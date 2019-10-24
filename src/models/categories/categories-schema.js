'use strict';

const mongoose = require('mongoose');

// What fields and constraints do we want?
const categories = mongoose.Schema({
  _id: {type: String},
  name: { type: String, required: true },
  description: { type: String, required: false },
});

// Do we need to run any lifecycle hooks/middleware?

// 'categories' is the table name
// categories variable is the schema
module.exports = mongoose.model('categories', categories);