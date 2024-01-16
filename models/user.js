const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    mainlength: 10,
  },

  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  phone: { type: Number, required: true },
  Amount: Number,
  Vamount: Number,
  userhistory: String,
});
module.exports = mongoose.model("User", userSchema);
