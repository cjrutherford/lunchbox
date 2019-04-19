const router = require('express').Router();

const { Restaurant } = require('./routeActions');

module.exports = () => {
  /** GET
   * query restaurants by any field
   */
  router.get('/', Restaurant.getByQuery);
  /**
   * GET - By Id
   */
  router.get('/:restaurantId', Restaurant.getById);
  /**
   * POST - new restaurant
   */
  router.post('/', Restaurant.create);
  /**
   * PUT - update restaurant
   */
  router.put('/:restaurantId', Restaurant.update);
};
