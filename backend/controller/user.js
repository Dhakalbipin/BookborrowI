const User = require("../models/user.js"); // import the index.js file from models
const bcrypt = require("bcrypt");
module.exports = {
  async list(req, res, next) {
    try {
      const user = await User.find();
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  async create(req, res, next) {
    try {
      const {
        name,
        userName,
        password,
        email,
        phone,
        address,
        amount,
        holdingAmount,
        userHistory,
        userType,
      } = req.body;
      if (password.length < 8) {
        return res
          .status(404)
          .send("Password can not be less than 8 characters");
      }
      const passwordHash = await bcrypt.hash(password, 13);
      const user = new User({
        userName,
        name,
        passwordHash,
        email,
        phone,
        address,
        amount,
        holdingAmount,
        userHistory,
        userType,
      });
      const savedUser = await user.save();
      res.status(201).json(savedUser);
    } catch (error) {
      next(error);
    }
  },
  async getid(req, res, next) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },
};
