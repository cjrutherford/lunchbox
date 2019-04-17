/**
 * Library Imports
 * bcryptjs - hashing/salting algorithm library
 * promisify - converting callbacks to promises
 * jsonwebtoken - signing for json web token
 */
const bcrypt = require('bcryptjs');
const promisify = require('util').promisify;
const jwt = require('jsonwebtoken');

/**
 * Converting bcrypt and jwt methods to promises
 */

const genSalt = promisify(bcrypt.genSalt);
const hash = promisify(bcrypt.hash);
const compare = promisify(bcrypt.compare);
const sign = promisify(jwt.sign);

/**
 * import Models for route use.
 */
const Models = require('../../models'),
	{ Users, Tokens, Addresses } = Models;
const Validators = require('../routeValidators'),
	{
		validateLogin,
		validateLogout,
		validateCreate,
		validateUpdate,
	} = Validators.User;

module.exports = private => {
	const User = {
		login: async (req, res) => {
			const { emailAddress, password } = req.body;
			const { errors, isValid } = validateLogin({ emailAddress, password });
			if (!isValid) {
				res.status(400).json(errors);
			} else {
				try {
					const user = await Users.findOne({ emailAddress });
					if (!user) {
						errors.email = 'No Account Found';
						res.status(404).json(errors);
					}
					const isMatch = await compare(password, user.password);
					if (isMatch) {
						const payload = {
							id: user._id,
							name: `${user.firstName} ${user.lastName}`,
							emailAddress: user.emailAddress,
						};
						const { signErr, token } = await jwt.sign(payload, private, {
							expiresIn: 30000,
							algorithm: 'RS256',
						});
						if (signErr) {
							res
								.status(500)
								.json({ error: 'Error Signing Token...', raw: signErr });
						}
						res.json({ success: true, token: `Bearer ${token}` });
					} else {
						errors.password = 'Password is incorrect';
						res.status(400).json(errors);
					}
				} catch (e) {
					res.status(500).json(e);
				}
			}
		},
	};

	return User;
};

// const newUser = new Users(user);
// try{
//     const saveResult = await newUser.save();
//     res.json(saveResult);
// } catch (e) {
//     res.status(500).json(e);
// }
