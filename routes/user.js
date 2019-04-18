/**
 * Library Imports
 * Express.Router() - allows for route definitions.
 */
const router = require('express').Router();

/**
 * Import Handlers and Validators
 */
const handlers = require('./routeActions');

/**
 * Define/Export Router for Resources
 */
module.exports = () => {
  /**
   * POST - User Login
   */
  router.post('/login', handlers.User.login);
  /**
   * Post - User Logout
   */
  router.post('/logout', handlers.User.logout);
  /**
   * Get - Search by user first name and/or lastName (sortable)
   */
  router.get('/', handlers.Users.searchByName);
  /**
   * Get - User By Id
   */
  router.get('/:userId', handlers.Users.getById);
  /**
   * Post - Create User (i.e. Register)
   */
  router.post('/', handlers.Users.regiser);
  /**
   * Put - update user data.
   */
  router.put('/:userId', handlers.Users.update);
  /**
   * Post - Add an address to a user.
   * moved to address........
   */
  // router.post('/:userId/address', (req, res) => {
  // 	const { userId } = req.params;
  // 	//validate user exists
  // 	//validate Address is valid
  // 	//create Address in database
  // 	//return validated/saved address to client.
  // });

  return router;
};
