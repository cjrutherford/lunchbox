const router = require('express').Router();

const handlers = require('./routeActions');

module.exports = () => {
  /** GET
   * query restaurants by any field
   */
  router.get('/', handlers.Restaurant.getByQuery);
  /**
   * GET - By Id
   */
  router.get('/:restaurantId', handlers.Restaurant.getById);
  /**
   * POST - new restaurant
   */
  router.post('/', handlers.Restaurant.create);
  /**
   * PUT - update restaurant
   */
  router.put('/:restaurantId', handlers.Restaurant.update);
};
