'use strict';

const MongoModel = require('../mongo-model.js');
const schema = require('./categories-schema.js');

// How can we connect ourselves to the mongo interface?
// What do we export?

class Categories extends MongoModel {

  constructor() {
    super(schema);
  }
}

module.exports = Categories;

