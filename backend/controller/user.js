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
      console.log("test")
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
      console.log(req.body);
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
      // res.status(201).json(savedUser);
      res.redirect("/");

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
  async update(req, res, next) {
    try {
      const id = req.params.id;
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

      if (password && password.length < 4) {
        return res
          .status(400)
          .send("Password cannot be less than 4 characters");
      }

      const passwordHash = password
        ? await bcrypt.hash(password, 10)
        : undefined;

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: {
            name,
            userName,
            passwordHash,
            email,
            phone,
            address,
            amount,
            holdingAmount,
            userHistory,
            userType,
          },
        },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
      res.json(updatedUser);
    } catch (error) {
      next(error);
    }
  },
  async remove(req, res, next) {
    try {
      const id = req.params.id;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).send("User not found");
      }

      res.json(deletedUser);
    } catch (error) {
      next(error);
    }
  },
};
