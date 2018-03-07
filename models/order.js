var mongoose = require('mongoose');
const moment = require('moment');

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
  return 'order/' + this._id;
});

OrderSchema
.virtual('formatted_time')
.get(function () {
  return moment(this.time).format("dddd, MMMM Do YYYY, h:mm a");
});

//Export model
module.exports = mongoose.model('Order', OrderSchema);