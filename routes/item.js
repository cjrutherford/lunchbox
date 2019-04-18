const router = require('express').Router();

const handlers = require('./routeActions');

module.exports = () => {
  /**
   * GET - Query
   */
  router.get('/', handlers.Item.getByQuery);
  /**
   * GET - By ID
   */
  router.get('/:itemId', handlers.Item.getById);
  /**
   * POST - create item
   */
  router.post('/', handlers.Item.create);
  /**
   * PUT - update item
   */
  router.put('/:itemId', handlers.Item.updateItem);
  /**
   * DELETE - delete item
   */
  router.delete('/:itemId', handlers.Item.deleteItem);

  return router;
};
