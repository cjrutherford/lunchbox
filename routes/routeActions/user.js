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
	{ Users, Tokens } = Models;
const Validators = require('../routeValidators'),
	{
		validateLogin,
		validateCreate,
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
						const token = await sign(payload, private, {
							expiresIn: 30000,
							algorithm: 'RS256',
						});
						await new Tokens({ token, user: user.id });
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
		register: async (req, res) => {
			const incomingUser = req.body;
			const { errors, isValid } = validateCreate(incomingUser);
			if (!isValid) {
				res.status(400).json(errors);
			}
			try {
				const user = await Users.findOne({
					emailAddress: incomingUser.emailAddress,
				});
				if (user) {
					errors['Email Exists'] = 'Email Already exists in Database.';
					res.status(400).json(errors);
				} else {
					const newUser = new User({
						firstName: incomingUser.firstName,
						lastName: incomingUser.lastName,
						emailAddress: incomingUser.emailAddress,
						password: incomingUser.password,
					});
					const salt = await genSalt(10);
					const hsh = await hash(newUser.password, salt);
					newUser.password = hsh;
					const result = await newUser.save();
					res.json(result);
				}
			} catch (e) {
				res.status(500).json(e);
			}
        },
        logout: async (req,res) => {
            try{
                const user = await Users.findOne({emailAddress: req.user.emailAddress});
                const tokens = await Tokens.find({user: user.id});
                tokens.forEach(t => {
                    await t.delete();
                });
                res.json({message: 'All Tokens Deleted.'});
            } catch (e) {
                res.status(500).json(e);
            }
        },
        searchByName: async (req,res) => {
            const {searchTerm, sort} = req.body;
            sort = sort === 'asc' ? 1 : -1;
            try{
                const results = await Users.find({firstName: {"$regex": searchTerm, "$options": 'i'}, $or:{ lastName: {"$regex": searchTerm, "$options":'i'}}}).sort({firstName: sort}).sort({lastName: sort});
                
                res.json(results);
            } catch (e) {
                res.status(500).json(e);
            }
        },
        getById: async (req,res) => {
            const userId = req.params.userId;
            try{
                const user = Users.findById(userId);
                res.json(user);
            }catch (e) {
                res.status(500).json(e);
            }
        },
        update: (req,res) => {
            const userId = req.params.userId;
            const updateUser = req.body;
            try{
                const dbUser = await Users.findByIdAndUpdate(userId, updateUser, {upsert: true});
                res.json(dbUser);
            } catch(e) {
                res.status(500).json(e);
            }
        }
	};
	return User;
};
