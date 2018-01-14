var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    dimensions: {type: String},
    features: {type: String},
    category: {type: Schema.ObjectId, ref: 'Category', required: true},
  }
);

// Virtual for author's URL
ProductSchema
.virtual('url')
.get(function () {
  return 'dashboard/product/' + this._id;
});

//Export model
module.exports = mongoose.model('Product', ProductSchema);