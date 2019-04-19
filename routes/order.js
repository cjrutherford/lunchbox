const router = require('express').Router();

const { Orders } = require('./routeActions');

module.exports = () => {
  /**
   * GET - search by any field.
   */
  router.get('/', Orders.getWithQuery);
  /**
   * GET - order by id
   */
  router.get('/:orderId', Orders.getById);
  /**
   * POST - create order.
   */
  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    Orders.create,
  );

  return router;
};
