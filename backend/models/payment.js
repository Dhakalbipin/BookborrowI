const mongoose = require("mongoose");
const User = require("./user");
const Order = require("./order");
const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  orderId: {
    type: mongoose.Schema.Type.orderId,
    ref: "Order",
  },
  amount: {
    type: Number,
  },
  paymentMethod: {
    type: String,
  },
  reviews: {
    type: String,
  },
});
module.exports = mongoose.model("payment", PaymentSchema);
