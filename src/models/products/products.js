'use strict';

const MongoModel = require('../mongo-model.js');
const schema = require('./products-schema.js');

// How can we connect ourselves to the mongo interface?
// What do we export?

class Products extends MongoModel {

  constructor() {
    super(schema);
  }
}

module.exports = Products;

