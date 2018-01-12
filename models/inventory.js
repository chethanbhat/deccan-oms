var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var InventorySchema = new Schema(
  {
    items: [
        {
            item: {type: Schema.ObjectId, ref: 'ProductInstance', required: true},
            quantity:  {type: Number, required: true},
        }
    ]
  }
);

// Virtual for inventory URL
InventorySchema
.virtual('url')
.get(function () {
  return '/inventory/' + this._id;
});

//Export model
module.exports = mongoose.model('Inventory', InventorySchema);