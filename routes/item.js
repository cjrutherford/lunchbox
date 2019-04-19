const router = require('express').Router();

const { Item } = require('./routeActions');

module.exports = () => {
  /**
   * GET - Query
   */
  router.get('/', Item.getByQuery);
  /**
   * GET - By ID
   */
  router.get('/:itemId', Item.getById);
  /**
   * POST - create item
   */
  router.post('/', Item.create);
  router.post('/restaurant/:restaurantId', Item.addToRestaurant);
  router.post('/order/:orderId', Item.addToOrder);
  /**
   * PUT - update item
   */
  router.put('/:itemId', Item.updateItem);
  router.delete('/restaurant/:restaurantId', Item.removeFromRestaurant);
  router.delete('/order/:orderId', Item.removeFromOrder);
  /**
   * DELETE - delete item
   */
  router.delete('/:itemId', Item.deleteItem);

  return router;
};
