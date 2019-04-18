const router = require('express').Router();

const handlers = require('./routeActions');

module.exports = () => {
  /**
   * GET - min, max, avg total amount per hour by restaurant
   */
  router.get('/stats/:restaurantId', handlers.Meta.statsByHour);
  /**
   * GET - total sales per day per restaurant
   */
  router.get('/daily/:restaurantId', handlers.Meta.dailySales);
  /**
   * GET - most popular item by restaurant
   */
  router.get(
    '/item/restaurant/:restaurantId',
    handlers.Meta.popItemByRestaurant,
  );
  /**
   * GET - most popular item by user and restaurant
   */
  router.get(
    '/item/user/:userId/restaurant/:restaurantId',
    handlers.meta.popItemByUserThenRestaurant,
  );
  return router;
};
