const router = require('express').Router();

const { Meta } = require('./routeActions');

module.exports = () => {
  /**
   * GET - min, max, avg total amount per hour by restaurant
   */
  router.get('/stats/:restaurantId', Meta.statsByHour);
  /**
   * GET - total sales per day per restaurant
   */
  router.get('/daily/:restaurantId', Meta.dailySales);
  /**
   * GET - most popular item by restaurant
   */
  router.get('/item/restaurant/:restaurantId', Meta.popItemByRestaurant);
  /**
   * GET - most popular item by user and restaurant
   */
  router.get(
    '/item/user/:userId/restaurant/:restaurantId',
    meta.popItemByUserThenRestaurant,
  );
  return router;
};
