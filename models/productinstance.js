var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductInstanceSchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    product: {type: Schema.ObjectId, ref: 'Product', required: true},
    color: {type: String},
    image: {type: String, default: 'https://s3-ap-southeast-1.amazonaws.com/deccan-images/armless.png'},
    availability: {type: String, required: true, enum: ['Available', 'Not Available', 'Discontinued'], default: 'Available'}
  }
);

// Virtual for product's URL
ProductInstanceSchema
.virtual('url')
.get(function () {
  return 'productinstance/' + this._id;
});

//Export model
module.exports = mongoose.model('ProductInstance', ProductInstanceSchema);