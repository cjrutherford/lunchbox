const Models = require('../../models'),
  { Restaurants, Users, Items, Orders } = Models;

const _ = require('underscore');
const moment = require('moment');

module.exports = Meta = {
  statsByHour: async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const restaurant = await Restaurants.findById(restaurantId);
      const orders = Orders.find({ id: { $in: restaurant.orders } });
      const oByHour = _.groupBy(orders, data =>
        moment(data.createdAt).startOf(hour),
      );
      const salesByHour = oByHour.map(x => {
        let hourlySales;
        for (let y of x) {
          hourlySales += y;
        }
        return hourlySales;
      });
      const min = salesByHour.sort((a, b) => a - b)[0];
      const max = salesByHour.sort((a, b) => b - a)[0];
      let sum;
      for (let sbh of salesByHour) {
        sum += sbh;
      }
      const avg = sum / salesByHour.length;
      res.json({ min, max, avg });
    } catch (e) {
      res.status(500).json(e);
    }
  },
  dailySales: async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const restaurant = await Restaurants.findById(restaurantId);
      const orders = await Orders.find({ id: { $in: restaurant.orders } });
      const sByDay = _.groupBy(orders, data =>
        moment(data.createdAt).startOf(day),
      );
      res.json(sByDay);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  popItemByRestaurant: async (req, res) => {
    const { restaurantId } = req.params;
    try {
      const restaurant = await Restaurants.findById(restaurantId);
      const orders = await Orders.find({ id: { $in: restaurant.orders } });
      const items = orders.map(async o => {
        return await Items.find({ id: { $in: o.items } });
      });
      const flatItems = [].concat.apply([], items);
      const counts = flatItems.reduce((acc, curVal) => {
        acc.push({
          id: curVal.id,
          count: flatItems.filter(x => x.id === curVal.id).length,
        });
      }, []);
      res.json(counts.sort((a, b) => a.count - b.count)[0]);
    } catch (e) {
      res.status(500).json(e);
    }
  },
  popItemByUserThenRestaurant: async (req, res) => {
    const { userId, restaurantId } = req.params;
    try {
      const orders = await Orders.find({
        user: userId,
        restaurant: restaurantId,
      });
      const items = orders.map(
        async x => await Items.find({ id: { $in: x.items } }),
      );
      const flatItems = [].concat.apply([], items);
      const counts = flatItems.reduce((acc, curVal) => {
        acc.push({
          id: curVal.id,
          count: flatItems.filter(x => x.id === curVal.id).length,
        });
      });
      res.json(counts.sort((a, b) => a.count - b.count)[0]);
    } catch (e) {
      res.status(500).json(e);
    }
  },
};
