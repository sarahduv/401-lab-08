'use strict';

const Products = require('../models/products/products.js');
const products = new Products();

module.exports.register = function(app){

  app.get('/api/v1/products', getProducts);
  app.post('/api/v1/products', postProducts);
  app.get('/api/v1/products/:id', getProduct);
  app.put('/api/v1/products/:id', putProducts);
  app.delete('/api/v1/products/:id', deleteProducts);


  // ROUTE HANDLER FUNCTIONS
  /**
   * @params {request} takes in a request
   * @result {object} returns specified request
   */
  function getProducts(request,response,next) {
    // expects an array of objects back
    products.get()
      .then( data => {
        const output = {
          count: data.length,
          results: data,
        };
        response.status(200).json(output);
      })
      .catch( next );
  }

  /**
   * @params {request} takes in a request
   * @result {object} returns specified request
   */
  function getProduct(request,response,next) {
    // expects an array with one object in it
    products.get(request.params.id)
      .then( result => response.status(200).json(result[0]) )
      .catch( next );
  }

  /**
   * @params {request} takes in a request
   * @result {object} creates a new object
   */
  function postProducts(request,response,next) {
    // expects the record that was just added to the database
    products.post(request.body)
      .then( result => response.status(200).json(result) )
      .catch( next );
  }

  /**
   * @params {request} takes in a request
   * @result {object} updates a specified object by ID
   */
  function putProducts(request,response,next) {
    // expects the record that was just updated in the database
    products.put(request.params.id, request.body)
      .then( result => response.status(200).json(result) )
      .catch( next );
  }

  /**
   * @params {request} takes in a request
   * @result {object} deletes an object specified by ID
   */
  function deleteProducts(request,response,next) {
    // Expects no return value (the resource should be gone)
    products.delete(request.params.id)
      .then( result => response.status(200).json(result) )
      .catch( next );
  }
};
