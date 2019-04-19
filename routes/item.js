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
  /**
   * PUT - update item
   */
  router.put('/:itemId', Item.updateItem);
  /**
   * DELETE - delete item
   */
  router.delete('/:itemId', Item.deleteItem);

  return router;
};
