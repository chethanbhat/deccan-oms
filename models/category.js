var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
    image: {type: String, default: 'https://s3-ap-southeast-1.amazonaws.com/deccan-images/armless.png'}
  }
);

// Virtual for author's URL
CategorySchema
.virtual('url')
.get(function () {
  return 'category/' + this._id;
});

//Export model
module.exports = mongoose.model('Category', CategorySchema);