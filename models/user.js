const mongoose = require("mongoose");
const userSchema = new mangoose.Schema({
  usename: {
    type: String,
    required: true,
    Unique: true,
    mainLenght: 6,
  },
  name: { type: String, required: true },
  email: { type: String, requird: true },
  passwordHash: { type: String, required: true },
  phone: { type: Number, required: true },
  Amount: Number,
  Vamount: Number,
  userhistory: String,
});
module.exports = mongoose.model("User", userSchema); //
