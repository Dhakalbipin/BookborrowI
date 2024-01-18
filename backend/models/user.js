const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const Order = require("./order");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
  },
  holdingAmount: {
    type: Number,
  },
  userHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  userType: {
    type: String,
    required: true,
    enum: ["admin", "user"],
  },
});
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("user", userSchema);
