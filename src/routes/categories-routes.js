'use strict';

const Categories = require('../models/categories/categories.js');
const categories = new Categories();

module.exports.register = function(app) {
  // Routes
  app.get('/api/v1/categories', getCategories);
  app.post('/api/v1/categories', postCategories);
  app.get('/api/v1/categories/:id', getCategory);
  app.put('/api/v1/categories/:id', putCategories);
  app.delete('/api/v1/categories/:id', deleteCategories);

  // ROUTE HANDLER FUNCTIONS
  /**
   * @params {request} takes in a request
   * @result {object} returns specified request
   */
  function getCategories(request,response,next) {
    // expects an array of object to be returned from the model
    categories.get()
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
  function getCategory(request,response,next) {
    // expects an array with the one matching record from the model
    categories.get(request.params.id)
      .then( result => response.status(200).json(result[0]) )
      .catch( next );
  }

  /**
   * @params {request} takes in a request
   * @result {object} creates a new object
   */
  function postCategories(request,response,next) {
    categories.post(request.body)
      .then( result => response.status(200).json(result) )
      .catch( next );
  }

  /**
   * @params {request} takes in a request
   * @result {object} updates a specified record
   */
  function putCategories(request,response,next) {
    // expects the record that was just updated in the database
    categories.put(request.params.id, request.body)
      .then( result => response.status(200).json(result[0]) )
      .catch( next );
  }

  /**
   * @params {request} takes in a request
   * @result {object} deletes a specified object by ID
   */
  function deleteCategories(request,response,next) {
    // Expects no return value (resource was deleted)
    categories.delete(request.params.id)
      .then( result => response.status(200).json(result) )
      .catch( next );
  }
};