/**
 * Import Schemas/models
 */

const Items = require('./Shemas/Item');
const Orders = require('./Shemas/Order');
const Addresses = require('./Shemas/Address');
const Restaurants = require('./Shemas/Restaurant');
const Tokens = require('./Shemas/Token');
const Users = require('./Shemas/User');

/**
 * Wrap in a single object to Wrap in a Module.
 * Export single Module.
 */
module.exports = Models = {
	Items,
	Orders,
	Addresses,
	Restaurants,
	Tokens,
	Users,
};
