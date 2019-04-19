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
module.exports = (private, passport) => {
	const User = handlers.User(private);
	/**
	 * POST - User Login
	 */
	router.post('/login', User.login);
	/**
	 * Post - User Logout
	 */
	router.post(
		'/logout',
		passport.authenticate('jwt', { session: false }),
		User.logout
	);
	/**
	 * Get - Search by user first name and/or lastName (sortable)
	 */
	router.get('/', User.searchByName);
	/**
	 * Get - User By Id
	 */
	router.get('/:userId', User.getById);
	/**
	 * Post - Create User (i.e. Register)
	 */
	router.post('/', User.register);
	/**
	 * Put - update user data.
	 */
	router.put('/:userId', User.update);
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
