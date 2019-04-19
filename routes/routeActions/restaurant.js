const Models = require('../../models'),
  { Restaurants } = Models;

const Validators = require('../routeValidators'),
  { validateCreate } = Validators.Restaurant;

module.exports = Restaurant = {
  getByQuery: async (req, res) => {
    try {
      const data = await Restaurants.query(req.query);
      res.json(data);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  getById: async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const restaurant = await Restaurants.findById(restaurantId);
      res.json(restaurant);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  create: async (req, res) => {
    const inputRestaurant = req.body;
    const { errors, isValid } = validateCreate(inputRestaurant);
    if (!isValid) res.status(400).json(errors);
    try {
      const newRestaurant = await new Restaurants(inputRestaurant).save();
      res.json(newRestaurant);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  update: async (req, res) => {
    const { restaurantId } = req.params;
    const inputRestaurant = req.body;
    try {
      const updatedRestaurant = await Restaurants.findOneAndUpdate(
        { _id: restaurantId },
        inputRestaurant,
        { upsert: true },
      );
      res.json(updatedRestaurant);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
