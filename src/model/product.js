const mongoose = require("mongoose");
const { object, string } = require("prop-types");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  imageUrl : {
    type: Object,
  },
  image: { data: Buffer,  url : String ,contentType: String, },
}); 
module.exports.Product = mongoose.model("product", productSchema);
