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

const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  dietaryRestrictions: [{ type: String }],
  isActive: { type: Boolean, default: true },
});

ItemSchema.plugin(QueryPlugin);

/**
 * Export as Model
 */

module.exports = Items = mongoose.model('Items', ItemSchema);
