var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CategorySchema = new Schema(
  {
    title: {type: String, required: true, max: 100},
  }
);

// Virtual for author's URL
CategorySchema
.virtual('url')
.get(function () {
  return 'dashboard/category/' + this._id;
});

//Export model
module.exports = mongoose.model('Category', CategorySchema);