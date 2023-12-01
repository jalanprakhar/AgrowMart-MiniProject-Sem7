const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  total_quantity:{
    type:Number,
    required:true,
  },
  category: {
    type: Number,
    required: true,
  },
  img_url: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity_type: {
    type: Number,
    required: true,
  },
  farmer_id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
  number_of_ratings: {
    type: Number,
    default: 0,
  },
  desc: {
    type: String,
  },
  reviews: {
    type: [String],
    default: [],
  },
  date: Date,
});

module.exports = mongoose.model("Product", productSchema);
