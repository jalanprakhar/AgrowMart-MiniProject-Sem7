const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderObject: {
    type: 
      {
        productId: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    
    required: true,
  },
  totalAmount: { type: Number, required: true },
  farmerId: {
    type: String,
    required: true,
  },
  shopperId: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  order_date: Date,
});

module.exports = mongoose.model("Order", orderSchema);
