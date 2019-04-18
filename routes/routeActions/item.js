const Models = require('../../models'),
  { Items } = Models;

const Validators = require('../routeValidators'),
  { validateCreate } = Validators.Item;

module.exports = Item = {
  getByQuery: async (req, res) => {
    try {
      const data = await Items.query(req.query);
      res.json(data);
    } catch (e) {
      res.status(500).json(err);
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
      const uItem = await Items.findByIdAndUpdate(itemId, updatedItem);
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
};
