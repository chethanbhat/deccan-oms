var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    price: {type: Number, required: true},
    dimensions: {type: String},
    features: {type: String},
    category: {type: Schema.ObjectId, ref: 'Category', required: true},
    image: {type: String, default: 'https://s3-ap-southeast-1.amazonaws.com/deccan-images/armless.png'}
  }
);

// Virtual for author's URL
ProductSchema
.virtual('url')
.get(function () {
  return 'product/' + this._id;
});

//Export model
module.exports = mongoose.model('Product', ProductSchema);