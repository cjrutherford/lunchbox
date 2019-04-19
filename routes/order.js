const router = require('express').Router();

const { Order } = require('./routeActions');
module.exports = passport => {
  /**
   * GET - search by any field.
   */
  router.get('/', Order.getWithQuery);
  /**
   * GET - order by id
   */
  router.get('/:orderId', Order.getById);
  /**
   * POST - create order.
   */
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    Order.create,
  );
  return router;
};
