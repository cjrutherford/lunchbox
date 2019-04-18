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

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurants' },
  createdAt: { type: Date, default: Date.now() },
  isPaid: { type: Boolean, default: false },
  totalAmount: { type: Number, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Items' }],
});

//Add the plugin to the schema

OrderSchema.plugin(QueryPlugin);

/**
 * Export as Model
 */

module.exports = Orders = mongoose.model('Orders', OrderSchema);
