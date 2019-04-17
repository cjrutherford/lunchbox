/**
 * Library Imports
 * Mongoose Schema - defining the model
 */

const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Shema Definition
 * properties and types
 */

const RestaurantSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	addresses: [{ type: Schema.Types.ObjectId, ref: 'Addresses' }],
	createdAt: { type: Date, default: Date.now() },
	isActive: { type: Boolean, default: true },
});

/**
 * Export as Model
 */

module.exports = Restaurants = mongoose.model('Restaurants', RestaurantSchema);
