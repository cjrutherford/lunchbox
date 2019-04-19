const AddressRoutes = require('./address');
const OrderRoutes = require('./order');
const ItemRoutes = require('./item');
const RestaurantRoutes = require('./restaurant');
const MetaRoutes = require('./meta');

module.exports = (private, passport) => {
	const UserRoutes = require('./user')(private, passport);
	return {
		UserRoutes,
		AddressRoutes,
		OrderRoutes,
		ItemRoutes,
		RestaurantRoutes,
		MetaRoutes,
	};
};
