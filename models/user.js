var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: {type: String, required: true, max: 100},
    email: {type: String},
    phone: {type: String},
    address: {type: String},
    vendorCode:{type: Number}
    }
);

// Virtual for author's URL
UserSchema
.virtual('url')
.get(function () {
  return 'user/' + this._id;
});

//Export model
module.exports = mongoose.model('User', UserSchema);