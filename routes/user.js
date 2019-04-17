/**
 * Library Imports
 * Express.Router() - allows for route definitions.
 */
const router = require('express').Router();

/**
 * Import Models to be used in routes.
 * Models -\
 *     - Users
 *     - Tokens
 *     - Addresses
 */

const Models = require('../models'),
	{ Users, Tokens, Addresses } = Models;

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
	router.get('/', (req, res) => {
		//grab query from query or body?
		//gather list of results
		//return results
	});
	/**
	 * Get - User By Id
	 */
	router.get('/:userId', (req, res) => {
		const { userId } = req.params;
		//query database for specified user.
		//return user object (less password of course.)
	});
	/**
	 * Post - Create User (i.e. Register)
	 */
	router.post('/', (req, res) => {
		//validate new User Object
		//save user to the database
		//return new user to the client (less password)
	});
	/**
	 * Put - update user data.
	 */
	router.put('/:userId', (req, res) => {
		const { userId } = req.params;
		//validate data types only, no required fields
		//save update to database.
		//return updated user to the client.
	});
	/**
	 * Post - Add an address to a user.
	 */
	router.post('/:userId/address', (req, res) => {
		const { userId } = req.params;
		//validate user exists
		//validate Address is valid
		//create Address in database
		//return validated/saved address to client.
	});

	return router;
};
