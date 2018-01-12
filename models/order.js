var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var OrderSchema = new Schema(
  {
    items: [
        {
            item: {type: Schema.ObjectId, ref: 'ProductInstance', required: true},
            quantity:  {type: Number, required: true},
        }
    ],
    user: {type: Schema.ObjectId, ref: 'User', required: true},
    time: { type: Date, default: Date.now }
  }
);

// Virtual for inventory URL
OrderSchema
.virtual('url')
.get(function () {
  return '/orders/' + this._id;
});

//Export model
module.exports = mongoose.model('Order', OrderSchema);