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

const TokenSchema = new Schema({
	token: { type: String, required: true },
	user: { type: Schema.Types.ObjectId, ref: 'users' },
});

/**
 * Export as Model
 */

module.exports = Tokens = mongoose.model('Tokens', TokenSchema);
