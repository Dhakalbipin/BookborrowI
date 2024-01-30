const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const User = require("./user");
const bookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
  },
  aStock: {
    type: Number,
  },
  bookValue: {
    type: Number,
    required: true,
  },

  vendorName: String,

  amount: {
    type: Number,
  },
  photo: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});
bookSchema.plugin(uniqueValidator);
module.exports = mongoose.model("book", bookSchema);
