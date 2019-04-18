const router = require('express').Router();

const handlers = require('./routeActions');

module.exports = () => {
  /**
   * GET - search by any field.
   */
  router.get('/', handlers.Orders.getWithQuery);
  /**
   * GET - order by id
   */
  router.get('/:orderId', handlers.Orders.getById);
  /**
   * POST - create order.
   */
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    handlers.Orders.create,
  );

  return router;
};
