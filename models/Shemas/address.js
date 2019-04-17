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

const AddressSchema = new Schema({
	street: { type: String, required: true },
	city: { type: String, required: true },
	state: { type: String, required: true },
	zip: { type: String, required: true },
	country: { type: String, required: true },
});

/**
 * Export as Model
 */

module.exports = Addresses = mongoose.model('Addresses', AddressSchema);
