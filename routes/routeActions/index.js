/**
 * Import handlers
 */

const Item = require('./item');
const Order = require('./order');
const Address = require('./address');
const Restaurant = require('./restaurant');
const Token = require('./token');
const User = require('./user');

/**
 * Wrap in a single object to Wrap in a Module.
 * Export single Module.
 */
module.exports = Handlers = {
  Item,
  Order,
  Address,
  Restaurant,
  Token,
  User,
};
