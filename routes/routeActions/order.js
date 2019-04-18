const promisify = require('util').promisify;

const Models = require('../../models'),
  { Restaurants, Users, Orders } = Models;

const Validators = require('../routeValidators'),
  { validateCreate } = Validators.Address;

module.exports = Order = {
  getWithQuery: async (req, res) => {
    try {
      const data = await Orders.query(req.query);
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  },
  getById: async (req, res) => {
    try {
      const { orderId } = req.params;
      const order = await Orders.findById(orderId);
      res.json(order);
    } catch (e) {
      res.status(500).json(err);
    }
  },
  create: async (req, res) => {
    const order = req.body;
    const { errors, isValid } = validateCreate(order);
    if (!isValid) res.status(400).json(errors);
    try {
      const newOrder = await new Orders(order).save();
      res.json(newOrder);
    } catch (e) {
      res.status(500).json(err);
    }
  },
};
