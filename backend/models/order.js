const mongoose = require("mongoose");
const UniqueValidator = require("mongoose-unique-validator");
const User = require("./user");
const Book = require("./book");
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },

  rentDate: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  returnStatus: {
    type: String,
    enum: ["yes", "No"],
  },
  reminderEmail: {
    type: Date,
    default: Date.now,
  },
});
orderSchema.plugin(UniqueValidator);
module.exports = mongoose.model("Order", orderSchema);
