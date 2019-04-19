/**
 * Library Imports
 * Mongoose Schema - defining the model
 */

const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const QueryPlugin = require('mongoose-query');
/**
 * Shema Definition
 * properties and types
 */

const RestaurantSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  geo: {
    lat: { type: Number, required: true },
    long: { type: String, required: true },
  },
  items: [{ type: Schema.Types.ObjectId, ref: 'Items' }],
  isActive: { type: Boolean, default: true },
});

RestaurantSchema.plugin(QueryPlugin);

/**
 * Export as Model
 */

module.exports = Restaurants = mongoose.model('Restaurants', RestaurantSchema);
