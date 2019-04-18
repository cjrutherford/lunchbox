const AddressRoutes = require('./address');
const OrderRoutes = require('./order');
const ItemRoutes = require('./item');
const RestaurantRoutes = require('./restaurant');
const MetaRoutes = require('./meta');

module.exports = private => {
  const UserRoutes = require('./user')(private);
  return {
    UserRoutes,
    AddressRoutes,
    OrderRoutes,
    ItemRoutes,
    RestaurantRoutes,
    MetaRoutes,
  };
};
