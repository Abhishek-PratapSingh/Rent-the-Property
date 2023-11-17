const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const property = new Schema([{
  userId: { type: String, required: true },
  name : { type : String, required: true},
  price: {type: String , required: true},
  location: {type: String , default: ""},
  type : { type : String , default: "2BHK"}
}]);

const Property = mongoose.model('Property', property);

module.exports = Property;