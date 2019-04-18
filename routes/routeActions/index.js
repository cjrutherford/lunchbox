/**
 * Import handlers
 */

const Item = require('./item');
const Order = require('./order');
const Addresse = require('./address');
const Restaurant = require('./restaurant');
const Token = require('./token');
const User = require('./user');

/**
 * Wrap in a single object to Wrap in a Module.
 * Export single Module.
 */
module.exports = Models = {
  Item,
  Order,
  Addresse,
  Restaurant,
  Token,
  User,
};
