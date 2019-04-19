const Models = require('../../models'),
	{ Items, Restaurants, Orders } = Models;

const Validators = require('../routeValidators'),
	{ validateCreate } = Validators.Item;

module.exports = Item = {
	getByQuery: async (req, res) => {
		try {
			const data = await Items.query(req.query);
			res.json(data);
		} catch (e) {
			res.status(500).json(e);
		}
	},
	getById: async (req, res) => {
		const { itemId } = req.params;
		try {
			const item = await Items.findById(itemId);
			res.json(item);
		} catch (e) {
			res.status(500).json(e);
		}
	},
	create: async (req, res) => {
		const item = req.body;
		const { errors, isValid } = validateCreate(item);
		if (!isValid) res.status(400).json(errors);
		try {
			const newItem = await new Items(item).save();
			res.json(newItem);
		} catch (e) {
			res.status(500).json(e);
		}
	},
	updateItem: async (req, res) => {
		const { itemId } = req.params;
		const updatedItem = req.body;
		try {
			const uItem = await Items.findOneAndUpdate({ _id: itemId }, updatedItem);
			res.json(uItem);
		} catch (e) {
			res.status(500).json(e);
		}
	},
	deleteItem: async (req, res) => {
		const { itemId } = req.params;
		try {
			const i2d = await Items.deleteOne({ _id: itemId });
			res.json(i2d);
		} catch (e) {
			res.status(500).json(e);
		}
	},
	addToRestaurant: async (req, res) => {
		const { restaurantId, itemId } = req.params;
		try {
			const restaurant = await Restaurants.findById(restaurantId);
			const item = await Items.findById(itemId);
			restaurant.items.push(item);
			const result = await restaurant.save();
			res.json(result);
		} catch (e) {
			res.status(500).json(e);
		}
	},
	addToOrder: async (req, res) => {
		const { orderId, itemId } = req.params;
		try {
			const order = await Orders.findById(orderId);
			const item = await Items.findById(itemId);
			order.items.push(item);
			const result = await order.save();
			res.json(result);
		} catch (e) {
			res.status(500).json(e);
		}
	},
	removeFromRestaurant: async (req, res) => {
		const { restaurantId, itemId } = req.params;
		try {
			const restaurant = await Restaurants.findById(restaurantId);
			restaurant.items = restaurant.items.filter(x => !x.equals(itemId));
			const result = await restaurant.save();
			res.json(result);
		} catch (e) {
			res.status(500).json(e);
		}
	},
	removeFromOrder: async (req, res) => {
		const { orderId, itemId } = req.params;
		try {
			const order = await Orders.findById(orderId);
			order.items = order.items.filter(x => !x.equals(itemId));
			const result = await order.save();
			res.json(result);
		} catch (e) {
			res.status(500).json(e);
		}
	},
};
