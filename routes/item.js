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
  router.post('/restaurant/:restaurantId/:itemId', Item.addToRestaurant);
  router.post('/order/:orderId/:itemId', Item.addToOrder);
  /**
   * PUT - update item
   */
  router.put('/:itemId', Item.updateItem);
  router.delete('/restaurant/:restaurantId/:itemId', Item.removeFromRestaurant);
  router.delete('/order/:orderId/:itemId', Item.removeFromOrder);
  /**
   * DELETE - delete item
   */
  router.delete('/:itemId', Item.deleteItem);

  return router;
};
