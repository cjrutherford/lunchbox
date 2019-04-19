const router = require('express').Router();

const { Item } = require('./routeActions');

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
//add item to restaurant.
router.post('/restaurant/:restaurantId/:itemId', Item.addToRestaurant);
//add item to order.
router.post('/order/:orderId/:itemId', Item.addToOrder);
/**
 * PUT - update item
 */
router.put('/:itemId', Item.updateItem);
//delete item from restaurant. leaves the item to be added to other restaurants.
router.delete('/restaurant/:restaurantId/:itemId', Item.removeFromRestaurant);
//delete item from order.
router.delete('/order/:orderId/:itemId', Item.removeFromOrder);
/**
 * DELETE - delete item
 */
router.delete('/:itemId', Item.deleteItem);

module.exports = router;
