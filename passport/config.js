/**
 * import JsonWebToken requirements
 */
const JwtStrategy = require('passport-jwt').Strategy;
const Extract = require('passport-jwt').ExtractJwt;
/**
 * import Mongoose and the model
 */
const mongoose = require('mongoose');
const Users = require('../models').Users;

/**
 * Accept passport and the public key for verification.
 */
module.exports = (passport, public, refresh) => {
	const standardOpts = {
		jwtFronRequest: Extract.fromAuthHeaderAsBearerToken(),
		secretOrKey: public,
		algorithm: ['RS256'],
	};

	passport.use(
		new JwtStrategy(standardOpts, (payload, done) => {
			Users.findById(payload.id)
				.then(user => {
					if (user) {
						return done(null, {
							id: user._id,
							name: `${user.firstName} ${user.lastName}`,
							email: user.emailAddress,
						});
					}
					return null, false;
				})
				.catch(err => {
					return done('Unauthorized', false, { payload, err });
				});
		})
	);
};
